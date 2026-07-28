import { Company } from "../infrastructure/company.ts";
import { Product, type ProductType } from "../infrastructure/product.ts";

export class TechCompany extends Company {
  software: Set<Software> = new Set<Software>();
  hardware: Set<Hardware> = new Set<Hardware>();
}

export class Hardware extends Product {
  type: ProductType = "physical";
}

export class Software extends Product {
  type: ProductType = "digital";
  isDocumented: boolean = false;
  license: LicenseRenewalType;
  constructor(name: string, price: number, license: LicenseRenewalType) {
    super(name, price, 0); // no cogs for software
    this.license = license;
  }
}

type LicenseRenewalType = "oneTime" | "recurring";
