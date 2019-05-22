var padding = 10;

var svgDownward = d3.select("#downward"),
    marginDownward = {top: 250, right: 20, bottom: 0, left: 840},
    widthDownward = +svg.attr("width") - marginDownward.left - marginDownward.right,
    heightDownward = +svg.attr("height") - marginDownward.top - marginDownward.bottom;

d3.csv("data/downward.csv")
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

        var offset = marginDownward.top

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
            svgSteady.append("g")
                .attr("transform","translate(" + marginDownward.left + "," + offset +")")
                .append("svg:path")
                .attr("d",line(ranks))
                .attr("class","spark-path")
            svgSteady.append("text")
                .attr("class","label-text-patterns")
                .attr("transform","translate(" + (marginDownward.left + 50) + "," + (offset+7) +")")
                .text(data[0].artist)
            offset+=50
        })
        
    })
    .catch((error) => {
    		throw error;
    });