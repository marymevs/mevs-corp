import { TechCompany, Hardware, Software } from "../industries/tech.ts";
import { Product, type ProductType } from "../infrastructure/product.ts";
let printer = new Hardware("Gist Printer", 90, 60);
let subscription = new Software("Gist Subscription", 25, "recurring");

export const Gist = new TechCompany("Gist");
Gist.software.add(subscription);
Gist.hardware.add(printer);

class Ink extends Product {
  color: InkColor;
  type: ProductType = "physical";
  constructor(color: InkColor) {
    super("Ink", 14, 7);
    this.color = color;
  }
}

class Paper extends Product {
  size: string = "A1";
  type: ProductType = "physical";
  constructor() {
    super("Paper", 20, 10);
  }
}

type InkColor = "black" | "color";

let ink = new Ink("black");
let paper = new Paper();

Gist.products.add(ink);
Gist.products.add(paper);

// Employees:
// Gist has software engineers
// Mechanical engineers? To design the hardware?
// Marketers, Sales people, hr, legal, finance (shared with larger mevs corp org?)
