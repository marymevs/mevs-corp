import type { Company } from "./company.ts";
import { Software } from "../industries/tech.ts";
import { Campaign } from "./marketing.ts";
import { Product } from "./product.ts";
import { Water, BottledWater } from "../industries/water.ts";
import { Book } from "../industries/media.ts";
import {
  Design,
  type Material,
  type Style,
  Prototype,
  ShoeCompany,
} from "../industries/shoes.ts";
import { MevsCorp } from "../mevscorp.ts";
import { AdvertisingPlatform } from "./partners.ts";

export type Department =
  | "engineering" // builds software and hardware
  | "product" // builds physical goods, cpg goods
  | "marketing" // gets the word out about the companies and products
  | "sales" // turns those aware of the product into customers
  | "operations" // makes sure that we have inventory
  | "people" // makes sure that employees are cared for
  | "finance" // makes sure that money moves as it should
  | "creative"; // designs brand and creates media assets

export class Employee {
  employeeId: string;
  name: string;
  company: Company | null = null;
  department?: Department = undefined;
  salary: number = 100000; // hardcoded for now
  constructor(name: string, department?: Department) {
    this.employeeId = crypto.randomUUID();
    this.name = name;
    this.department = department;
  }
}

export class ChairPerson {
  name: string;
  company: MevsCorp;
  constructor(name: string, mevscorp: MevsCorp) {
    this.name = name;
    this.company = mevscorp;
  }
  public hire(name: string, company: Company) {
    let ceo = new CEO(name);
    company.ceo = ceo;
    ceo.company = company;
  }

  public promote(manager: Manager) {
    let company = manager.company!;
    let ceo = new CEO(manager.name);
    company.employees.delete(manager.employeeId);
    company.ceo = ceo;
  }

  public fire(company: Company) {
    if (!company.ceo) throw new Error("company doesn't have a ceo to fire");
    company.ceo.company = null;
    company.ceo = null;
  }
}

type Level = "employee" | "manager";

export class CEO extends Employee {
  // wait, if ceo extended manager would i get the ability to hire employees automatically? and then if chair extended ceo, would i get the ability to hire managers automatically?
  public hire(name: string, level: Level, department: Department): void;
  public hire(employee: Employee): void;
  public hire(
    nameOrEmployee: string | Employee,
    level?: Level,
    department?: Department,
  ): void {
    let company = this.company;
    if (!company) throw new Error("ceo not employed at a company");
    // if employee, hire employee
    if (nameOrEmployee instanceof Employee) {
      company.employees.set(nameOrEmployee.employeeId, nameOrEmployee);
      nameOrEmployee.company = company;
      return;
    }
    // otherwise create employee with name
    let newHire;
    if (level === "employee") {
      newHire = new Employee(nameOrEmployee, department);
    } else {
      newHire = new Manager(nameOrEmployee, department);
    }

    company.employees.set(newHire.employeeId, newHire);
    newHire.company = company;
  }

  public promote(employee: Employee) {
    let manager = new Manager(employee.name);
    let company = this.company;
    if (!company) throw new Error("ceo not employed at a company");
    company.employees.delete(employee.employeeId);
    company.employees.set(manager.employeeId, manager);
  }

  public fire(manager: Manager) {
    this.company!.employees.delete(manager.employeeId);
  }

  public approve(prototype: Prototype) {
    // this will take in a prototype
    // mark approved
    prototype.isApproved = true; // how to make something such that only the ceo can perform the action?
    // then will create a shoeModel and add that to the list of products
    // and will add it to products
  }
}

export class Manager extends Employee {
  public hire(name: string, department: Department) {
    let employee = new Employee(name, department);
    let company = this.company;
    if (!company) throw new Error("manager not employed at a company");
    company.employees.set(employee.employeeId, employee);
    employee.company = company;
  }

  public fire(employee: Employee) {
    this.company!.employees.delete(employee.employeeId);
    employee.company = null;
  }
}

export class SoftwareEngineer extends Employee {
  department: Department = "engineering";
  // what is unique to a software engineer?
  // the tech stack they're working in?
  stack: Set<string> = new Set<string>();

  public code() {
    // what would this do? improve the quality of a software product?
  }

  public create(): Software | null {
    // this would create a new product?
    return null;
  }

  public document() {
    // what would this do? i guess make it such that another engineer could work on the same software? or on a new product this engineer had created?
    // maybe there's a 'isDocumented' boolean on the software product?
  }

  public learn(technology: string): void {
    // would learn a new tech stack, and would then add to their skills
    this.stack.add(technology);
    return;
  }
}

export class Marketer extends Employee {
  department: Department = "marketing";

  public developCampaign(product: Product): Campaign {
    // TODO determine budget
    let budget = 100;
    // TODO determine duration
    let duration = 4;
    let campaign = new Campaign(budget, duration, product);
    return campaign;
  }

  public runCampaign(campaign: Campaign, platform: AdvertisingPlatform) {
    // starts campaign clock
    // product is affected for the number of weeks of the campaign
    // campaign.run(); ??
    campaign.product.company?.market(
      campaign.budget,
      campaign.product,
      platform,
    );
  }
}

export class WellDriller extends Employee {
  // drills wells
  // drilling wells creates more water raw materials
  // then a water processer would create water bottles
  public drill(): Water {
    return new Water();
  }
}

export class WaterProcessor extends Employee {
  /**
   *
   * @param water
   * @returns BottledWater
   *
   * Takes water dug up by WellDriller and turns it into WaterBottle
   */
  public process(water: Water): BottledWater {
    return new BottledWater(water);
  }
}

export class Cobbler extends Employee {
  company: ShoeCompany | null = null; // hell yeah brother, cobblers can only work for shoe companies
  department: Department = "product";
  // Hmm, does a cobbler design shoes? or create prototypes?
  // Create shoe. Takes in a design and returns a prototype
  public make(design: Design, material?: Material): Prototype {
    let prototype = new Prototype(design);
    if (material) prototype.material = material;
    this.company?.prototypes.add(prototype);
    return prototype;
  }
}

export class Designer extends Employee {
  // will need a way to distinguish shoe designers from other designers. not all designers are making shoes
  department: Department = "product";
  public design(material: Material, style: Style): Design {
    return new Design("untitled", material, style);
  }

  public nameShoe(name: string, design: Design) {
    design.name = name;
  }
}

export class Editor extends Employee {
  // two types of editors, video editors and book editors
  // edits media
  // improves media quality
}

export class Producer extends Employee {
  // hm, well producers work on media like producer of a tv show
  // but they can also produce campaigns, and they make them happen/better
}

export class Writer extends Employee {
  // writers can write books and finish them
  public finish(book: Book) {
    book.status = "completed";
  }
}
