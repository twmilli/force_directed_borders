var outerWidth = 1200;
var outerHeight = 800;

var URL = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';

d3.json(URL, function(error, data){
  if (error){
    throw error;
  }

  var svg = d3.select('body').append('svg')
  .attr('width', outerWidth)
  .attr('height', outerHeight);

  var nodes = data.nodes,
      links = data.links;

  var simulation = d3.forceSimulation()
  .force('center', d3.forceCenter(outerWidth/2, outerHeight/2))
  .nodes(nodes)
  .force('link', d3.forceLink(links))
  .force('charge', d3.forceManyBody().strength(-50))
  .force('X', d3.forceX())
  .force('Y', d3.forceY());

  simulation.force('link').distance(20);

  var link = svg.selectAll('.link')
  .data(links)
  .enter()
  .append('line')
  .attr('class', 'link')


  var node = d3.select('.box').selectAll(".node")
    .data(nodes)
    .enter()
    .append("img")
    .attr('class', function(d){
      return ('node flag flag-' + d.code);
    })
    .call(d3.drag()
          .on('start', drag_started)
          .on('drag', dragged)
          .on('end', drag_ended));

  simulation
  .on('tick', ticked);


  function ticked(){
     link
    .attr('x1', function(d){
       return d.source.x;})
    .attr('y1', function(d){return d.source.y; })
    .attr('y2', function(d){return d.target.y; })
    .attr('x2', function(d){return d.target.x; });

    node
    .style('left',function(d){
      return((d.x) +'px');})
    .style('top', function(d){return (d.y + 'px');});
  }

  function drag_started(d){
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d){
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function drag_ended(d){
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }



});
