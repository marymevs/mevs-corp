import { Company } from "../infrastructure/company.ts";
import { Contract } from "../infrastructure/contracts.ts";
import type {
  Brand,
  FilmProductionCompany,
} from "../infrastructure/partners.ts";
import { Transaction } from "../infrastructure/finance.ts";
import type { Writer } from "../infrastructure/people.ts";
import type { Partner, Publisher } from "../infrastructure/partners.ts";

export class MediaCompany extends Company {
  assets: Media[] = [];

  public sign(contract: Contract) {
    // in reality, the money would move based on the payment terms, but we can model that out later
    // signing a contract should put the amount of the contract in the company's cash (or revenue???)
    // let's say revenue
    // and then it should update the ledger
    // discern deal type
    let dealType: DealType;
    let media = "";
    if (contract instanceof BrandSponsorshipAgreement) {
      dealType = "sponsorship";
      media += contract.show.name;
    } else if (contract instanceof PublishingAgreement) {
      dealType = "publishing";
      media += contract.books[0].title; // will only surface one of the books in the deal in the memo
    } else if (contract instanceof ProductionDeal) {
      dealType = "film production";
      media += contract.filmIP;
    } else {
      dealType = "misc";
    }

    let transaction = new Transaction(
      contract.signer,
      this,
      contract.amount,
      `${dealType} deal for ${media}`,
    );
    this.ledger.push(transaction);
    this.revenue += contract.amount;
  }
}

export class Media {
  name: string;
  platform: Platform;
  format: MediaFormat;
  owner: MediaCompany;
  constructor(
    name: string,
    platform: Platform,
    format: MediaFormat,
    owner: MediaCompany,
  ) {
    this.name = name;
    this.platform = platform;
    this.format = format;
    this.owner = owner;
  }
}

export class Show extends Media {
  releaseCadence: ReleaseCadence;
  constructor(
    name: string,
    platform: Platform,
    releaseCadence: ReleaseCadence,
    owner: MediaCompany,
  ) {
    super(name, platform, "video", owner);
    this.releaseCadence = releaseCadence;
  }
}

export class Book extends Media {
  title: string;
  genre: BookGenre;
  author: Writer;
  status: BookStatus = "concepted";
  filmRights: FilmRights = new FilmRights(this, 10);
  constructor(
    title: string,
    genre: BookGenre,
    author: Writer,
    owner: MediaCompany,
  ) {
    super(title, null, "book", owner);
    this.title = title;
    this.genre = genre;
    this.author = author;
  }
}

type BookStatus = "concepted" | "in progress" | "completed" | "edited";
type BookGenre = "fiction" | "nonfiction";

type Platform = "youtube" | "tv" | "instagram" | "tiktok" | null;
type MediaFormat = "book" | "video" | "audio";
type ReleaseCadence = "weekly" | "biweekly" | "daily";

export class BrandSponsorshipAgreement extends Contract {
  show: Show;
  brand: Brand;
  amount: number;
  numEpisodes: number;
  constructor(show: Show, brand: Brand, amount: number, numEpisodes: number) {
    super(brand, amount);
    this.show = show;
    this.brand = brand;
    this.amount = amount;
    this.numEpisodes = numEpisodes;
  }
}

export class PublishingAgreement extends Contract {
  publisher: Publisher;
  books: Book[];
  amount: number;
  // in reality there is an advance and royalties but we'll just model out deal amount for now
  constructor(publisher: Publisher, amount: number, ...books: Book[]) {
    super(publisher, amount);
    this.publisher = publisher;
    this.amount = amount;
    if (books.length < 1)
      throw new Error("need at least one book to enter a publishing agreement");
    this.books = books;
  }
}

type DealType = "sponsorship" | "publishing" | "film production" | "misc";

export class FilmRights {
  book: Book;
  duration: number; // number of years?
  owner: Company | Partner;
  constructor(book: Book, duration: number) {
    this.book = book;
    this.duration = duration;
    this.owner = book.owner;
  }
}

export class ProductionDeal extends Contract {
  // ok so this has an amount
  // has an array of producers
  // but how to model the fact that the deal attaches fg as a producer?
  productionCompany: FilmProductionCompany;
  producers: (Partner | Company)[];
  filmIP: string;

  amount: number;
  isFGattached: boolean = true;
  constructor(
    productionCompany: FilmProductionCompany,
    amount: number,
    filmIp: string,
    ...producers: (Partner | Company)[]
  ) {
    super(productionCompany, amount);
    this.filmIP = filmIp;
    this.productionCompany = productionCompany;
    this.amount = amount;
    this.producers = producers;
  }
}

// todo: key assets by title
