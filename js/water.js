addLayer("w", {
  name: "Water", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
  // position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  milestones: {
    0: {
      requirementDescription: "1 Water",
      effectDescription:
        "Lose the ability to prestige, but gain water passively based on elements",
      done() {
        return player.w.best.gte(1);
      }
    },
    1: {
      requirementDescription: "1000 Water",
      effectDescription: "2.5x water production",
      done() {
        return player.w.best.gte(1000);
      }
    },
    2: {
      requirementDescription: "10000 Water",
      effectDescription: "2x water production",
      done() {
        return player.w.best.gte(10000);
      }
    },
    3: {
      requirementDescription: "1000000 Water",
      effectDescription: "2x water production (again)",
      done() {
        return player.w.best.gte(1000000);
      }
    }
  },
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      best: new Decimal(0)
    };
  },
  tabFormat() {
    let tabFormat = [
      "main-display",
      "blank",
      ["prestige-button", "Combine your elements into "],
      "milestones",
      "blank",
      "buyables",
      "blank",
      "upgrades"
    ];
    if (hasMilestone("w", 0)) {
      tabFormat.splice(2, 1);
    }
    return tabFormat;
  },
  color: "#30acff",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "Water", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  layerShown() {
    return (player.chosen.includes("water") && false);
  },
  branches: ["i"]
});
