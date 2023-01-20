function textBox () {
    const headBlurb = `This webpage details the Whitebox testing`;
    const textBlurb = ` 
        performed on 45 Beta Model 2 Yosemite grills.  This goal of this testing was to determine the number of instances of 7 issues identified by customer service based on Model 4 service calls and the ability to fix these issues via an OTA firmware update. 
      `;

     
    const textDiv = d3.select('#header-wrap')
      .append('div');
    textDiv.style('opacity', 0)
      .classed('text-blurb', true)
      .transition()
      .delay(700).style('opacity', 1);
  
    textDiv.append('span').append('text')
      .attr('opacity', 0)
      .text(headBlurb);
    textDiv.append('text').text(textBlurb);
  }
  function issuesBox (div) {
  //What are the 7 issues?
    
  //which issues show up? which dont?


  }