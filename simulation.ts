/**
 * Mevs Corp begins January with $10,000. It owns Gist.
 * Mary allocates $5,000 to Gist, appoints a CEO, and the CEO hires an engineer and marketer.
 * Gist produces ten printers. The marketer runs a campaign. Gist sells three printers.
 * The month ends, revenue is recognized, expenses are paid, and Mary reviews the company’s remaining cash, inventory, and performance.
 */
import { MevsCorp } from "./mevscorp.ts";
import { Gist } from "./companies/gist.ts";
import { SoftwareEngineer, Marketer } from "./infrastructure/people.ts";
import { Hardware } from "./industries/tech.ts";
import { Investor } from "./infrastructure/finance.ts";
import {
  AdvertisingPlatform,
  Factory,
  Customer,
} from "./infrastructure/partners.ts";

// Mevs Corp begins with 10,000 --> note that we don't have a notion of time yet
let mevscorp = new MevsCorp();
// should there be a seed(amount) function that injects a company with money
let investor = new Investor("Mary Imevbore");
mevscorp.seed(10000, investor);
// should MevsCorp be an extension of company? something to think about
console.log(mevscorp.balance);

// Mary allocates 5000 to gist
mevscorp.allocate(5000, Gist); // note that right now i can allocate money to companies without acquiring them, is that what i want?
console.log(Gist.printLedger());
console.log(mevscorp.printLedger());
console.log(Gist.balance);
mevscorp.companies.set(Gist.id, Gist);
console.log(mevscorp.companies); // add a print companies option?

// Mary appoints a ceo
// Mary must first exist. should there also be a notion of a person?
// oh wait, i do exist
mevscorp.chair.hire("Mary Imevbore", Gist);
console.log(Gist.ceo);
console.log(mevscorp.chair);
// CEO hires an engineer --> right now ceo can't do this, can only hire a manager
// ok, now ceo can hire an employee, but can't actually hire an engineer.
let engineer = new SoftwareEngineer("Ada Lovelace");
Gist.ceo?.hire(engineer);
console.log(Gist.employees);
// should hire take a person and make them anew? or should it take an employee and add them to the employee list? maybe both
// also it occurs to me that employees should have salaries
// CEO hires a marketer
let marketer = new Marketer("Bozoma Saint John");
Gist.ceo?.hire(marketer);
console.log(Gist.employees);

// Gist produces 10 printers --> how to model purchasing inventory? and where purchased from? or is it made in house?
let printer = new Hardware("Gist Printer", 90, 60);
let printerFactory = new Factory(
  "PrintersWholesaleLtd",
  "Guangzhou, CN",
  "Frank Waeve",
  true,
);
Gist.purchaseInventory(printer, 10, printerFactory);
console.log(Gist.printLedger());
console.log(Gist.inventory);
console.log(Gist.balance);
// Marketer runs a campaign on the printers
let facebook = new AdvertisingPlatform("Facebook");
let campaign = marketer.developCampaign(printer);
marketer.runCampaign(campaign, facebook);
console.log(Gist.printLedger());
console.log(Gist.balance);
console.log(printer.demand);
// Gist sells 3 printers
let customer = new Customer();
Gist.sell(printer, 3, customer);
console.log(Gist.printLedger());
console.log(Gist.inventory);

console.log(Gist.revenue);
console.log(Gist.print());
console.log(mevscorp.print());

// The month ends --> how are we modeling time? Just checking on our data structures now?
// Review remaining cash, inventory, and performance --> how to review performance?
// Also employees can have salaries but how are they dispensed?
