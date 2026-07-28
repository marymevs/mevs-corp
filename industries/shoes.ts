import { Company } from "../infrastructure/company.ts";
import { Product, type ProductType } from "../infrastructure/product.ts";
import { Factory } from "../infrastructure/partners.ts";

export class ShoeCompany extends Company {
  prototypes: Set<Prototype> = new Set<Prototype>();
  products: Set<ShoeModel> = new Set<ShoeModel>();
  inventory: Map<Shoe, number> = new Map<Shoe, number>();
  sizeRange: SizeRange = {
    sex: "womens",
    smallest: 35,
    largest: 42,
    doesHalfSizes: true,
  }; // this size range is the default, can be updated

  // public purchaseInventory(product: Product, quantity: number): void {
  //   if (product instanceof ShoeModel)
  //     throw new Error(
  //       "cannot add a model to inventory, must order a specific size",
  //     );
  //     this.purchaseInventory
  // }

  public addApprovedModelToCatalog(prototype: Prototype): ShoeModel {
    // throw error if prototype hasn't been approved
    if (!prototype.isApproved)
      throw new Error(
        "this prototype has not yet been approved. ceo must approve",
      );
    // create a shoe model out of the prototype
    let model = new ShoeModel(prototype.name, 500, prototype.cost ?? 100);
    // add shoe model to products set
    this.products.add(model);
    model.company = this;
    return model;
  }

  /*
for (let i = 35; i <= 42; i += 0.5) {
  let shoe = new Shoe(hands, i);
  BabyCleo.inventory.set(shoe, 0);
}
  */

  public placeShoeOrder(model: ShoeModel, quantity: number, factory: Factory) {
    // ok, for each size of shoe that we stock
    for (
      let i = this.sizeRange.smallest;
      i <= this.sizeRange.largest;
      i += this.sizeRange.doesHalfSizes ? 0.5 : 1
    ) {
      // we should create a shoe of that model and size
      let shoe = new Shoe(model, i);
      // and purchase inventory
      this.purchaseInventory(shoe, quantity, factory);
    }
  }
}

export class ShoeModel extends Product {
  type: ProductType = "physical";
}

export class Shoe extends Product {
  model: ShoeModel;
  size: number;
  type: ProductType;
  constructor(model: ShoeModel, size: number) {
    super(`${model.name.toLowerCase()}-size:${size}`, model.price, model.cogs);
    this.model = model;
    this.size = size;
    this.type = model.type;
  }
}

export class Prototype {
  // code is basically the same as a design, so how will these differ?
  // maybe it's the prototypes have associated costs, and a shoe model's cogs will take its cost from the prototype's cost
  name: string;
  material: Material;
  style: Style;
  cost: number | null = null; // how to determine the prototype's cost? and when? in the constructor? as a separate method? who or what decides how much it costs?
  isApproved: boolean = false;
  constructor(design: Design) {
    this.name = design.name;
    this.material = design.material;
    this.style = design.style;
  }
}

export class Design {
  name: string;
  material: Material;
  style: Style;
  constructor(name: string, material: Material, style: Style) {
    this.name = name;
    this.material = material;
    this.style = style;
  }
}

export type Material = "leather" | "canvas" | "plastic";
export type Style = "flat" | "heel" | "boot" | "sneaker" | "loafer";
export type SizeRange = {
  sex: "mens" | "womens";
  smallest: number;
  largest: number;
  doesHalfSizes: boolean;
};
