var layoutInfo = {
    startTab: "none",
	showTree: true,

    treeLayout: [
      ["w", "e","f","a"],
    ]

    
}


// A "ghost" layer which offsets other layers in the tree
/*addNode("blank", {
    layerShown: "ghost",
}, 
) */


addLayer("tree-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]]
})
/* 
addLayer("other-tree-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]]
}) */