var layoutInfo = {
    startTab: "none",
	showTree: true,

    treeLayout: ["i"]

    
}

addLayer("eof", {
  name: "Fire", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  color: "#ed2424",
  row: 0, // Row the layer is in on the tree (0 is the first row)
  layerShown(){return true},
  /*startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }}, */
  tooltip() {return "Element Of Fire"},
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
  tabFormat: ["clickables"],
  clickables: {
    rows: 1,
    cols: 1,
    11: {
      unlocked() {return true},
      title: "Choose the Element Of Fire",
      display() {return "Fire, is a selfish creature... fire increases its own gain while almost never powering up other elements... <i>almost</i>"},
      style: {
        "height": "200px",
        "width": "200px",
        "border-radius": "25%",
        "border": "2px solid",
        "border-color": "rgba(0, 0, 0, 0.125)",
        "font-size": "10px"
      },
      canClick() {return true}
    }
  }
})
