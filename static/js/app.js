// Starter code in this file is based on Dom's office hours demo for hw 15

console.log("app.js loaded");

// Define functions for creating the graphs

// Function to draw the Bargraph
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    d3.json("data/samples.json").then(data => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        var barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot("bar", barArray, barLayout);

    })
}

function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

    // Read in the data from samples.json
    d3.json("data/samples.json").then(data => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        // Create the trace for the bubble chart
        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                opacity: 1
            },
            text: otu_labels
        }

        var bubbleArray = [bubbleData];

        var bubbleLayout = {
            xaxis: {title: "OTU IDs"},
            yaxis: {title: "Sample Values"}
        }

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    })
}

function DisplayMetadata(sampleId) {
    console.log(`DisplayMetadata(${sampleId})`);

}

function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    // Update the visuals
    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    DisplayMetadata(newSampleId);
}


function InitDashboard() {
    
    console.log("InitDashboard()");

    // Populate the dropdown
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(data => {
            
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


}

InitDashboard();