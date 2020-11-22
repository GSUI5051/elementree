var layoutInfo = {
    startTab: "none",
	showTree: true,

    treeLayout: ["i"]

    
}

addLayer("eoe", {
  name: "Earth", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  color: "#00801a",
  row: 0, // Row the layer is in on the tree (0 is the first row)
  layerShown(){return (player.chosen.includes("earth")||player.canChoose)},
  /*startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }}, */
  startData() {return {unlocked: true}},
  tooltip() {return "Element Of Earth"},
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
          title: "Earth",
          body: `You would like to learn the arts of Earth Bending? You want to master Earth Bending and become the best Avatar you can? Well get started then! <br/>
         <br/>
         Earths ability is to multiply every core element by x1.75 which can be upgraded later hugely!`
      }
  },
  tabFormat: [["infobox", "lore"], "clickables"],
  clickables: {
    rows: 1,
    cols: 1,
    11: {
      unlocked() {return (!(player.chosen.includes("earth"))&& player.canChoose)},
      title: "Choose the Element Of Earth",
      style: {
        "height": "200px",
        "width": "200px",
        "border-radius": "25%",
        "border": "2px solid",
        "border-color": "rgba(0, 0, 0, 0.125)",
        "font-size": "12px"
      },
      display() {return "Earth, the element of nature, increases the gain of everything except its own, most of the time"},
      canClick() {return true},
      onClick() {
        if (confirm("Are you sure you want to start with Earth?")) {
          player.chosen.push("earth")
          player.canChoose = false
        }
      }
    }
  }
})
