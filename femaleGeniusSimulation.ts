/**
 * Mevs Corp gives Female Genius operating cash.
 *
 * Female Genius hires a producer and an editor to work on The Mary Show.
 * The show continues releasing weekly.
 * A brand signs a contract to sponsor the next 12 episodes
 * and pays Female Genius an agreed amount for each episode that is released.
 * Female Genius pays the producer and editor, releases the episodes,
 * and records the sponsorship revenue.
 *
 * At the same time, Mary finishes a book.
 * Female Genius signs a publishing agreement with Vintage,
 * giving Vintage the right to publish it while keeping the movie rights.
 * Vintage pays an advance.
 *
 * After the book is published, a film company pays to option the movie rights.
 * As part of the deal, Female Genius is attached as a producer.
 * If the movie moves forward, the film company buys the rights
 * and pays Female Genius a producer fee.
 */

import { mevsCorp } from "./index.ts";
import { Investor } from "./infrastructure/finance.ts";
import { FemaleGenius } from "./companies/femaleGenius.ts";
import { Editor, Producer } from "./infrastructure/people.ts";
import {
  Brand,
  Publisher,
  FilmProductionCompany,
} from "./infrastructure/partners.ts";
import {
  BrandSponsorshipAgreement,
  Show,
  Book,
  PublishingAgreement,
} from "./industries/media.ts";
let mary = new Investor("Mary Imevbore");
mevsCorp.seed(10000, mary);

// Mevs Corp gives Female Genius operating cash
mevsCorp.allocate(1000, FemaleGenius);
// Female Genius hires a producer and and editor to work on the mary show
let producer = new Producer("Isha Singh");
let editor = new Editor("Jennifer Lame");
mevsCorp.chair.hire("Mary Imevbore", FemaleGenius);
// how to denote what the editor and producer is working on?
FemaleGenius.ceo?.hire(producer);
FemaleGenius.ceo?.hire(editor);
// the show continues releasing weekly --> maybe the notion of a production schedule
// a brand signs a contract so sponsor the next 12 episodes
let theMaryShow = FemaleGenius.assets[0];
if (!(theMaryShow instanceof Show))
  throw new Error("Expected mary show to be a show");
let hammermill = new Brand("Hammermill Paper");
let brandDeal = new BrandSponsorshipAgreement(
  theMaryShow,
  hammermill,
  25000,
  20,
);
// how to represent the fact that a new contract means we have money?
// maybe there's a company.sign(Contract) ?
FemaleGenius.sign(brandDeal);
console.log(FemaleGenius.printLedger());
console.log(FemaleGenius.balance);
console.log(FemaleGenius.revenue);
// and then it allocates money based on the terms? --> will do this part later
// female genius pays the producer and editor, releases the episodes --> i'm not modeling salary right now
// female genius records sponsorship revenue --> all at once? or per episode? i think all ot once for now
// mary finishes a book --> a notion of a work in progress?
let femaleGeniusBook = FemaleGenius.assets[1];
if (!(femaleGeniusBook instanceof Book))
  throw new Error("expected the second asset to be a book");
console.log(femaleGeniusBook.status);
femaleGeniusBook.author.finish(femaleGeniusBook); // i'm shocked that i can do this?
console.log(femaleGeniusBook.status);
// female genius signs a publishing agreement with vintage
let vintage = new Publisher("Vintage");
let publishingDeal = new PublishingAgreement(vintage, 100000, femaleGeniusBook);
FemaleGenius.sign(publishingDeal);
console.log(FemaleGenius.printLedger());
console.log(FemaleGenius.revenue);
// vintage pays an advance --> do i want that advance going to my publishing company? or me?
// after book is published film company pays for movie rights --> so there's the notion of movie rights which exist on a book?
let planB = new FilmProductionCompany("Plan B Productions");
let deal = planB.purchaseRights(femaleGeniusBook, true, 1000000);
console.log(femaleGeniusBook.filmRights);
console.log(deal);
// as part of the deal, female genius is attached as a producer --> ok, so there's a notion of a deal
// and then Female Genius is paid a producer fee. --> I also want to model ownership on a project
// sign deal
FemaleGenius.sign(deal);
console.log(FemaleGenius.printLedger());
console.log(FemaleGenius.revenue);
