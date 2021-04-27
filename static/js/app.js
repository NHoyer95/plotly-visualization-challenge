// Starter code in this file is based on Dom's office hours demo for hw 15

console.log("app.js loaded");

function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

}

function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

}

function DisplayMetadata(sampleId) {
    console.log(`DisplayMetadata(${sampleId})`);

}

function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    DisplayMetadata(newSampleId);
}


function InitDashboard() {
    
    console.log("InitDashboard()");

    // Populate the dropdown
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(data => {
        
        // console.log(data);
    
        var sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            
            selector.append("option")
            .text(sampleId)
            .property("value", sampleId);
        });

        var id = sampleNames[0];

        DrawBargraph(id);

        DrawBubblechart(id);

        DisplayMetadata(id);


    });

    // Update the bargraph

    // Update the bubblechart

    // Update demographic information
}

InitDashboard();