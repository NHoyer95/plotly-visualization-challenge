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

// Function to draw the Bubblechart
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

// Function to populate the Demographic Infobox
function DisplayMetadata(sampleId) {
    console.log(`DisplayMetadata(${sampleId})`);

    // Clear demographic info 
    document.getElementById("sample-metadata").innerHTML = "";

    d3.json("data/samples.json").then(data => {

        var metaData = data.metadata;
        var resultArray = metaData.filter(s => s.id == sampleId);
        var result = resultArray[0];

        // Assigning the information to extract from the dataset
        var id = result.id;
        var ethnicity = result.ethnicity;
        var gender = result.gender;
        var age = result.age;
        var location = result.location;
        var bbtype = result.bbtype;
        var wfreq = result.wfreq;
        var info = [id,ethnicity,gender,age,location,bbtype,wfreq];

        // Append new data to a list within the demographic box
        var ul = d3.select("#sample-metadata").append("ul");
        ul.append("li").text(`id: ${id}`);
        ul.append("li").text(`ethnicity: ${ethnicity}`);
        ul.append("li").text(`gender: ${gender}`);
        ul.append("li").text(`age: ${age}`);
        ul.append("li").text(`location: ${location}`);
        ul.append("li").text(`bbtype: ${bbtype}`);
        ul.append("li").text(`wfreq: ${wfreq}`);

    })
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