addLayer("f", {
  name: "fire", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
  // position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      best: new Decimal(0),
      essence: new Decimal(0),
      spellTimes: {
        11: new Decimal(0),
      },
      spellUses: {
        11: new Decimal(0)
      },
      
    };
  },
  color: "#d24141",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "Fire", // Name of prestige currency
  baseResource: "elements", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    if (player.f.spellTimes[11].gt(0)) mult = mult.times(buyableEffect("f", 11))
    if (player.f.spellTimes[11].lte(0) && player.f.spellTimes[11].gt(-20) && hasUpgrade("f", 22)) mult = mult.times(buyableEffect("f", 11).sub(1).div(2).add(1))
    if (hasMilestone("f", 1)) mult = mult.times(2.5)
    if (hasMilestone("f", 2)) mult = mult.times(2)
    if (hasMilestone("f", 3)) mult = mult.times(2)
    if (hasUpgrade("f", 12)) mult = mult.times(2)
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  essenceMult() {
    mult = new Decimal(1)
    if (hasUpgrade("f", 14)) mult = mult.times(1.5)
    if (hasUpgrade("f", 25) && player.f.spellTimes[11].gt(0)) mult = mult.times(upgradeEffect("f", 25))
    if (hasUpgrade("f", 25) && player.f.spellTimes[11].lte(0) && player.f.spellTimes[11].gt(-20) && hasUpgrade("f", 22)) mult = mult.times(upgradeEffect("f", 25).sub(1).div(2).add(1))
    return mult
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  layerShown() {
    return player.chosen.includes("fire");
  },
  milestones: {
    0: {
      requirementDescription: "1 Fire",
      effectDescription:
        "Lose the ability to prestige, but gain fire passively based on elements",
      done() {
        return player.f.best.gte(1);
      }
    },
    1: {
      requirementDescription: "1000 Fire",
      effectDescription: "2.5x fire production",
      done() {return player.f.best.gte(1000)}
    },
    2: {
      requirementDescription: "10000 Fire",
      effectDescription: "2x fire production",
      done() {return player.f.best.gte(10000)}
    },
    3: {
      requirementDescription: "1000000 Fire",
      effectDescription: "2x fire production (again)",
      done() {return player.f.best.gte(1000000)}
    },
  },
  tabFormat: function() {
    let text = "";
    let text2 = "";
    if (isNerdMode()) {
      var fireboost = layers.f.gainMult()
      text = `Fire Gain Formula: sqrt(elements/10)/10 * ${format(fireboost)}`;
      fireboost = layers.f.essenceMult()
      text2 = `Fire Essence Gain Formula: fire/100 * ${format(fireboost)}`;
    }
    let mainDisplay = `
      You have <h2 style="color: #d24141; text-shadow: 0px 0px 10px #d24141">${format(
        player.f.points
      )}</h2> Fire and <h2 style="color: #d24141; text-shadow: 0px 0px 10px #d24141">${format(
      player.f.essence
    )}</h2> Fire Essence<br>
      ${
        hasMilestone("f", 0)
          ? `You are getting ${format(
              new Decimal(tmp.f.resetGain).div(10)
            )} Fire/sec and ${format(
              player.f.points.div(100).times(layers.f.essenceMult())
            )} Fire Essence/sec <br>`
          : ""
      }
      ${
        isNerdMode()
          ? `<br>${text}<br>${text2}`
          : ""
      }`;
    let tabFormat = [
      ["display-text", mainDisplay],
      "blank",
      ["prestige-button", "Combine your elements into "],
      "milestones",
      "blank",
      "buyables",
      "blank",
      "upgrades"
    ];
    if (hasMilestone("f", 0)) {
      tabFormat.splice(2, 1);
    }
    return tabFormat;
  },
  timeLeft(x) { 
    if (player.f.spellTimes[11].gt(0)) return `${player.f.spellTimes[11].toFixed(2)} seconds left`
    else if (player.f.spellTimes[11].gt(-20) && hasUpgrade("f",22)) return `${player.f.spellTimes[11].add(20).toFixed(2)} seconds of the dying flame left`
    else return ""
  },
  kungFuEssence() {
    if (hasUpgrade("f", 25)) return `</b> and Fire Essence gain by <b>x${format(upgradeEffect("f", 25))}`
    return ""
  },
  update(diff) {
    if (hasMilestone("f", 0))
      addPoints("f", new Decimal(diff).times(tmp.f.resetGain).div(10))
    if (hasUpgrade("f", 11)) {
      player.f.essence = player.f.essence.add(
        player.f.points.div(100).times(diff).times(layers.f.essenceMult())
      );
    }
    if (player.f.spellTimes[11].gt(-20)) player.f.spellTimes[11] = player.f.spellTimes[11].sub(diff).max(-20); 
  },
  upgrades: {
    rows: 3,
    cols: 5,
    11: {
      title: "Fire Bending",
      description:
        "Start generating fire essence and increase the element gain base by one.",
      cost: new Decimal("1")
    },
    12: {
      title: "Campfire",
      description:
        "Boost Fire gain by x2",
      cost: new Decimal("5")
    },
    13: {
      title: "Elemented Boost??",
      description: () => isNerdMode()
        ? "Multiply Point Gain by log10(fire essence + 1) + 1"
        : "Boost Point Gain based on Fire Essence",
      cost: new Decimal("25"),
      effect: () => player.f.essence.add(1).log10().add(1),
      effectDisplay() { if (!isNerdMode()) return `x${format(this.effect())}` }
    },
    14: {
      title: "Rage Essenced",
      description:
        "Boost Fire Essence gain by x1.5",
      cost: new Decimal("100")
    },
    15: {
      title: "Kung Fu?",
      description: "Unlock the fire ability spell",
      cost: new Decimal("250"),
      currencyDisplayName: "Fire Essence",
      currencyInternalName: "essence",
      currencyLayer: "f"
    },
    21: {
      title: "Getting Stronger",
      description() {
        let s = new Decimal(10)
        if (hasUpgrade("f", 23)) s = s.add(upgradeEffect("f", 23))
        s = formatWhole(s)
        return (isNerdMode() ? `Boost Kung Fu by x1.2^max(uses,${s})+.05*(min(uses,${s})-${s})` : "Boost kung fu based on how many times used")
      },
      cost() {return new Decimal(1500)},
      effect() {
        let s = new Decimal(10)
        if (hasUpgrade("f", 23)) s = s.add(upgradeEffect("f", 23))
        return new Decimal(1.2).pow(player.f.spellUses[11].clampMax(s)).plus(player.f.spellUses[11].clampMin(s).sub(s).times(.05))
      },
      effectDisplay() { if (!isNerdMode()) return `x${format(this.effect())}` },
      unlocked() { return hasUpgrade("f", 15) }
    },
    22: {
      title: "Dying Flame",
      description: "Kung Fu effect is applied at half effectiveness for up to 20 seconds after ending.",
      cost() {return new Decimal(2500)},
      unlocked() { return hasUpgrade("f", 15) }
    },
    23: {
      title: "Burning Brightly",
      description() {
        return isNerdMode() ? "Getting Stronger softcap is pushed back by sqrt(uses) uses" : "Kung Fu uses push back Getting Stronger softcap"
      },
      cost() {return new Decimal(3000)},
      effect() { return player.f.spellUses[11].sqrt().floor() },
      effectDisplay() { if (!isNerdMode()) return `${formatWhole(this.effect())} uses` },
      unlocked() { return hasUpgrade("f", 15) }
    },
    24: {
      title: "Flame Fists",
      description() {
        return isNerdMode() ? "Kung Fu effect is multiplied by log10(fire essence + 1) / 10 + 1" : "Fire Essence makes Kung Fu stronger"
      },
      cost() {return new Decimal(6000)},
      effect() { return player.f.essence.add(1).log10().div(10).add(1) },
      effectDisplay() { if (!isNerdMode()) return `x${format(this.effect())}` },
      unlocked() { return hasUpgrade("f", 15) }
    },
    25: {
      title: "Martial Arts",
      description() {
        return isNerdMode() ? "Kung Fu also affects Fire Essence gain by the square root of its normal effect" : "Kung Fu also slightly affects Fire Essence gain"
      },
      cost() {return new Decimal(12000)},
      unlocked() { return hasUpgrade("f", 15) },
      effect() { return buyableEffect("f", 11).sqrt() }
    },
    31: {
      title: "Fire Mastery",
      description: "Become a master of the arts of Fire",
      cost() {return new Decimal(25000)},
      unlocked() {
        if (hasUpgrade("f", 31)) return true
        for (let upgrade of [11, 12, 13, 14, 15, 21, 22, 23, 24, 25])
          if (!hasUpgrade("f", upgrade))
            return false
        return true
      },
      onPurchase() {
        layerDataReset("f")
        player.points = new Decimal(10)
        player.f.upgrades = [31]
        player.canChoose = true
        showTab("none")
      }
    }
  },
  buyables: {
    rows: 1,
    cols: 1,
    11: {
      title: "Northern Kung Fu",
      cost() {return new Decimal(250)},
      canAfford() {
        if (player.f.essence.gte(this.cost()) && player.f.spellTimes[11].lte(0)) return true
        else return false
      },
      unlocked() { return hasUpgrade("f", 15) },
      display() {return `Use the Selfishness and Rage inside of you to mutliply your own Fire gain by <b>x${buyableEffect("f",11).toFixed(2)}${layers.f.kungFuEssence()} for 10 seconds<b>
<br> <h3>Cost: 250 Fire Essence</h3> <br> ${layers.f.timeLeft()}<br>Used ${formatWhole(player.f.spellUses[11])} times`},
      buy() {
        player.f.spellTimes[11] = new Decimal(10)
        player.f.essence = player.f.essence.sub(250)
        player.f.spellUses[11] = player.f.spellUses[11].add(1)
      },
      effect() {
        let effect = new Decimal(3)
        if (hasUpgrade("f", 21)) effect = effect.times(upgradeEffect("f", 21))
        if (hasUpgrade("f", 24)) effect = effect.times(upgradeEffect("f", 24))
        return effect
      }
    }
  }
});
