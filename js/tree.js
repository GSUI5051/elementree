var layoutInfo = {
    startTab: "none",
	showTree: true,

    treeLayout: [["w","e"]]

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


 addLayer("tree-tab", {
    tabFormat: [["tree", [["blank", "eow", "eoe", "eof", "eoa", "blank"]]]]
})

/*
addLayer("other-tree-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]]
}) */