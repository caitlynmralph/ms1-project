var svg = d3.select("#chart-1"),
    margin = {top: 75, right: 50, bottom: 100, left: 180},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/all-artist-counts.csv")
  	.then((data) => {
        return data.map((d) => {
          d.artists = +d.artists;

          return d;  
        });
		})
  	.then((data) => {
        x.domain(data.map(function(d) { return d.count; }));
        y.domain([0, d3.max(data, function(d) { return d.artists; })]);

        g.append("g")
          .attr("class","axis-text")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .call(g => g.select(".domain").remove())
            .append("text")
                .attr("x",175)
                .attr("y",45)
                .attr("class","axis-text")
                .style("fill","black")
                .text("Times Played")

        g.append("g")
            .attr("class","axis-text")
            .call(d3.axisLeft(y).ticks(10))
            .call(g => g.select(".domain").remove())
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y",-50)
            .attr("x",-150)
            // .attr("text-anchor", "end")
            .attr("class","axis-text")
            .style("fill","black")
            .text("Number of Artists");

        g.selectAll(".bar")
          .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.count); })
            .attr("y", function(d) { return y(d.artists); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.artists); })
    })
    .catch((error) => {
    		throw error;
    });