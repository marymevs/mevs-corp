import { MediaCompany, Media, Show, Book } from "../industries/media.ts";
import { Writer } from "../infrastructure/people.ts";
export const FemaleGenius = new MediaCompany("Female Genius Productions");

const theMaryShow = new Show(
  "The Mary Show",
  "youtube",
  "weekly",
  FemaleGenius,
);
const femaleGeniusBook = new Book(
  "Female Genius",
  "fiction",
  new Writer("Mary Imevbore"),
  FemaleGenius,
);
const everythingIsEverything = new Media(
  "Everything Is Everything",
  null,
  "book",
  FemaleGenius,
);
const getTheeToTheNunnery = new Media(
  "Get Thee to the Nunnery",
  null,
  "book",
  FemaleGenius,
);
const familyHistoryBook = new Media(
  "Remember We Are Building An Empire",
  null,
  "book",
  FemaleGenius,
);
FemaleGenius.assets.push(theMaryShow);
FemaleGenius.assets.push(femaleGeniusBook);
FemaleGenius.assets.push(everythingIsEverything);
FemaleGenius.assets.push(getTheeToTheNunnery);
FemaleGenius.assets.push(familyHistoryBook);

console.log(FemaleGenius.assets[0]);

// Employees:
// Producers who work on shows and produce episodes
// How to model out an instance of media like an episode of a show or a copy of a book? Those aren't quite the same though
// Editors who take manuscripts and turn them into books?
// Publishers really take manuscripts and turn them into books though
// Writers produce manuscripts for books
// Writers also produce scripts for TV and Movie
// Writers might also take in IP and turn one sort of media into another, like turning a book into a movie script
// Producers take in IP or Books or Scripts and produce Movies or TV
// Then if we're talking movies, there are directors, editors, actors, etc
// And then do we model out the platforms? Instagram, TikTok, Youtube, Streaming, Theater?
// Shows can be on Youtube or Streaming
// Movies can be on Youtube or Streaming or Theater
// Books? Perhaps video vs print media should be split out? Books are sold on Amazon, Bookstores, anywhere else? Wholesale, which could then be to library networks or schools?

// royalties, licensing, advances, profit participation, and rights management ??

// Potential simulation
/**
 * Mary creates a concept. A writer turns it into a script.
 * A producer sets a budget and assembles a team.
 * Actors and a director produce an episode. An editor completes it.
 * Female Genius releases it on YouTube.
 * The episode attracts viewers and earns advertising or sponsorship revenue.
 * Later, the company licenses the format to a streaming platform or adapts the concept into a book.
 */
