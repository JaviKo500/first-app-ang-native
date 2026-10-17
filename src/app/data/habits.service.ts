import { Service } from "@angular/core";

const PALETTE = ['#f43f5e', '#f97316', '#eab308', '#22c55e', '#0ea5e9', '#8b5cf6'];


@Service()
export class HabitsService {
  readonly palette: readonly string [] = PALETTE;
}