import type { Partner } from "./partners";

export abstract class Contract {
  signer: Partner;
  amount: number;
  constructor(signer: Partner, amount: number) {
    this.signer = signer;
    this.amount = amount;
  }
}
