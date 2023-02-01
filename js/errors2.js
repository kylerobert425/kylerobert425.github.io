//size - thinking two donut graphs with errors and tooltip in center
//size from error1...

class ErrorChart2 {
  constructor(div, data) {
    this.data = data;
    this.svg = d3
      .select("#error")
      .append("svg")
      .attr("width", d_width)
      .attr("height", d_height)
      .append("g")
      .attr("transform", "translate(" + d_width / 2 + "," + d_height / 2 + ")");

    let radius = Math.min(d_width, d_height) / 2 - d_margin;

    //group data by errors
    let groupData = d3.groups(this.data, (d) => d.err_1b_str);
    let errorCounts = groupData.map((i, j) => ({ err: i[0], count: Object.keys(i[1]).length }));
    // //why can't I get Object.entires/keys to work for this...

    let colorTF = d3
      .scaleOrdinal()
      .domain([errorCounts[0].err, errorCounts[5].err, errorCounts[2].err, errorCounts[4].err, errorCounts[3].err, errorCounts[1].err ]) 
      .range(["#4575b4" ,"#d73027" , "#ffffbf", "#fee090", "#fc8d59","#91bfdb" ])


    let pie = d3.pie().value((d) => d.value.count);

    let data_ready = pie(d3.entries(errorCounts));
    // //this seems insane:
    // console.log(data_ready[0].data.value.err);
    d3.select("#error").append("div").attr("class", "tooltip");

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
          .innerRadius(hole) // This is the size of the donut hole
          .outerRadius(radius)
      )
      .attr("fill", function (d) {
        return colorTF(d.data.key);
      })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .on("mousemove", onMouseEnter)
      .on("mouseleave", function(d) {
        let currentErr = d.data.value.err;
        let selectedDots = d3.selectAll('circle').filter(d=> d.err_1b_str === currentErr);
        selectedDots.style("fill", (d) => color(d.config)).style("opacity", 0.7);
        onMouseLeave;
      })
      .on("mouseover", function(d,i){
        let currentErr = d.data.value.err;
        let selectedDots = d3.selectAll('circle').filter(d=> d.err_1b_str === currentErr);
        selectedDots.style("fill", 'orange').attr("r", 7).style("opacity", 0.9);
      });

    this.svg.append("text").attr("text-anchor", "middle").html("Factory Code");
  }
}
function onMouseEnter(d) {
  d3.select("#error .tooltip").transition().duration(200).style("opacity", 0.9);
  d3.select("#error .tooltip")
    .html("Count of " + d.data.value.err + " " + d.value)  //error string syntax seems completely bananas...
    .style("left", `${d3.event.pageX + 15}px`)
    .style("top", `${d3.event.pageY - 10}px`);
}

function onMouseLeave() {
  d3.select("#error .tooltip").transition().duration(500).style("opacity", 0);
}
