//load data
allData = d3.json('./data/data.json').then((data) => {
    //load elements...

    // function from storytelling.js
    textBox();
    
    //adding divs for elements...
    let wrapperDiv = d3.select("body").append("div").attr("id", "wrapper");

    //wrapperDiv.append("div").attr("id", "tooltip").style("opacity", 0); //idk why this was in the wrapper in the hw.

    let t2tDiv = wrapperDiv.append("div").attr("id", "t2t");
    let gooeyDiv = wrapperDiv.append("div").attr("id", "gooey");
    let errorDiv = wrapperDiv.append("div").attr("id", "error");
    let commentDiv = wrapperDiv.append("div").attr("id", "comment");

    //add vis elements to divs
    let t2tChart = new TimeToTemp(t2tDiv, data);
    console.log(data);

});

