console.log("app.js loaded");

// Starter code in this file is based on Dom's office hours demo for hw 15
function InitDashboard() {
    
    console.log("InitDashboard()");

    // Populate the dropdown
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(data => {
        
        console.log(data);
    
        var sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            
            selector.append("option")
            .text(sampleId)
            .property("value", sampleId);
        });
    });
    // Update the bargraph

    // Update the bubblechart

    // Update demographic information
}

InitDashboard();