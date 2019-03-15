function setup() {
    justification = document.getElementById("justification");
    itemDescription = document.getElementById("item-description");
    questionPath = sessionStorage.getItem("userInput")
    responses = sessionStorage.getItem("answers").toString().split(",");

    // Good / bad qualities displayed in text
    goodDisplayQualities = ["OS", "CPU", "Camera", "Social Media", "Messaging", "Flavor", "Portability", "Color", "Cut", "Looking like a boss", "Lakefill walks", "I Hate It", "Once a Week", "4-5", "6+"];
    badDisplayQualities = ["Size", "Video Streaming", "Nutrition", "Allergies", "Sleeping", "Slothing around", "1-2", "Once A Month", "I Barely Have To", "I Live For It", "I Look Forward to It"];

    // Good / bad qualities that count towards the chart but not displayed in text
    otherGoodQualities = ["iPhone X", "Good", "Indifferent", "This week", "This month", "Price", "1-5", "5-20"];
    otherBadQualities = ["Galaxy S9", "Pixel 3/XL", "Bad", "This year", "Never", "Brand"];

    graphTitle = "";
    graphPositiveLabel = "";
    graphNegativeLabel = "";

    if (questionPath == "iphone xs") {
        itemDescription.innerHTML = "Surveyed iPhone XS users care the most about having iOS and a good camera. They spend most of their time using social media and messaging.";
        graphTitle = "How the iPhone XS Satisfies ";
        graphPositiveLabel = "Satisfied by iPhone XS";
        graphNegativeLabel = "Unsatisfied by iPhone XS";
    }
    else if (questionPath == "pocky") {
        itemDescription.innerHTML = "Surveyed pocky eaters care the most for flavor and portability. They like snacks that are cheap, easy to eat, and they can eat often.";
        graphTitle = "How Pocky Satisfies ";
        graphPositiveLabel = "Satisfied by Pocky";
        graphNegativeLabel = "Unsatisfied by Pocky";
    }
    else if (questionPath == "jeans") {
        itemDescription.innerHTML = "Surveyed jeans owners care the most about color and cut.";
        graphTitle = "How Jeans Satisfy ";
        graphPositiveLabel = "Satisfied with Jeans";
        graphNegativeLabel = "Unsatisfied with Jeans";
    }
    else if (questionPath == "lawn mowing service") {
        itemDescription.innerHTML = "People who use lawn services have large yards that take a long time to mow.";
        graphTitle = "How a Lawn Service Satisfies ";
        graphPositiveLabel = "Satisfied with Service";
        graphNegativeLabel = "Unsatisfied with Service";
    }

    goodQualityCount = 0;
    badQualityCount = 0;

    yourGoodSelections = [];
    yourBadSelections = [];

    graphGoodSelections = [];
    graphBadSelections = [];

    // Sort the responses and count where each belongs
    for (response of responses) {
        if (goodDisplayQualities.includes(response)) {
            yourGoodSelections.push(response);
            graphGoodSelections.push(response);
            goodQualityCount += 1;
        }
        else if (otherGoodQualities.includes(response)) {
            goodQualityCount += 1;
            graphGoodSelections.push(response);
        }
        else if (badDisplayQualities.includes(response)) {
            yourBadSelections.push(response);
            graphBadSelections.push(response);
            badQualityCount += 1;
        }
        else if (otherBadQualities.includes(response)) {
            graphBadSelections.push(response);
            badQualityCount += 1;
        }
    }

    // Get the selections that help justify the choice into an array.
    goodString = arrayToString(yourGoodSelections);
    badString = arrayToString(yourBadSelections);

    if (goodQualityCount > badQualityCount) {
        document.getElementById("result").innerHTML = "Treat Yourself!";
    } else {
        document.getElementById("result").innerHTML = "Skip It!"
    }

    // Add Descriptor to Graph Title
    if (goodQualityCount == 0) {
        graphTitle += "None";
    }
    else if (badQualityCount == 0) {
        graphTitle += "All";
    }
    else if (goodQualityCount > badQualityCount) {
        graphTitle += "Most";
    }
    else {
        graphTitle += "Some";
    }

    graphTitle += " of Your Preferences";

    // Show the justification
    if (yourGoodSelections.length != 0 && yourBadSelections.length != 0) {
        justification.innerHTML = "Your selection of " + goodString + " as well as others would help us to recommend this. But your enjoyment may not be perfect based on your selection of " + badString + "."
    }
    else if (yourGoodSelections.length == 0 || (goodQualityCount <= badQualityCount)) {
        if (badString == "") {
          justification.innerHTML = "We are worried about your enjoyment based on your selections."
        } else {
          justification.innerHTML = "We are worried about your enjoyment based on your selection of " + badString + "."
        }
    }
    else if (yourBadSelections.length == 0) {
        if (badString == "") {
          justification.innerHTML = "We believe you will find enjoyment based on your selections."
        } else {
          justification.innerHTML = "We believe you will find enjoyment based on your selection of " + goodString + "."
        }
    }

    pie_chart = {
          'data': [{
            'labels': [graphPositiveLabel, graphNegativeLabel],
            'values': [goodQualityCount, badQualityCount],
            'marker': {
                'colors': ['rgb(58, 79, 122)', 'rgb(194, 210, 249)']
            },
            'type': 'pie',
            'sort': false,
          }],

          'layout': {
            paper_bgcolor: "rgba(50,50,50,0)",
            title: graphTitle,
            font: {
                color: "#ffffff",
            },
            annotations: [
                {
                    showarrow: false,
                    text: "Unsatisfied:<br>" + graphBadSelections.toString().split(",").join("<br>"),
                    x: -0.3,
                    y: 1,
                },
                {
                    showarrow: false,
                    text: "Satisfied:<br>" + graphGoodSelections.toString().split(",").join("<br>"),
                    x: 1.5,
                    y: 0.5,
                },
            ],
          }
        }
    Plotly.newPlot('graph', pie_chart.data, pie_chart.layout)
}

// Converts array to string
function arrayToString(array) {
    string = "";
    if (array.length > 2) {
        for (var i = 0; i < array.length - 1; i++) {
            string += array[i] + ", "
        }
        string += "and " + array[array.length - 1];
    }
    else if (array.length == 2) {
        string = array[0] + " and " + array[1];
    }
    else if (array.length == 1) {
        string = array[0];
    }

    return string;
}

window.onload = setup;
