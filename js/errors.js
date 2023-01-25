//size - thinking two donut graphs with errors and tooltip in center
const d_margin = 40,
  d_width = 350,
  d_height = 350;

class ErrorChart {
  constructor(div, data) {
    this.data = data;
    this.svg = d3.select("#error")
      .append("svg")
      .attr("width", d_width)
      .attr("height", d_height)
      .append("g")
      .attr("transform", "translate(" + d_width / 2 + "," + d_height / 2 + ")");

    let radius = Math.min(d_width, d_height) / 2 - d_margin;

    //group data by errors, what if I just do T/F?
    let colorTF = d3
      .scaleOrdinal()
      .domain([true, false])
      .range(["#ef8a62", "#67a9cf"]);

    //want to check count of errors so this can be formatted easier
    let trues = this.data.filter((d) => d.err_1b_bool == true);
    trues = Object.keys(trues).length; //just want length...

    let falses = this.data.filter((d) => d.err_1b_bool == false);
    falses = Object.keys(falses).length;

    let test_data = { t: trues, f: falses };

    let pie = d3.pie().value((d) => d.value);

    let data_ready = pie(d3.entries(test_data));

    d3.select("#error").append("div").attr("id", "tooltipD1")

    //build chart
    this.svg
      .selectAll("whatever")
      .data(data_ready)
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(85) // This is the size of the donut hole
          .outerRadius(radius)
      )
      .attr("fill", function (d) {
        return colorTF(d.data.key);
      })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .on("mouseover", onMouseEnter)
      .on("mouseleave", onMouseLeave);
  }
}
function onMouseEnter(d) {
  d3.select("#tooltipD1")
  .transition()
  .duration(200)
  .style("opacity", 0.9);
d3.select("#tooltipD1")
  .html("Count of " + d.data.key + " values is: " + d.value)
  .style("left", `${d3.event.pageX + 15}px`)
  .style("top", `${d3.event.pageY - 10}px`);
}

function onMouseLeave() {
  d3.select("#tooltipD1")
  .transition()
  .duration(500)
  .style("opacity", 0);
}
