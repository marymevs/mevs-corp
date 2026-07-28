import { Company } from "../infrastructure/company.ts";
import { Contract } from "../infrastructure/contracts.ts";
import { LocalGovernment } from "../infrastructure/partners.ts";
import { Product, type ProductType } from "../infrastructure/product.ts";
import { Transaction } from "../infrastructure/finance.ts";
export class WaterCompany extends Company {
  inventory: Map<BottledWater, number> = new Map<BottledWater, number>();
  public sign(contract: WaterRightsContract) {
    // living water pays the amount
    this.debit(contract.amount);
    // todo: make sure we have enough money
    // but also maybe we allow debt?
    // logs transaction in ledger
    let transaction = new Transaction(
      this,
      contract.signer,
      contract.amount,
      "payment for rights to draw and sell water",
    );
    this.ledger.push(transaction);
  }
}

type WaterSource = string;

export class Water {
  // what is water, if it's not yet a product? how to model out raw materials?
  source: WaterSource = "Jos";
}

export class BottledWater extends Product {
  type: ProductType = "physical";
  source: string;
  constructor(water: Water) {
    super("bottled water", 3, 1);
    this.source = water.source;
  }
}

export class WaterRightsContract extends Contract {
  source: WaterSource;
  duration: number; // years
  amount: number;
  constructor(
    grantor: LocalGovernment,
    source: WaterSource,
    duration: number,
    amount: number,
  ) {
    super(grantor, amount);
    this.amount = amount;
    this.source = source;
    this.duration = duration;
  }
}
