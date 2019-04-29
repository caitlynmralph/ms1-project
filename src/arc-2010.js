var padding = 10;

var svg2010 = d3.select("#early"),
    margin2010 = {top: 150, right: 10, bottom: 10, left: 250},
    width2010 = +svg.attr("width") - margin2010.left - margin2010.right,
    height2010 = +svg.attr("height") - margin2010.top - margin2010.bottom;

d3.csv("data/2010.csv")
  	.then((data) => {
        return data.map((d) => {
          d.rank = +d.rank;

          return d;  
        });
        })
  	.then((data) => {

        var artists = d3.nest()
          .key(function(d) {return d.artist})
          .entries(data);

		var xEight = d3.scaleLinear().domain([0, 10]).range([0, 50]);
        var yEight = d3.scaleLinear().domain([0, 10]).range([0, 30]);
        
        var line = d3.line()
            .x(function(d,i) {
                return xEight(i)
            })
            .y(function(d) {
                return yEight(d);
            })

        var allRankings = []

        var offset = margin2010.top

        artists.forEach(function(element) {
            console.log(element)
            data = element.values
            console.log(data)
            var ranks = []
            data.forEach(function(e){
                console.log(e.rank)
                ranks.push(e.rank)
            })
            console.log(ranks)
            allRankings.push(ranks)
            svg2005.append("g")
                .attr("transform","translate(" + margin2010.left + "," + offset +")")
                .append("svg:path")
                .attr("d",line(ranks))
                .attr("class","spark-path")
            svg2005.append("text")
                .attr("class","label-text")
                .attr("transform","translate(" + (margin2010.left + 50) + "," + (offset+7) +")")
                .text(data[0].artist)
            offset+=50
        })
        
    })
    .catch((error) => {
    		throw error;
    });