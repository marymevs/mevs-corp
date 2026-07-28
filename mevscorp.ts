import { Company } from "./infrastructure/company.ts";
import { Employee, ChairPerson } from "./infrastructure/people.ts";
import {
  type Ledger,
  Transaction,
  Investor,
} from "./infrastructure/finance.ts";

import { TechCompany } from "./industries/tech.ts";
import { MediaCompany } from "./industries/media.ts";
import { ShoeCompany } from "./industries/shoes.ts";
import { WaterCompany } from "./industries/water.ts";

type Industry = "tech" | "media" | "water" | "shoes";

export class MevsCorp {
  name: string = "MevsCorp";
  companies: Map<string, Company> = new Map<string, Company>();
  employees: Map<string, Employee> = new Map<string, Employee>();
  private cash: number = 0;
  private ledger: Ledger = [];
  chair: ChairPerson;
  constructor() {
    this.chair = new ChairPerson("Mary Imevbore", this);
  }

  public get balance(): number {
    return this.cash;
  }

  public seed(amount: number, source: Investor) {
    this.cash += amount;
    let transaction = new Transaction(source, this, amount, "seed funding");
    this.ledger.push(transaction);
  }

  /**
   * takes funds from one company and moves to another
   * or takes funds from mevs corp cash on hand and moves to company
   */
  public allocate(
    amount: number,
    to: Company,
    from: Company | null = null,
  ): void {
    // log in ledger
    let transaction = new Transaction(
      from ?? this,
      to,
      amount,
      "allocation of funds",
    );
    // if there is a from, subtract money from there and move to to
    if (from) {
      if (from.balance - amount < 0)
        throw new Error("not enough money for this transaction");
      from.debit(amount);
      to.credit(amount);
      from.ledger.push(transaction);
      to.ledger.push(transaction);

      return;
    }
    // else, take from mevs corp cash on hand
    if (this.cash - amount < 0)
      throw new Error("not enough money for this transaction");
    this.cash -= amount;
    to.credit(amount);
    this.ledger.push(transaction);
    to.ledger.push(transaction);
  }
  /**
   *
   * @param companyId
   * @returns
   * Removes a given company from the list of companies
   * and returns their cash to the holding company's cash on hand
   */
  public windDown(companyId: string): void {
    let company = this.companies.get(companyId);
    if (!company) throw new Error("company doesn't exist");
    this.cash += company.balance;
    this.companies.delete(companyId);
    return;
  }

  /**
   *
   * @param company
   * @returns
   * Adds the company to the list of companies
   */
  public acquire(company: Company): void {
    this.companies.set(company.id, company);
    return;
  }

  /**
   *
   * @param name
   * @param industry
   * @returns the created company
   *
   * Creates a new company with the given name and the given industry
   */
  public create(name: string, industry: Industry): Company {
    let company;
    switch (industry) {
      case "tech":
        company = new TechCompany(name);
        break;
      case "media":
        company = new MediaCompany(name);
        break;
      case "shoes":
        company = new ShoeCompany(name);
        break;
      case "water":
        company = new WaterCompany(name);
    }
    this.companies.set(company.id, company);

    return company;
  }

  public print(): string {
    let snapshot = "";
    let companies = "";
    for (let [_, company] of this.companies) {
      companies += company.print();
    }
    snapshot += `MEVS CORP\n\nChair: ${this.chair.name}\nCash: ${this.cash}\nCompanies: ${this.companies.size}\n\nPortfolio--\n${companies}`;
    return snapshot;
  }

  public printLedger(): string {
    let transactions = `\n${this.name} Ledger\n\n`;
    for (const transaction of this.ledger) {
      transactions += `ID: ${transaction.id}\nDate: ${transaction.date}\nFrom: ${transaction.from.name}\nTo: ${transaction.to.name}\nAmount: ${transaction.amount}\n\n`;
    }
    return transactions;
  }
}
