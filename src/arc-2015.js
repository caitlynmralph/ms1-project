var padding = 10;

var svg2015 = d3.select("#new"),
    margin2015 = {top: 150, right: 10, bottom: 10, left: 500},
    width2015 = +svg.attr("width") - margin2015.left - margin2015.right,
    height2015 = +svg.attr("height") - margin2015.top - margin2015.bottom;

d3.csv("data/2015.csv")
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

        var offset = margin2015.top

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
                .attr("transform","translate(" + margin2015.left + "," + offset +")")
                .append("svg:path")
                .attr("d",line(ranks))
                .attr("class","spark-path")
            svg2005.append("text")
                .attr("class","label-text")
                .attr("transform","translate(" + (margin2015.left + 50) + "," + (offset+7) +")")
                .text(data[0].artist)
            offset+=50
        })
        
    })
    .catch((error) => {
    		throw error;
    });