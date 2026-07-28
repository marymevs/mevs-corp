import { Product } from "./product.ts";

export class Campaign {
  budget: number;
  duration: number; // number of weeks that the campaign runs
  product: Product;
  constructor(budget: number, duration: number, product: Product) {
    this.budget = budget;
    this.duration = duration;
    this.product = product;
  }
}
