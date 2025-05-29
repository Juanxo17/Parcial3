import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import styles from './CityGraph.module.scss';

const CityGraph = ({ graphData, onSelectCity, selectedCity }) => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!graphData || !graphData.nodes || !graphData.edges || graphData.nodes.length === 0) {
      return;
    }
    
    console.log('Rendering graph with data:', graphData);
    
    const width = 600;
    const height = 400;
      d3.select(svgRef.current).selectAll("*").remove();
    
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);
      const nodeObjects = graphData.nodes.map(name => ({ id: name }));
    
    const linkObjects = graphData.edges.map(edge => ({
      source: edge.source,
      target: edge.target
    }));
    
    console.log('Nodes for D3:', nodeObjects);
    console.log('Links for D3:', linkObjects);
      const simulation = d3.forceSimulation(nodeObjects)
      .force("link", d3.forceLink(linkObjects).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(60));
      const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(linkObjects)
      .join("line")
      .attr("stroke-width", 2);
    
   
    const node = svg.append("g")
      .selectAll("g")
      .data(nodeObjects)
      .join("g")
      .attr("class", d => d.id === selectedCity ? styles.selectedNode : styles.node)
      .call(drag(simulation))
      .on("click", (event, d) => {
        onSelectCity(d.id);
      });
    
   
    node.append("circle")
      .attr("r", 20)
      .attr("fill", d => d.id === selectedCity ? "#6d92bf" : "#4a6fa5");
    
   
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "white")
      .text(d => d.id);
    
   
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      
      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
    
   
    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      
      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
    
    return () => {
      simulation.stop();
    };
  }, [graphData, selectedCity, onSelectCity]);
    return (
    <div className={styles.graphContainer}>
      <h3>Red de Ciudades</h3>
      {graphData && graphData.nodes && graphData.nodes.length > 0 ? (
        <svg ref={svgRef} className={styles.graph}></svg>
      ) : (
        <p className={styles.emptyMessage}>No hay ciudades para mostrar.</p>
      )}
    </div>
  );
};

export default CityGraph;
