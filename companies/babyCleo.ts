import { ShoeCompany, ShoeModel, Shoe } from "../industries/shoes.ts";

export const BabyCleo = new ShoeCompany("Baby Cleo");

/**
 * Ok, baby cleo has specific shoe models, and sizing choices, and employees, and development state
 */

// // Inventory
// const hands = new ShoeModel("Hands", 900, 300);
// BabyCleo.products.add(hands);

// // Sizing
// // a for loop that creates sizing from 35 to 42, going up every half size
// // add each model to inventory at quantity 0
// for (let i = 35; i <= 42; i += 0.5) {
//   let shoe = new Shoe(hands, i);
//   BabyCleo.inventory.set(shoe, 0);
// }

// Employees:
// Tanners who produce leather
// Designer who designs shoes
// Cobbler who takes in a design and raw materials returns a shoe [x]
// Cobblers are also designing prototypes, and that has its own associated cost
// As well as creating inventory
// Perhaps the prototype is sent to a factory who produces inventory
// This introduces the notion of a Collaborator or Partner, which is different from an Employee
// Cobblers can also repair shoes
// Cobblers can also change shoe materials (like make the same design in a canvas or a plastic)
// Marketers to market shoes
// Sales person to sell shoes
// Shares finance, legal, and hr with larger MevsCorp Org

// Potential Story:
/*
Mary funds Baby Cleo. A designer creates a loafer design. 
A cobbler produces two prototypes using different materials. 
One prototype is approved. A factory manufactures a limited run in several sizes. 
A marketer launches the shoe. A salesperson sells part of the inventory. 
Later, one customer returns for a repair.
*/
