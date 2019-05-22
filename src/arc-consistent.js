var padding = 10;

var svgConsistent = d3.select("#consistent"),
    marginConsistent = {top: 250, right: 10, bottom: 0, left: 1095},
    widthConsistent = +svg.attr("width") - marginConsistent.left - marginConsistent.right,
    heightConsistent = +svg.attr("height") - marginConsistent.top - marginConsistent.bottom;

d3.csv("data/consistent.csv")
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

        var offset = marginConsistent.top

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
                .attr("transform","translate(" + marginConsistent.left + "," + offset +")")
                .append("svg:path")
                .attr("d",line(ranks))
                .attr("class","spark-path")
            svgSteady.append("text")
                .attr("class","label-text-patterns")
                .attr("transform","translate(" + (marginConsistent.left + 50) + "," + (offset+7) +")")
                .text(data[0].artist)
            offset+=50
        })
        
    })
    .catch((error) => {
    		throw error;
    });