let modInfo = {
	name: "The Elementree",
	id: "mymod",
	author: "unpingabot#0245, Five Hargreeves;#9676 & thepaperpilot#1210",
	pointsName: "Elements",
	discordName: "",
	discordLink: "",
	changelogLink: "https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.01",
	name: "Literally nothing",
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	if (hasUpgrade("f",11)) return true
  else return false
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
  if (hasUpgrade("f", 13)) gain = gain.mul(upgradeEffect("f", 13))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
  chosen: [],
  hqTree: true,
  canChoose: true,
  nerdMode:false
}}

// Display extra things at the top of the page
var displayThings = [
  function() {if (isNerdMode()) {return "Nerd Mode Active"}}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600000) // Default is 1 hour which is just arbitrarily large
}

var controlDown = false
var shiftDown = false

window.addEventListener('keydown', function(event) {
	if (event.keyCode == 16) shiftDown = true;
	if (event.keyCode == 17) controlDown = true;
}, false);

window.addEventListener('keyup', function(event) {
	if (event.keyCode == 16) shiftDown = false;
	if (event.keyCode == 17) controlDown = false;
}, false);

function isNerdMode() {
  return shiftDown || player.nerdMode
}
