var padding = 10;

var tooltipsFour = ["zero","one","two",
"three",
"2manydjs, Against Me!, Alkaline Trio, All Time Low, Arctic Monkeys, Blossoms, Bring Me The Horizon, Bullet for my Valentine, Cage the Elephant, Cancer Bats, Charli XCX, Circa Waves, Coheed and Cambria, Deftones, Dillon Francis, Dizzee Rascal, Dropkick Murphys, Dry The River, Fekky, Fidlar, Frank Carter and the Rattlesnakes, Get Cape. Wear Cape. Fly, Gogol Bordello, Graham Coxon, Interpol, Jacob Plant, Kids in Glass Houses, Kings of Leon, Klaxons, Krept & Konan, Ladytron, LCD Soundsystem, Lower Than Atlantis, Mastodon, Our Fold, Palma Violets, Peace, Pendulum, Placebo, Reel Big Fish, Rise Against, Roots Manuva, Sub Focus, Taking Back Sunday, Ten Tonnes, The 1975, The Hives, The King Blues, The Offspring, The Skints, The Sunshine Underground, The Vaccines, Thursday, White Lies, Wiley, Yeah Yeah Yeahs",
"Bastille, blink-182, Bloc Party, Blood Red Shoes, Bouncing Souls, Deaf Havana, Dinosaur Pile-up, DJ Semtex, Eagles of Death Metal, elbow, Everything Everything, Flogging Molly, Foals, Foo Fighters, Gallows, Giggs, Hadouken!, Hundred Reasons, Marmozets, Maxïmo Park, Mystery Jets, Panic! At The Disco, Paramore, Slaves, Spector, Sundara Karma, The Blackout, The Gaslight Anthem, The Libertines, The Living End, The Maccabees, The Streets, The View, The Wombats, Thrice, Twisted Wheel, Two Door Cinema Club, We Are Scientists",
"Alexisonfire, Anti-Flag, Ash, Bombay Bicycle Club, Capdown, Don Broco, Fall Out Boy, Feeder, Funeral For A Friend, Less Than Jake, Lethal Bizzle, Lostprophets, Metronomy, MUSE, Queens of the Stone Age, Sick Of It All, The Futureheads, The Horrors, The Joy Formidable, The Kills, The Subways, Twin Atlantic",
"Billy Talent, British Sea Power, Crystal Castles, Frank Turner, Jimmy Eat World, New Found Glory, Pulled Apart By Horses, The Bronx, The Cribs, You Me At Six",
"Biffy Clyro, Enter Shikari"]

var chart4 = d3.select("#chart-4"),
    margin4 = {top: 75, right: 20, bottom: 100, left: 150},
    width4 = +chart4.attr("width") - margin4.left - margin4.right,
    height4 = +chart4.attr("height") - margin4.top - margin4.bottom;

var x4 = d3.scaleBand().rangeRound([0, width4]).padding(0.1),
    y4 = d3.scaleLinear().rangeRound([height4, 0]);

var g4 = chart4.append("g")
    .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

var svgContainer = d3.select('body');
var svg4 = svgContainer.append('svg')
var div = svgContainer
      .append('div')
      .attr("class", "tooltip")				
      .style("opacity", 0);	

d3.csv("data/4-artist-counts.csv")
  	.then((data) => {
        return data.map((d) => {
          d.artists = +d.artists;

          return d;  
        });
		})
  	.then((data) => {
        x4.domain(data.map(function(d) { return d.count; }));
        y4.domain([0, d3.max(data, function(d) { return d.artists; })]);

        g4.append("g")
            .attr("class", "axis axis--x")
            .attr("class","axis-text")
            .attr("transform", "translate(0," + height4 + ")")
            .call(d3.axisBottom(x4))
            .append("text")
                .attr("x",width4/2)
                .attr("y","45")
                .attr("class","axis-text")
                .style("fill","black")
                .text("Times Played")

        g4.append("g")
            .attr("class", "axis axis--y")
            .attr("class","axis-text")
            .call(d3.axisLeft(y4).ticks(5))
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y",-1*(height4/10)-padding)
            .attr("x",-1*(width4/4)-padding*2)
            // .attr("text-anchor", "end")
            .attr("class","axis-text")
            .style("fill","black")
            .text("Number of Artists");

        g4.selectAll(".bar")
          .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x4(d.count); })
            .attr("y", function(d) { return y4(d.artists); })
            .attr("width", x4.bandwidth())
            .attr("height", function(d) { return height4 - y4(d.artists); })
            .on("mouseover", function(d) {
                console.log(d.count)		
                div.transition()		
                    .duration(200)		
                    .style("opacity", .9);		
                div.html(tooltips[d.count])
                    .style("left", d3.event.pageX + "px")		
                    .style("top", (d3.event.pageY - 28) + "px")
                    .style("width","600px")	
            })					
            .on("mouseout", function(d) {		
                div.transition()		
                    .duration(500)		
                    .style("opacity", 0);	
            });
    })
    .catch((error) => {
    		throw error;
    });