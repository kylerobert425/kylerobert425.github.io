function textBox() {
  const headBlurb = `This webpage details the Whitebox testing`;
  const textBlurb = ` 
        performed on 45 Beta Model 2 Yosemite grills.  This goal of this testing was to determine the number of instances of 7 issues identified by customer service based on Model 4 service calls and the ability to fix these issues via an OTA firmware update. 
      `;

  const issueBlurb = "The issues targeted in this testing are the following:";

  const textDiv = d3.select("#header-wrap").append("div");
  textDiv
    .style("opacity", 0)
    .classed("text-blurb", true)
    .transition()
    .delay(700)
    .style("opacity", 1);

  textDiv.append("span").append("text").attr("opacity", 0).text(headBlurb);
  textDiv.append("text").text(textBlurb);
  
  //need another spot for the issues...
  const issueDiv = d3.select("#wrapper").append("div");
  issueDiv.style("opacity", 0)
  .classed("text-blurb", true)
  .transition()
  .delay(700)
  .style("opacity", 1);

  //issueDiv.append("html").html("</br>");
  issueDiv.append("span").append("text").attr("opacity", 0).text(issueBlurb);

  issueDiv.append("html").html(`<ol id="issues_list">
  <li title = "This rarely occured, mainly if Gooey had out of date FW"> Display does not power on</li>
  <li title = "This was common, especially with the 2206.M08 config on smalls">Slow to temp</li>
  <li title = "Similar to number 1, this mainly happened if Gooey FW was out of date" >Frozen screen</li>
  <li title = "This was the MOST COMMON issue to occur on the Factory FW but never occured on the OTA1 FW">Igniter not detected</li>
  <li title = "This issue never occured">Frozen screen at "ready to cook"</li>
  <li title = "This issue never occured">Grill seasoning skipped</li>
  <li title = "This occured on one grill with a faulty sensor">Lid sesnsor error</li>
  <li title = "This issue never occured">Flame sensor error</li>
</ol>`)
}
