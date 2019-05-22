var padding = 10;

var svgQuick = d3.select("#quick"),
    marginQuick = {top: 250, right: 20, bottom: 0, left: 350},
    widthQuick = +svg.attr("width") - marginQuick.left - marginQuick.right,
    heightQuick = +svg.attr("height") - marginQuick.top - marginQuick.bottom;

d3.csv("data/quick.csv")
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

        var offset = marginQuick.top

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
                .attr("transform","translate(" + marginQuick.left + "," + offset +")")
                .append("svg:path")
                .attr("d",line(ranks))
                .attr("class","spark-path")
            svgSteady.append("text")
                .attr("class","label-text-patterns")
                .attr("transform","translate(" + (marginQuick.left + 50) + "," + (offset+7) +")")
                .text(data[0].artist)
            offset+=50
        })
        
    })
    .catch((error) => {
    		throw error;
    });