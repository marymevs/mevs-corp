// Simulation:
// Mevs Corp gives Living Water startup capital.
// Living Water signs an exclusive agreement allowing it to draw water from a spring for five years,
// paying an upfront access fee plus a royalty based on the amount extracted.
// It obtains the required authorization to withdraw and bottle the water.
// It pays a contractor to prepare the source, extracts a batch of raw water, tests and processes it,
// and pays a bottling partner to turn that batch into bottled-water inventory.
// A marketer creates demand, and a salesperson secures a wholesale order from a group of stores or cafés.
// Living Water fulfills the order, receives revenue, pays the source royalty,
// and reports its remaining cash, bottled inventory, and the remaining term on its water-access agreement.

// mevs corp seeds living water
import { mevsCorp } from "./index.ts";
import { Investor } from "./infrastructure/finance.ts";
import { LivingWater } from "./companies/livingWater.ts";
import { WaterRightsContract } from "./industries/water.ts";
import { LocalGovernment } from "./infrastructure/partners.ts";
import { WaterProcessor, WellDriller } from "./infrastructure/people.ts";
let investor = new Investor("Mary Imevbore");
mevsCorp.seed(10000, investor);
mevsCorp.allocate(5000, LivingWater);

// Living water signs an exclusive agreement allowing it to draw water from a spring for 5 years
// pull contract into infrastructure (maybe partners file) [x]
let josLocalGov = new LocalGovernment("Jos Local Government");
let waterAgreement = new WaterRightsContract(josLocalGov, "jos", 5, 10000);
LivingWater.sign(waterAgreement);
console.log(LivingWater.printLedger());
console.log(LivingWater.balance);
// Note that we did not model out royalties yet
// now a well driller can draw up water
let wellDriller = new WellDriller("Aquaboy");
let water = wellDriller.drill();
let waterProcessor = new WaterProcessor("Aquaman");
let bottledWater = waterProcessor.process(water);
// ok this model needs to change because one water unit produces one bottle of water and that doesn't make sense
