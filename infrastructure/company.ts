import type { CEO, Employee } from "./people.ts";
import type { Product } from "./product.ts";
import type { Ledger } from "./finance.ts";
import { Transaction } from "./finance.ts";
import type { AdvertisingPlatform, Factory, Customer } from "./partners.ts";

export abstract class Company {
  id: string;
  name: string;
  ceo: CEO | null = null;
  private cash: number = 0;
  ledger: Ledger = [];
  employees: Map<string, Employee> = new Map<string, Employee>();
  revenue: number = 0;
  products: Set<Product> = new Set<Product>();
  inventory: Map<Product, number> = new Map<Product, number>(); // is there a way to confirm that inventory products are in products set?

  constructor(name: string) {
    this.name = name;
    this.id = crypto.randomUUID();
  }

  public get balance(): number {
    return this.cash;
  }

  public debit(amount: number) {
    this.cash -= amount;
  }

  public credit(amount: number) {
    this.cash += amount;
  }

  /**
   *
   * @param budget
   * @param product
   *
   * Spends money on marketing dollars for a given product
   */
  public market(
    spend: number,
    product: Product,
    platform: AdvertisingPlatform,
  ): void {
    if (spend <= this.cash) {
      this.cash -= spend;
      product.demand += spend / 10; // demand goes up 1 point for every 10 dollars spent
      // add transaction to ledger
      let transaction = new Transaction(
        this,
        platform,
        spend,
        "marketing spend",
      );
      this.ledger.push(transaction);
    } else if (spend > this.cash + this.revenue) {
      throw new Error("not enough money for this campaign sorry");
    } else {
      this.cashout();
      this.market(spend, product, platform);
    }
    return;
  }

  /**
   *
   * @param product
   * @param quanitity
   * @returns void
   *
   * Confirms that we have the inventory, and if so, removes product from inventory and adds price to revenue
   */
  public sell(product: Product, quantity: number, customer: Customer): void {
    let stock = this.inventory.get(product);
    if (stock === undefined) throw new Error("no such product in inventory");
    if (stock >= quantity) {
      stock -= quantity;
      this.inventory.set(product, stock);
      let revenue = product.price * quantity;
      this.revenue += revenue;

      // add transaction to ledger
      let transaction = new Transaction(
        customer,
        this,
        revenue,
        "sale of goods",
      );
      this.ledger.push(transaction);
      return;
    }
    throw new Error("not enough product on hand for this sale");
  }

  // we don't pull from revenue if not enough money. is that intended?
  public purchaseInventory(
    product: Product,
    quantity: number,
    factory: Factory,
  ) {
    // check that we can afford it
    // calculate cost
    let cost = product.cogs * quantity;
    if (cost > this.cash)
      throw new Error("not enough money to purchase inventory");
    // if no, throw an error
    // if yes, reduce cost from cash
    this.cash -= cost;
    // add products to inventory
    // check if we already have the product in inventory
    let currentCount = this.inventory.get(product);
    if (currentCount) {
      currentCount += quantity;
      this.inventory.set(product, currentCount);
    } else {
      this.inventory.set(product, quantity);
    }
    product.company = this;

    // log transaction in ledger
    let transaction = new Transaction(
      this,
      factory,
      cost,
      "inventory purchase order",
    );
    this.ledger.push(transaction);
  }

  /**
   * Moves revenue to cash on hand
   */
  public cashout() {
    this.cash += this.revenue;
    this.revenue = 0;
  }

  public print(): string {
    let products = "";
    for (let product of this.products) {
      products += `${product.name}, Cost = ${product.cogs}, Price = ${product.price} Demand = ${product.demand}\n`;
    }
    let inventory = "";
    for (let [product, count] of this.inventory) {
      inventory += `${product.name}: ${count}\n`;
    }
    return `\n${this.name.toUpperCase()}\n\nCeo: ${this.ceo?.name}\nCash: ${this.cash}\nRevenue: ${this.revenue}\nEmployees: ${this.employees.size}\n\nProducts:\n${products}\n\nInventory:\n${inventory}`;
  }

  public printLedger(): string {
    let transactions = `\n${this.name} Ledger\n\n`;
    for (const transaction of this.ledger) {
      transactions += `ID: ${transaction.id}\nDate: ${transaction.date}\nFrom: ${transaction.from.name}\nTo: ${transaction.to.name}\nAmount: ${transaction.amount}\nMemo: ${transaction.memo}\n\n`;
    }
    return transactions;
  }
}
