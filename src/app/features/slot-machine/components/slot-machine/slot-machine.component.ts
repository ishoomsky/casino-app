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

interface ReelsInterface {
  firstReel: ReelInterface;
  secondReel: ReelInterface;
  thirdReel: ReelInterface;
  fourthReel: ReelInterface;
  fifthReel: ReelInterface;
}

interface ReelItem {
  key: string;
  coming: string[];
  active: string[];
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

  public comingReelsSpinTiming = 5000;
  public activeReelsSpinTiming = 500;

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
    this.setActiveReels();
  }

  private setActiveReels(): void {
    this.reelsState = this.reelsState.map((reel) => ({
      ...reel,
      active: this.getRandomSymbols(symbols, 3)
    }));
  }

  private resetReels(): void {
    this.reelsState = this.resetSlotData(this.reelsState);

    this.activeReelsRef.forEach((elementRef) => {
      const activeReelsElement = elementRef.nativeElement;
      this.renderer.removeClass(activeReelsElement, 'shift-down');
    });

    this.comingReelsRef.forEach((elementRef) => {
      const comingReelsElement = elementRef.nativeElement;
      this.renderer.removeClass(comingReelsElement, 'shift-down');
    });
  }


  public async runSpin(): Promise<void> {
    this.reelsRunning$.next(true);
    this.generateComingReels();
    this.cdr.detectChanges();

    await Promise.all([
      this.spinActiveReels(),
      this.spinComingReels()
    ])
    this.reelsRunning$.next(false);
    this.resetReels();
  }

  private generateComingReels(): void {
    this.reelsState = this.reelsState.map((reel) => ({
      ...reel,
      coming: this.getRandomSymbols(symbols, 24)
    }));
  };


  private spinActiveReels(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.activeReelsRef) {
        reject(new Error('No active reels reference available'));
        return;
      }

      const animationPromises = this.activeReelsRef.map((elementRef: ElementRef) => {
        return new Promise<void>((resolve) => {
          const activeReelsElement = elementRef.nativeElement;
          this.renderer.addClass(activeReelsElement, 'shift-down');

          const onAnimationEnd = () => {
            activeReelsElement.removeEventListener('animationend', onAnimationEnd);
            resolve();
          };
          activeReelsElement.addEventListener('animationend', onAnimationEnd);
        });
      });

      Promise.all(animationPromises)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  };

  private spinComingReels(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.comingReelsRef) {
        reject(new Error('No coming reels reference available'));
        return;
      }

      const animationPromises = this.comingReelsRef.map((elementRef: ElementRef, elementIndex) => {
        return new Promise<void>((resolve) => {
          const comingReelsElement = elementRef.nativeElement;
          this.renderer.setStyle(comingReelsElement, 'animation-duration', (2000 + 200 * getRandomNumberInRange(0, elementIndex)) + 'ms');
          this.renderer.addClass(comingReelsElement, 'shift-down');

          const onAnimationEnd = () => {
            comingReelsElement.removeEventListener('animationend', onAnimationEnd);
            resolve();
          };

          comingReelsElement.addEventListener('animationend', onAnimationEnd);
        });
      });

      Promise.all(animationPromises)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  };

  private getRandomSymbols(symbols: string[], quantity: number): string[] {
    const extendedSymbols = [];
    while (extendedSymbols.length < quantity) {
      extendedSymbols.push(...symbols);
    }
    const shuffled = extendedSymbols.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, quantity);
  }

  private resetSlotData(reelsData: ReelInterface[]): ReelInterface[] {
    return reelsData.map(item => {
      const updatedActive = item.coming.slice(0, 3);

      return {
        ...item,
        active: updatedActive,
        coming: []
      };
    });
  }
}
