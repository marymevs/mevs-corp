import { Software, TechCompany } from "../industries/tech.ts";

export const HairCompanyX = new TechCompany("Hair Company X");
let virtualTryOnSoftware = new Software("Virtual Try On", 1500, "oneTime");

HairCompanyX.products.add(virtualTryOnSoftware);

// HairCompanyX has software engineers
// Sales people to sell to salons? Note that even though many companies have sales people, could the same person sell a gist printer and hair salon technology and shoes?
