"use strict";
const assert = require("assert");

const jobTypes = {
  pilot: "MAV",
  mechanic: "Repair Ship",
  commander: "Main Ship",
  programmer: "Any Ship!",
};

class CrewMember {
  constructor(name, job, specialSkill, ship) {
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
    this.ship = ship;
  }
  enterShip = (shipObj) => {
    shipObj.crew.push(this);
    this.ship = shipObj;
  };
}

const crewMember1 = new CrewMember(
  "Rick Martinez",
  "pilot",
  "chemistry",
  "MAV"
);
console.log(crewMember1);

const crewMember2 = new CrewMember("Commander Lewis", "commander", "geology");
console.log(crewMember2);

class Ship {
  constructor(name, type, ability, crew) {
    this.name = name;
    this.type = type;
    this.ability = ability;
    if (crew == null) {
      this.crew = [];
    } else {
      this.crew = crew;
    }
  }
  missionStatement() {
    if (this.crew.length === 0) {
      return "Can't perform a mission yet.";
    } else {
      return this.ability;
    }
  }
}

const mav = new Ship("Mars Ascent Vehicle", "MAV", "Ascend into low orbit");
console.log(mav);

const hermes = new Ship("Hermes", "Main Ship", "Interplanetary Space Travel");
console.log(hermes);

if (typeof describe === "function") {
  describe("CrewMember", function () {
    it("should have a name, a job, a specialSkill and ship upon instantiation", function () {
      const crewMember1 = new CrewMember("Rick Martinez", "pilot", "chemistry");
      assert.equal(crewMember1.name, "Rick Martinez");
      assert.equal(crewMember1.job, "pilot");
      assert.equal(crewMember1.specialSkill, "chemistry");
      assert.equal(crewMember1.ship, null);
    });

    it("can enter a ship", function () {
      let mav = new Ship("Mars Ascent Vehicle", "MAV", "Ascend into low orbit");
      const crewMember1 = new CrewMember("Rick Martinez", "pilot", "chemistry");
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  describe("Ship", function () {
    it("should have a name, a type, an ability and an empty crew upon instantiation", function () {
      let mav = new Ship("Mars Ascent Vehicle", "MAV", "Ascend into low orbit");
      assert.equal(mav.name, "Mars Ascent Vehicle");
      assert.equal(mav.type, "MAV");
      assert.equal(mav.ability, "Ascend into low orbit");
      assert.equal(mav.crew.length, 0);
    });

    it("can return a mission statement correctly", function () {
      let mav = new Ship("Mars Ascent Vehicle", "MAV", "Ascend into low orbit");
      const crewMember1 = new CrewMember("Rick Martinez", "pilot", "chemistry");
      let hermes = new Ship(
        "Hermes",
        "Main Ship",
        "Interplanetary Space Travel"
      );
      const crewMember2 = new CrewMember(
        "Commander Lewis",
        "commander",
        "geology"
      );
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}
