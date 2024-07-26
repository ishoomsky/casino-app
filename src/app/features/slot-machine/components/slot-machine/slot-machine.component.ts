import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import { AsyncPipe, DecimalPipe, NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { NumberAbbreviationPipe } from "../../../../shared/pipes/number-abbreviation.pipe";
import { AnimateNumberDirective } from "../../../../shared/directives/animate-number/animate-number.directive";
import { BehaviorSubject } from "rxjs";
import { getRandomNumberInRange } from "../../../../shared/utils/getRandom";

interface ReelInterface {
  coming: string[],
  active: string[],
}

const symbols = [
  '/images/slot/symbol_1.png',
  '/images/slot/symbol_2.png',
  '/images/slot/symbol_3.png',
  '/images/slot/symbol_4.png',
  '/images/slot/symbol_5.png',
  '/images/slot/symbol_6.png',
  '/images/slot/symbol_7.png',
  '/images/slot/symbol_8.png',
  '/images/slot/symbol_9.png',
  '/images/slot/symbol_10.png',
  '/images/slot/symbol_11.png',
  '/images/slot/symbol_12.png',
];
const jackpots =  [
  {
    value: 500072001387,
  },
  {
    value: 125100801942,
  },
  {
    value: 35158403052,
  },
  {
    value: 15244804717,
  },
  {
    value: 4731427500,
  }
];

@Component({
  selector: 'app-slot-machine',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf,
    NumberAbbreviationPipe,
    AnimateNumberDirective,
    NumberAbbreviationPipe,
    AsyncPipe,
    NgIf,
    NgClass,
    NgStyle
  ],
  templateUrl: './slot-machine.component.html',
  styleUrl: './slot-machine.component.scss'
})
export class SlotMachineComponent implements OnInit {
  @ViewChildren('symbolsActiveRef') protected activeReelsRef!: QueryList<ElementRef>;
  @ViewChildren('symbolsComingRef') protected comingReelsRef!: QueryList<ElementRef>;

  public jackpots: {value: number}[] = jackpots;
  public numberSevenBadges =  Array(5).fill(0);

  public totalBet = 500000000;
  public bet = 20000000;

  public comingReelsSpinAnimationDuration = 2000;
  public activeReelsSpinAnimationDuration = 300;
  public comingReelsRows = 24;
  public readonly activeReelsRows = 3;
  public comingReelsHeight = this.comingReelsRows / 3 * 100 + '%';

  public reelsState: ReelInterface[] = [
    {
      coming: [],
      active: [],
    },
    {
      coming: [],
      active: [],
    },
    {
      coming: [],
      active: [],
    },
    {
      coming: [],
      active: [],
    },
    {
      coming: [],
      active: [],
    }
  ];
  public reelsRunning$ = new BehaviorSubject<boolean>(false);

  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.initializeActiveReelsState();
  }

  public async runSpin(): Promise<void> {
    this.reelsRunning$.next(true);
    this.generateComingReelsState();
    this.cdr.detectChanges();

    await Promise.all([
      this.spinActiveReels(),
      this.spinComingReels()
    ])
    this.reelsRunning$.next(false);
    this.resetReels();
  }

  private initializeActiveReelsState(): void {
    this.reelsState = this.reelsState.map((reel) => ({
      ...reel,
      active: this.getRandomSymbols(symbols, this.activeReelsRows)
    }));
  }

  private generateComingReelsState(): void {
    this.reelsState = this.reelsState.map((reel) => ({
      ...reel,
      coming: this.getRandomSymbols(symbols, this.comingReelsRows)
    }));
  }

  private spinActiveReels(): Promise<void> {
    return this.runAnimation(this.activeReelsRef, 'shift-down');
  }

  private spinComingReels(): Promise<void> {
    return this.runAnimation(this.comingReelsRef, 'shift-down', (element: HTMLElement) => {
      this.renderer.setStyle(element, 'animation-duration', (this.comingReelsSpinAnimationDuration + (200 * getRandomNumberInRange(0, this.comingReelsRef.length))) + 'ms');
    });
  }

  private runAnimation(
    elementsRef: QueryList<ElementRef>,
    animationClass: string,
    styleUpdates: (element: HTMLElement) => void = () => {}
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (elementsRef.length === 0) {
        reject(new Error('No elements reference available'));
        return;
      }

      const elements = elementsRef.toArray();
      const animationPromises = elements.map((elementRef: ElementRef) => {
        return new Promise<void>((resolve) => {
          const element = elementRef.nativeElement as HTMLElement;
          styleUpdates(element);
          this.renderer.addClass(element, animationClass);

          const onAnimationEnd = () => {
            element.removeEventListener('animationend', onAnimationEnd);
            resolve();
          };

          element.addEventListener('animationend', onAnimationEnd);
        });
      });

      Promise.all(animationPromises)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  private resetReels(): void {
    this.resetSlotData();
    this.resetActiveReels();
    this.resetComingReels();
  }

  private resetSlotData(): void {
    this.reelsState = this.reelsState.map(item => {
      const updatedActive = item.coming.slice(0, this.activeReelsRows);

      return {
        ...item,
        active: updatedActive,
        coming: []
      };
    });
  }

  private resetActiveReels(): void {
    this.activeReelsRef.forEach((elementRef) => {
      const activeReelsElement = elementRef.nativeElement;
      this.renderer.removeClass(activeReelsElement, 'shift-down');
    });
  }

  private resetComingReels(): void {
    this.comingReelsRef.forEach((elementRef) => {
      const comingReelsElement = elementRef.nativeElement;
      this.renderer.removeClass(comingReelsElement, 'shift-down');
    });
  }

  private getRandomSymbols(symbols: string[], quantity: number): string[] {
    const extendedSymbols = [];
    while (extendedSymbols.length < quantity) {
      extendedSymbols.push(...symbols);
    }
    const shuffled = extendedSymbols.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, quantity);
  }
}
