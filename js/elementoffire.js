
addLayer("eof", {
  name: "Fire", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  color: "#d24141",
  row: 0, // Row the layer is in on the tree (0 is the first row)
  layerShown(){return (player.chosen.includes("fire")||player.canChoose)},
  /*startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }}, */
  tooltip() {return "Element Of Fire"},
  startData() {return {unlocked: true}},
  /*requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "Water", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {return player.points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      return mult
  },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    }, */
  infoboxes: {
      lore: {
          title: "Fire",
          body() { return hasUpgrade("f", 31) ? "I've mastered the arts of Fire." : `You would like to learn the arts of Fire Bending? You want to master Fire Bending and become the best Avatar you can? Well get started then! <br/>
           <br/>
           Fire burns brightly and encourages active play.
           <br/>
           <br/>
           Fires ability will multiply itself by x1.75 and almost never multiplying others... Almost`
        }
      }
  },
  tabFormat: [["infobox", "lore"], "clickables", ["tree", ["f"]]],
  clickables: {
    rows: 1,
    cols: 1,
    11: {
      unlocked() {return (!(player.chosen.includes("fire")) && player.canChoose)},
      title: "Choose the Element Of Fire",
      display() {return "Fire, is a selfish creature... fire increases its own gain while almost never powering up other elements... <i>almost</i>"},
      style: {
        "height": "200px",
        "width": "200px",
        "border-radius": "25%",
        "border": "2px solid",
        "border-color": "rgba(0, 0, 0, 0.125)",
        "font-size": "12px"
      },
      canClick() {return true},
      onClick() {
        if (confirm("Are you sure you want to start with Fire?")) {
          player.chosen.push("fire")
          player.canChoose = false
        }
      }
    }
  }
})
