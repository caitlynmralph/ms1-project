var padding = 10;

var svgSeven = d3.select("#seven"),
    marginSeven = {top: 150, right: 20, bottom: 50, left: 200},
    widthSeven = +svg.attr("width") - marginSeven.left - marginSeven.right,
    heightSeven = +svg.attr("height") - marginSeven.top - marginSeven.bottom;

d3.csv("data/7-rankings.csv")
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

        var offset = marginSeven.top

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
            svgEight.append("g")
                .attr("transform","translate(" + marginSeven.left + "," + offset +")")
                .append("svg:path")
                .attr("d",line(ranks))
                .attr("class","spark-path")
            svgEight.append("text")
                .attr("class","label-text")
                .attr("transform","translate(" + (marginSeven.left + 50) + "," + (offset+7) +")")
                .text(data[0].artist)
            offset+=50
        })
        
    })
    .catch((error) => {
    		throw error;
    });