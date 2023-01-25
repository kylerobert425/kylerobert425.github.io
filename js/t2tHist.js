//size (kinda small?)
const margin = { top: 10, right: 10, bottom: 15, left: 30 },
  width = 100 - margin.left - margin.right,
  height = 100 - margin.top - margin.bottom;

class Histogram {
    //https://d3-graph-gallery.com/graph/histogram_basic.html
  constructor(div, data) {
    this.data = data;
    this.svg = div
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //seperate by grill size

    
  }
}
