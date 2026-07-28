import { Company } from "./company.ts";

export type ProductType = "physical" | "digital";
export abstract class Product {
  name: string;
  price: number;
  cogs: number;
  demand: number = 50;
  company: Company | null = null;
  abstract type: ProductType;
  constructor(name: string, price: number, cogs: number) {
    this.name = name;
    this.price = price;
    this.cogs = cogs;
  }
}
