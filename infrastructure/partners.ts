import type { Book } from "../industries/media.ts";
import { ProductionDeal } from "../industries/media.ts";
import type { Company } from "./company.ts";

export abstract class Partner {
  abstract name: string;
}

export class Factory extends Partner {
  name: string;
  location: string;
  contact: string;
  hasSignedContract: boolean;
  constructor(
    name: string,
    location: string,
    contact: string,
    hasSignedContract: boolean,
  ) {
    super();
    this.name = name; // why do i have to repeat this?
    this.location = location;
    this.contact = contact;
    this.hasSignedContract = hasSignedContract;
  }
}

export class AdvertisingPlatform extends Partner {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
}

export class Customer {
  name: string;
  // what do we want to know about customers?
  constructor(name?: string) {
    this.name = name ?? "CustomerX";
  }
}

export class Brand extends Partner {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
}

export class Publisher extends Partner {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
}

export class FilmProductionCompany extends Partner {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }

  public purchaseRights(
    book: Book,
    authorAttached: boolean,
    amount: number,
  ): ProductionDeal {
    book.filmRights.owner = this;
    let producers: (Partner | Company)[] = [];
    producers.push(this);
    if (authorAttached) {
      producers.push(book.owner);
    }
    let deal = new ProductionDeal(this, amount, book.title, ...producers);
    return deal;
  }
}

export class LocalGovernment extends Partner {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
}
