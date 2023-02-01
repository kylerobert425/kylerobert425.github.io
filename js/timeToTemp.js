//size
const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 560 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

//color scale
const color = d3
  .scaleOrdinal()
  .domain(["2206.001", "2205.001"])
  .range(["#1f78b4", "#7dad6a"]);

//constructor
class TimeToTemp {
  constructor(div, data) {
    //set up dimensions...
    this.data = data;
    this.svg = div
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const domain = [500, 3000]; //may want to extend from 0...

    this.x = d3.scaleLinear().domain(domain).range([0, width]);

    this.y = d3.scaleLinear().domain(domain).range([height, 0]);

    this.setup();
    this.updatePlot(domain);

    //stats for displaying...
  }
  setup() {
    //add axissss
    this.svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(this.x));

    this.svg.append("g").call(d3.axisLeft(this.y));

    //curious if I can add voronoi so you dont have to mouse over each point... probably need to "require" Delaunay somewhere....

    // const voronoi = d3.Delaunay.from(data, (d) => x(d.t2t_1), (d) => y(d.t2t_2) )
    // .voronoi([[margin.left, margin.top, width - margin.right, height - margin.bottom]]);

    //add tooltip div
    d3.select("#t2t").append("div").attr("class", "tooltip");
  }
  updatePlot(domain) {
    //target lines:
    this.svg
      .append("line")
      .attr("x1", this.x(1500))
      .attr("x2", this.x(1500))
      .attr("y1", this.y(domain[0]))
      .attr("y2", this.y(domain[1]))
      .style("stroke", "lightgrey")
      .style("stroke-width", 4)
      .style("opacity", 0.8);
    this.svg
      .append("line")
      .attr("y1", this.y(1500))
      .attr("y2", this.y(1500))
      .attr("x1", this.x(domain[0]))
      .attr("x2", this.x(domain[1]))
      .style("stroke", "lightgrey")
      .style("stroke-width", 4)
      .style("opacity", 0.8);
    //add dots to graph
    this.svg
      .append("g")
      .selectAll("dot")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("class", (d, i) => "point " + d.uuid)
      .attr("cx", (d) => this.x(d.t2t_1))
      .attr("cy", (d) => this.y(d.t2t_2))
      .attr("r", 6)
      .style("fill", (d) => color(d.config))
      .style("opacity", 0.7)
      .on("mouseover", addToolTip)
      .on("mouseleave", removeToolTip);
  }
}
function removeToolTip() {
  d3.select("#t2t .tooltip").transition().duration(500).style("opacity", 0);
  //remove highlight dot
  d3.select(this)
    .style("stroke", (d) => color(d.config))
    .style("stroke-width", 0.8);
  d3.select("#comment").transition().duration(500).style("opacity", 0);
  d3.select("#codeUsed").transition().duration(500).style("opacity", 0);
}

function addToolTip(d) {
  let size = "";
  size = d.config === "2206.001" ? "Small" : "Large";
  let errorString1 = d.com_1a ? "Comments During Seasoning: " + d.com_1a : "";
  let errorString2 = d.com_1b ? "Comments during Test 1: " + d.com_1b : "";
  let errorString3 = d.com_2 ? "Comments during Test 2: " + d.com_2 : "";

  let errorComment = "";
  // errorComment = d.seas_err_bool ? errorString1 + "<br/>" : "";
  // errorComment += d.err_1b_bool ? errorString2 + "<br/>" : "";
  // errorComment += d.err_2_bool ? errorString3 + "<br/>" : "";

  errorComment = d.com_1a ? errorString1 + "<br/>" : "";
  errorComment += d.com_1b ? errorString2 + "<br/>" : "";
  errorComment += d.com_2 ? errorString3 + "<br/>" : "";

  d3.select("#t2t .tooltip").transition().duration(200).style("opacity", 0.9);
  d3.select("#t2t .tooltip")
    .html(
      "Grill size - " +
        size +
        "<br/>" +
        "Factory Time to temp: " +
        Math.round(d.t2t_1 / 60) +
        "<br/>" +
        // "Factory Config: " + d.config + "<br/>" +
        "OTA Time to Temp: " +
        Math.round(d.t2t_2 / 60)
    )
    // "OTA Config: " + d.config_2)
    .style("left", `${d3.event.pageX + 15}px`)
    .style("top", `${d3.event.pageY - 10}px`);
  //add highlight dot
  d3.select(this)
    .style("stroke", (d) => color(d.config))
    .style("stroke-width", 4);
  d3.select("#comment").transition().duration(200).style("opacity", 0.9);

  d3.select("#comment").html(errorComment);
  d3.select("#codeUsed").transition().duration(200).style("opacity", 0.9);
  d3.select("#codeUsed").html(
    // console.log()
    "Factory Code, Gooey: " + 
      `<span class = g${d.g_fw.split('.').join("")}>${d.g_fw}` + 
      "</span>" +
      " Kirby: " +
      `<span class = k${d.k_fw.split('.').join("")}>${d.k_fw}` + 
      "</span>" +
      " Config: " +
      `<span class = c${d.config.split('.').join("")}>${d.config}` + 
      "</span>" +
      "<br/>" +
      "Factory Code, Gooey: " +
      `<span class = g${d.g_fw_2.split('.').join("")}>${d.g_fw_2}` + 
      "</span>" +
      " Kirby: " +
      `<span class = k${d.k_fw_2.split('.').join("")}>${d.k_fw_2}` + 
      "</span>" +
      " Config: " +
      `<span class = c${d.config_2.split('.').join("")}>${d.config_2}` + 
      "</span>"
  );
}
