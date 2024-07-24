export interface SlotInterface {
  id: number;
  name: string;
  image: string;
  order: number;
  isLocked: boolean;
  jackpot?: number;
}
