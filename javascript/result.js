function setup() {
    justification = document.getElementById("justification");
    responses = sessionStorage.getItem("answers").toString().split(",");
    justification.innerHTML = "Based on your selection of " + responses[0] + ", " + responses[1] + ", and " + responses[2] + ", we really think you shouldn't have needed help to make such an easy decision."

    userInput = sessionStorage.getItem("userInput");
    chartString = "";
    if (userInput == 'iphone xs') {
        chartString = "iPhone Xs Users";
    } else {
        chartString = "Pocky Eaters"
    }

    pie_chart = {
          'data': [{
            'labels': [responses[0], responses[2], responses[1], responses[3]],
            'values': [30, 5, 20, 45],
            'type': 'pie',
            'sort': false,
          }],
        
          'layout': {
            paper_bgcolor: "rgba(50,50,50,0)",
            title: 'Responses Happiest ' + chartString + ' Chose',
            font: {
                color: "#ffffff",
            }
          }
        
        }
    Plotly.newPlot('graph', pie_chart.data, pie_chart.layout)
}

window.onload = setup;