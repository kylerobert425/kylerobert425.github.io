//load data
allData = d3.json("./data/data.json").then((data) => {
  //load elements...

  //adding divs for elements...
  let wrapperDiv = d3.select("body").append("div").attr("id", "wrapper");

  // function from storytelling.js
  textBox();
  
  let errorDiv = wrapperDiv.append("div").attr("id", "error");
  let errorComments = errorDiv.append("div").append("text").attr("id", "errorComs");
  let t2tDiv = wrapperDiv.append("div").attr("id", "t2t");
  let codeDiv = wrapperDiv.append("div").append("text").attr("id", "codeUsed");
  let gooeyDiv = wrapperDiv.append("div").attr("id", "gooey");
  
  
  let commentDiv = wrapperDiv.append("div").append("text").attr("id", "comment");

  //add vis elements to divs
  let t2tChart = new TimeToTemp(t2tDiv, data);
  console.log(data);
  let errors = new ErrorChart(errorDiv, data);
  //adding the other error charts, i'm sure this is awful practice but I'm just trying to get this done...
  let errors2 = new ErrorChart2(errorDiv, data);
  let errors3 = new ErrorChart3(error, data);
});
