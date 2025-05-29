import React, { useState, useEffect } from 'react';
import './App.css';
import Graph from './Graph/Graph';
import { ArbolNArio } from './NaryTree/ArbolNArio';
import { Nodo } from './NaryTree/Nodo';
import CityForm from './components/CityForm';
import GreenZoneForm from './components/GreenZoneForm';
import CityGraph from './components/CityGraph';
import TreeGraph from './components/TreeGraph.simple';
import CitySelector from './components/CitySelector';

function App() {
  const [cityGraph] = useState(new Graph());
  const [greenZoneTrees, setGreenZoneTrees] = useState({});
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });

  console.log('Initial state:', { cities, graphData });

  useEffect(() => {
    console.log('Cities changed:', cities);
    updateGraphData();
  }, [cities]);

  const getSelectedCityTree = () => {
    if (!selectedCity || !greenZoneTrees[selectedCity]) {
      return null;
    }
    return greenZoneTrees[selectedCity];
  };


  const updateGraphData = () => {
    const nodes = cityGraph.getAllNodes();
    const edges = cityGraph.getAllEdges();
    console.log('Updating graph data:', { nodes, edges });
    

    if (nodes && edges) {
      console.log('Setting graph data with:', { nodes, edges });
      setGraphData({
        nodes: [...nodes], 
        edges: [...edges]  
      });
    }
  };

  
  const handleAddCity = (cityName) => {
    console.log('Adding city:', cityName);
    if (!cityGraph.searchNode(cityName)) {
      cityGraph.addNode(cityName);
      
      
      const newTree = new ArbolNArio();
      newTree.agregarRaiz({ nombre: cityName + ' Centro' });
      
      
      console.log('Tree methods:', {
        bfs: typeof newTree.bfs === 'function',
        obtenerDatosD3: typeof newTree.obtenerDatosD3 === 'function',
        calcularAltura: typeof newTree.calcularAltura === 'function',
        contarNodos: typeof newTree.contarNodos === 'function'
      });
      
     
      setGreenZoneTrees(prev => ({
        ...prev,
        [cityName]: newTree
      }));
      
      setCities(cityGraph.getAllNodes());
      
      
      setSelectedCity(cityName);
    }
  };

    
  const handleRemoveCity = (cityName) => {
    console.log('Removing city:', cityName);
    if (cityGraph.removeNode(cityName)) {
      
      setGreenZoneTrees(prev => {
        const newTrees = { ...prev };
        delete newTrees[cityName];
        return newTrees;
      });
      
      setCities(cityGraph.getAllNodes());
      
      
      if (selectedCity === cityName) {
        setSelectedCity(null);
      }
    }
  };

  
  const handleAddConnection = (city1, city2) => {
    console.log('Adding connection:', city1, city2);
    if (city1 && city2 && city1 !== city2) {
      cityGraph.addEdge(city1, city2);
      console.log('Connection added, updating graph data');
      
      setCities([...cities])
    } else {
      console.error('No se puede conectar la ciudad consigo misma o con una ciudad no válida');
    }
  };

  
  const handleSelectCity = (cityName) => {
    console.log('Selecting city:', cityName);
    setSelectedCity(cityName);
  };


  const handleAddGreenZone = (parentName, newZoneData) => {
    console.log('Adding green zone:', parentName, newZoneData);
    const currentTree = greenZoneTrees[selectedCity];
    
    if (!currentTree) {
      console.error('No hay árbol para la ciudad seleccionada:', selectedCity);
      return;
    }
    
    if (!parentName) {
    
      if (currentTree.raiz) {
        const newNode = new Nodo(newZoneData);
        currentTree.raiz.agregarHijo(newNode);
        console.log('Added node to root:', newZoneData);
      } else {
        console.error('No hay raíz en el árbol para agregar hijo');
      }
    } else {
    
      const result = currentTree.agregarHijo(parentName, newZoneData);
      console.log('Added node to parent:', parentName, newZoneData, result);
      
      if (!result) {
        console.error('No se pudo agregar la zona verde');
      }
    }
    
  
    const nodeCount = currentTree.contarNodos();
    console.log('Conteo después de agregar zona:', nodeCount);
    
  
    setGreenZoneTrees(prev => {
      return { ...prev }; 
    });
  };

 
  const handleEditGreenZone = (zoneName, newName) => {
    console.log('Editing green zone:', zoneName, newName);
    const currentTree = greenZoneTrees[selectedCity];
    
    if (!currentTree) return;
    
   
    const result = currentTree.editarNodo(zoneName, newName);
    console.log('Edit result:', result);
    
    
    setGreenZoneTrees(prev => {
      const newTrees = { ...prev };
      newTrees[selectedCity] = currentTree;
      return newTrees;
    });
  };

  return (
    <div className="app">
      <h1>Red de Ciudades y Zonas Verdes</h1>
      
      <div className="container">
        <div className="forms-section">
          <CityForm 
            cities={cities} 
            onAddCity={handleAddCity} 
            onRemoveCity={handleRemoveCity}
            onAddConnection={handleAddConnection}
          />
          
          <CitySelector
            cities={cities}
            selectedCity={selectedCity}
            onSelectCity={handleSelectCity}
          />
          
          <GreenZoneForm 
            selectedCity={selectedCity}
            treeData={getSelectedCityTree()}
            onAddZone={handleAddGreenZone}
            onEditZone={handleEditGreenZone}
          />
        </div>
        
        <div className="visualization-section">
          <CityGraph 
            graphData={graphData} 
            onSelectCity={handleSelectCity} 
            selectedCity={selectedCity}
          />
          
          <TreeGraph 
            treeData={getSelectedCityTree()}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
