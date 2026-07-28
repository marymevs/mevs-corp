/*
Mary funds Baby Cleo. A designer creates a loafer design. 
A cobbler produces two prototypes using different materials. 
One prototype is approved. A factory manufactures a limited run in several sizes. 
A marketer launches the shoe. A salesperson sells part of the inventory. 
Later, one customer returns for a repair.
*/

// import MevsCorp
import { BabyCleo } from "./companies/babyCleo.ts";
import { mevsCorp } from "./index.ts";
import { Designer, Cobbler, Marketer } from "./infrastructure/people.ts";
import { Investor } from "./infrastructure/finance.ts";
import { AdvertisingPlatform, Factory } from "./infrastructure/partners.ts";
// fund babyCleo with 1000 dollars
let investor = new Investor("Mary Imevbore");
mevsCorp.seed(10000, investor);
console.log(mevsCorp.printLedger());
mevsCorp.allocate(5000, BabyCleo);
// hire a designer
mevsCorp.chair.hire("Mary Imevbore", BabyCleo);
// create a designer
let designer = new Designer("Amina Muaddi");
BabyCleo.ceo?.hire(designer);
// designer creates a loafer designs
let loaferDesign = designer.design("leather", "loafer");
designer.nameShoe("it", loaferDesign);
// hire a cobbler
let cobbler = new Cobbler("Jimmy Choo");
BabyCleo.ceo?.hire(cobbler);
// cobbler produces two prototypes using different materials -- one leather and one plastic (innovative)
let leatherPrototype = cobbler.make(loaferDesign);
let plasticPrototype = cobbler.make(loaferDesign, "plastic");
// also note that i can create a prototype without the cobbler creating one,
// but maybe if a cobbler creates a prototype then it gets added to the companies prototypes?
// add notion of prototypes to company [x]
// add prototypes to set if cobbler makes it [x]
// who approves the prototype? the ceo?
// ok, maybe we have 'isApproved' on a prototype, and only approved prototypes can become shoe models/can be ordered as inventory
// if approved, then we make a shoe model, and then it gets added to products, and then only shoe models can become shoes
// add notion of approved to prototypes [x]
// add approve to ceo (note that for now approve is on all ceos, not shoe company ceo)
// so we need to have appoointed mary as the ceo here
BabyCleo.ceo?.approve(leatherPrototype);
let leatherLoaferModel = BabyCleo.addApprovedModelToCatalog(leatherPrototype);
let factory = new Factory(
  "KanoShoeMakersLtd",
  "Kano, NG",
  "Femilade Akingbe",
  true,
);
BabyCleo.placeShoeOrder(leatherLoaferModel, 2, factory); // oh, this is the problem
// GRRR ok when we add shoes to inventory, we need to specify size gosh dang
// we order inventory from a factory (since we have purchase inventory, do we actually need the notion of a factory rn?)
// ok, so we need to pull the shoe model we created
// a marketer launches the shoe (note that i think right now we can market a product that doesn't exist)
let marketer = new Marketer("Bozoma St John");
BabyCleo.ceo?.hire(marketer);
let facebook = new AdvertisingPlatform("Facebook");
marketer.runCampaign(marketer.developCampaign(leatherLoaferModel), facebook);
console.log(BabyCleo.print());
// a customer returns for a repair
// ok so then we'd need a notion of a customer if they're coming back
