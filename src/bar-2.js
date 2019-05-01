var tooltips = ["zero","one","two",
"A, A Day To Remember, A Wilhelm Scream, Adam Green, AJ Tracey, Alma, alt-J, Alunageorge, Amen, And So I Watch You From Afar, And You Will Know Us By The Trail of Dead, Andy C, Arcane Roots, Architects, At The Drive-In, Azealia Banks, Band of Skulls, Basement, Be Your Own Pet, Bedouin Soundclash, Black Foxxes, Black Honey, Blaenavon, Bowling For Soup, Boysetsfire, Buck 65, Bugzy Malone, Catfish and the Bottlemen, Chapel Club, Childhood, Crossfaith, David Rodigan, Deap Vally, Digitalism, Disclosure, DJ Target, DMA's, Does It Offend You, Yeah?, Doves, Drenge, Editors, Eminem, Fickle Friends, Fight Like Apes, Fightstar, Florence and the Machine, Foster The People, Frankie and the Heartstrings, Franz Ferdinand, Fred V & Grafix, Friendly Fires, General Fiasco, Gnarwolves, Goldfinger, Goldie Lookin' Chain, Green Day, Guided By Voices, Hacktivist, Hannah Wants, Hawk Eyes, Hell is for Heroes, Ikara Colt, Imagine Dragons, Jack Peñate, Jaguar Skills, Jake Bugg, James Organ, Jamie T, Kaiser Chiefs, Kasabian, Kate Nash, Lady Leshurr, Limp Bizkit, Lonely The Brave, Los Campesinos!, Lucy Rose, Mad Caddies, Mallory Knox, Manchester Orchestra, Mariachi El Bronx, Metallica, Milk Teeth, Mini Mansions, Mistajam, Muncie Girls, Municipal Waste, Mura Masa, My Chemical Romance, Neck Deep, NOFX, Nothing But Thieves, Otherkin, P Money, Pale Waves, Papa Roach, Patrick Wolf, Peaches, Pennywise, Primal Scream, Pulp, PVRIS, Random Hand, Rat Boy, Razorlight, Red Hot Chili Peppers, Rival Schools, Royal Blood, Saint Raymond, Savages, Saves The Day, Seasick Steve, Skindred, Slipknot, Snuff, Sonic Boom Six, Sparta, Spring King, Star.One, Sum 41, SWMRS, System Of A Down, The Computers, The Cooper Temple Clause, The Courteeners, The Districts, The Donnas, The Duke Spirit, The Flatliners, The Get Up Kids, The Hunna, The Japanese House, The Kooks, The Magic Gang, The Minutes, The Music, The Rakes, The Sherlocks, The Shins, The Strokes, The Used, The White Stripes, Tribes, Turbonegro, twenty one pilots, Vampire Weekend, Vant, Warpaint, While She Sleeps, Wilkinson, Wolf Alice, Young Guns",
"2manydjs, Against Me!, Alkaline Trio, All Time Low, Arctic Monkeys, Blossoms, Bring Me The Horizon, Bullet for my Valentine, Cage the Elephant, Cancer Bats, Charli XCX, Circa Waves, Coheed and Cambria, Deftones, Dillon Francis, Dizzee Rascal, Dropkick Murphys, Dry The River, Fekky, Fidlar, Frank Carter and the Rattlesnakes, Get Cape. Wear Cape. Fly, Gogol Bordello, Graham Coxon, Interpol, Jacob Plant, Kids in Glass Houses, Kings of Leon, Klaxons, Krept & Konan, Ladytron, LCD Soundsystem, Lower Than Atlantis, Mastodon, Our Fold, Palma Violets, Peace, Pendulum, Placebo, Reel Big Fish, Rise Against, Roots Manuva, Sub Focus, Taking Back Sunday, Ten Tonnes, The 1975, The Hives, The King Blues, The Offspring, The Skints, The Sunshine Underground, The Vaccines, Thursday, White Lies, Wiley, Yeah Yeah Yeahs",
"Bastille, blink-182, Bloc Party, Blood Red Shoes, Bouncing Souls, Deaf Havana, Dinosaur Pile-up, DJ Semtex, Eagles of Death Metal, elbow, Everything Everything, Flogging Molly, Foals, Foo Fighters, Gallows, Giggs, Hadouken!, Hundred Reasons, Marmozets, Maxïmo Park, Mystery Jets, Panic! At The Disco, Paramore, Slaves, Spector, Sundara Karma, The Blackout, The Gaslight Anthem, The Libertines, The Living End, The Maccabees, The Streets, The View, The Wombats, Thrice, Twisted Wheel, Two Door Cinema Club, We Are Scientists",
"Alexisonfire, Anti-Flag, Ash, Bombay Bicycle Club, Capdown, Don Broco, Fall Out Boy, Feeder, Funeral For A Friend, Less Than Jake, Lethal Bizzle, Lostprophets, Metronomy, MUSE, Queens of the Stone Age, Sick Of It All, The Futureheads, The Horrors, The Joy Formidable, The Kills, The Subways, Twin Atlantic",
"Billy Talent, British Sea Power, Crystal Castles, Frank Turner, Jimmy Eat World, New Found Glory, Pulled Apart By Horses, The Bronx, The Cribs, You Me At Six",
"Biffy Clyro, Enter Shikari"]

var chart2 = d3.select("#chart-2"),
    margin2 = {top: 300, right: 50, bottom: 100, left: 180},
    width2 = +chart2.attr("width") - margin2.left - margin2.right,
    height2 = +chart2.attr("height") - margin2.top - margin2.bottom;

var x2 = d3.scaleBand().rangeRound([0, width2]).padding(0.1),
    y2 = d3.scaleLinear().rangeRound([height2, 0]);

var g2 = chart2.append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

var svgContainer = d3.select('body');
// var svg2 = svgContainer.append('svg')
var div = svgContainer
      .append('div')
      .attr("class", "tooltip")				
      .style("opacity", 0);	

d3.csv("data/3-artist-counts.csv")
  	.then((data) => {
        return data.map((d) => {
          d.artists = +d.artists;

          return d;  
        });
		})
  	.then((data) => {
        x2.domain(data.map(function(d) { return d.count; }));
        y2.domain([0, d3.max(data, function(d) { return d.artists; })]);

        g2.append("g")
            .attr("class","axis-text")
            .attr("transform", "translate(0," + height2 + ")")
            .call(d3.axisBottom(x2))
            .call(g => g.select(".domain").remove())
            .append("text")
                .attr("x",150)
                .attr("y","45")
                .attr("class","axis-text")
                .style("fill","black")
                .text("Times Played")

        g2.append("g")
            .attr("class","axis-text")
            .call(d3.axisLeft(y2).ticks(4))
            .call(g => g.select(".domain").remove())
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y",-50)
            .attr("x",-20)
            // .attr("text-anchor", "end")
            .attr("class","axis-text")
            .style("fill","black")
            .text("Number of Artists");

        g2.selectAll(".bar")
          .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x2(d.count); })
            .attr("y", function(d) { return y2(d.artists); })
            .attr("width", x2.bandwidth())
            .attr("height", function(d) { return height2 - y2(d.artists); })
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