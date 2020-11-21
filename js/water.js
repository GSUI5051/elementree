addLayer("w", {
    name: "water", // This is optional, only used in a few places, If absent it just uses the layer id.
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#4BDC13",
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})
