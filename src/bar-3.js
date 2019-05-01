var svg3 = d3.select("svg"),
    margin3 = {top: 50, right: 10, bottom: 50, left: 100},
    width3 = 400 - margin3.left - margin3.right,
    height3 = 300 - margin3.top - margin3.bottom;

var x3 = d3.scaleBand().rangeRound([0, width3]).padding(0.1),
    y3 = d3.scaleLinear().rangeRound([height3, 0]);

// var g = svg.append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/3-artist-counts-by-year.csv")
  	.then((data) => {
        return data.map((d) => {
          d.artists = +d.artists;

          return d;  
        });
        })
  	.then((data) => {

        var years = d3.nest()
          .key(function(d) {return d.year})
          .entries(data);

        x3.domain(data.map(function(d) { return d.count; }));
        y3.domain([0, d3.max(years, function(s) { return s.values[0].artists; })]);

        var svgs = d3.select("#chart-3").selectAll("svg")
            .data(years)
            .enter()
            .append("svg:svg")
            .attr("width",width3 + margin3.left + margin3.right)
            .attr("height", height3 + margin3.top + margin3.bottom)
            .append("g")
            .attr("transform","translate(" + margin3.left + "," + margin3.top + ")");

        svgs.append("g")
            .attr("class","axis-text")
            .attr("transform", "translate(0," + height3 + ")")
            .call(d3.axisBottom(x3))
            .call(g => g.select(".domain").remove())

        // svgs.append("g")
        //     .append("text")
        //         .attr("x",100)
        //         .attr("y",240)
        //         .attr("class","axis-text")
        //         .style("fill","black")
        //         .text("Times Played")

        svgs.append("g")
            .append("text")
                .attr("x","100")
                .attr("y","10")
                .attr("class","axis-text")
                .style("fill","black")
                .text(function(d) {return d.key})

        svgs.append("g")
            .attr("class","axis-text")
            .call(d3.axisLeft(y3).ticks(3))
            .call(g => g.select(".domain").remove())
          // .append("text")
          //   .attr("transform", "rotate(-90)")
          //   .attr("y",-40)
          //   .attr("x",-70)
          //   .attr("class","axis-text")
          //   .style("fill","black")
          //   .text("Number of Artists");

        svgs.selectAll(".bar")
          .data(function(d) {return d.values;})
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x3(d.count); })
            .attr("y", function(d) { return y3(d.artists); })
            .attr("width", x3.bandwidth())
            .attr("height", function(d) { return height3 - y3(d.artists); })
    })
    .catch((error) => {
    		throw error;
    });