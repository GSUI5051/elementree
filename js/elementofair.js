var layoutInfo = {
    startTab: "none",
	showTree: true,

    treeLayout: ["i"]

    
}

addLayer("eoa", {
  name: "Air", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  color: "#ebf9ff",
  row: 0, // Row the layer is in on the tree (0 is the first row)
  layerShown(){return true},
  /*startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }}, */
  tooltip() {return "Element Of Air"},
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
      title: "Choose the Element Of Air",
      display() {return "Air, the fast speedy creator of wind, slightly speeds up all time based production"},
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
