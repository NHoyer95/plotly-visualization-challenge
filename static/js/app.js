console.log("app.js loaded");

// Code in this file is based on Dom's office hours demo for hw 15
function InitDashboard() {
    
    console.log("InitDashboard()");

    // Populate the dropdown
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(function(data) {
        
        console.log(data);
    
    });
    // Update the bargraph

    // Update the bubblechart

    // Update demographic information
}

InitDashboard();