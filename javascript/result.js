function setup() {
    justification = document.getElementById("justification");
    itemDescription = document.getElementById("item-description");
    questionPath = sessionStorage.getItem("userInput")
    responses = sessionStorage.getItem("answers").toString().split(",");

    // Good / bad qualities displayed in text
    goodDisplayQualities = ["OS", "CPU", "Camera", "Social Media", "Messaging", "Flavor", "Portability", "Color", "Cut", "Looking like a boss", "Lakefill walks"];
    badDisplayQualities = ["Size", "Video Streaming", "Nutrition", "Allergies", "Sleeping", "Slothing around"];

    // Good / bad qualities that count towards the chart but not displayed in text
    otherGoodQualities = ["iPhone X", "Good", "Indifferent", "This week", "This month", "Price", "1-5", "5-20"];
    otherBadQualities = ["Galaxy S9", "Pixel 3/XL", "Bad", "This year", "Never", "Brand"];


    if (questionPath == "iphone xs") {
        itemDescription.innerHTML = "Surveyed iPhone XS users care the most about having iOS and a good camera. They spend most of their time using social media and messaging."
    }
    else if (questionPath == "pocky") {
        itemDescription.innerHTML = "Surveyed pocky eaters care the most for flavor and portability. They like snacks that are cheap, easy to eat, and they can eat often."
    }
    else if (questionPath == "jeans") {
        itemDescription.innerHTML = "Surveyed jeans owners care the most about color and cut.";
    }

    goodQualityCount = 0;
    badQualityCount = 0;

    yourGoodSelections = [];
    yourBadSelections = [];

    // Sort the responses and count where each belongs
    for (response of responses) {
        if (goodDisplayQualities.includes(response)) {
            yourGoodSelections.push(response);
            goodQualityCount += 1;
        }
        else if (otherGoodQualities.includes(response)) {
            goodQualityCount += 1;
        }
        else if (badDisplayQualities.includes(response)) {
            yourBadSelections.push(response);
            badQualityCount += 1;
        }
        else if (otherBadQualities.includes(response)) {
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

    // Show the justification
    if (yourGoodSelections.length != 0 && yourBadSelections.length != 0) {
        justification.innerHTML = "Your selection of " + goodString + " as well as others would help us to recommend this product. But your enjoyment may not be perfect based on your selection of " + badString + "."
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
            'labels': ["Qualities It Has", "Qualities It Doesn't Have"],
            'values': [goodQualityCount, badQualityCount],
            'marker': {
                'colors': ['rgb(58, 79, 122)', 'rgb(194, 210, 249)']
            },
            'type': 'pie',
            'sort': false,
          }],

          'layout': {
            paper_bgcolor: "rgba(50,50,50,0)",
            title: 'Qualities You Chose',
            font: {
                color: "#ffffff",
            }
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

    console.log(string);
    console.log(array);

    return string;
}

window.onload = setup;
