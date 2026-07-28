import { MevsCorp } from "./mevscorp.ts";

import { Gist } from "./companies/gist.ts";
import { FemaleGenius } from "./companies/femaleGenius.ts";
import { LivingWater } from "./companies/livingWater.ts";
import { BabyCleo } from "./companies/babyCleo.ts";
import { HairCompanyX } from "./companies/hairCompanyX.ts";

export const mevsCorp = new MevsCorp();
mevsCorp.companies.set(Gist.id, Gist);
mevsCorp.companies.set(FemaleGenius.id, FemaleGenius);
mevsCorp.companies.set(BabyCleo.id, BabyCleo);
mevsCorp.companies.set(LivingWater.id, LivingWater);
mevsCorp.companies.set(HairCompanyX.id, HairCompanyX);

console.log(new Date());

// showing what companies could be like in an ai first world?
// skips things that would be annoying without ai
// from the 80s -> today, it's the rise of multiconglomorate, multistrat firms, that are widget factoreis and hangle more data
// what would that mean?
// incorporate some sort of model (holding company as hedge fund)
// thinking about cash in the business as hedged by cash into another business
// hedge company has lots of different ways of exporsure
// straight forward equities
// futures
// option call options, put options
// derivaties
// really compliated asset classes like credit default swaps
// generating alpha --> making money
// beta is risk --> risk can be an assets itself
// sometimes you can be beta to the smp
// it's not
// more money than god --> it's about why hedge funds came to be, and couched in social history. it explains why we got to the hedge funds of today
