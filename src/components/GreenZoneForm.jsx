import React, { useState, useEffect } from 'react';
import styles from './GreenZoneForm.module.scss';

const GreenZoneForm = ({ 
  selectedCity, 
  treeData, 
  onAddZone, 
  onEditZone,
  getTreeStats
}) => {
  const [zoneName, setZoneName] = useState('');
  const [parentZone, setParentZone] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedZone, setSelectedZone] = useState('');
  const [newZoneName, setNewZoneName] = useState('');
  const [allZones, setAllZones] = useState([]);
  const [treeStats, setTreeStats] = useState({ height: 0, nodes: 0 });
  
  useEffect(() => {
    console.log('GreenZoneForm received treeData:', treeData);
    
    if (treeData && treeData.raiz) {
      try {

        if (typeof treeData.bfs === 'function') {
          const zones = treeData.bfs().map(zone => zone.nombre);
          console.log('Tree zones found:', zones);
          setAllZones(zones);
        } else {
          console.warn('treeData.bfs is not a function');
          setAllZones([]);
        }
        
       
        const height = typeof treeData.calcularAltura === 'function' ? treeData.calcularAltura() : 0;
        const nodes = typeof treeData.contarNodos === 'function' ? treeData.contarNodos() : 0;
        
        console.log('Tree stats calculated:', { height, nodes });
        
        setTreeStats({ height, nodes });
      } catch (error) {
        console.error('Error processing tree data:', error);
        setAllZones([]);
        setTreeStats({ height: 0, nodes: 0 });
      }
    } else {
      setAllZones([]);
      setTreeStats({ height: 0, nodes: 0 });
    }
    
    
    setZoneName('');
    setParentZone('');
    setEditMode(false);
    setSelectedZone('');
    setNewZoneName('');
  }, [treeData, selectedCity]);
  const handleAddZone = (e) => {
    e.preventDefault();
    if (zoneName.trim()) {
      console.log('Enviando solicitud para agregar zona:', parentZone || null, { nombre: zoneName });
      onAddZone(parentZone || null, { nombre: zoneName });
      setZoneName('');
      

      setTimeout(() => {
        if (treeData) {
          const updatedStats = {
            height: typeof treeData.calcularAltura === 'function' ? treeData.calcularAltura() : 0,
            nodes: typeof treeData.contarNodos === 'function' ? treeData.contarNodos() : 0
          };
          console.log('Estadísticas actualizadas después de agregar:', updatedStats);
          setTreeStats(updatedStats);
        }
      }, 100);
    }
  };
  const handleEditZone = (e) => {
    e.preventDefault();
    if (selectedZone && newZoneName.trim()) {
      console.log('Editando zona:', selectedZone, 'Nuevo nombre:', newZoneName);
      onEditZone(selectedZone, newZoneName);
      setSelectedZone('');
      setNewZoneName('');
      setEditMode(false);
      
    
      if (treeData && typeof treeData.bfs === 'function') {
        setTimeout(() => {
          try {
            const zones = treeData.bfs().map(zone => zone.nombre);
            console.log('Zonas actualizadas después de editar:', zones);
            setAllZones(zones);
          } catch (error) {
            console.error('Error actualizando zonas después de editar:', error);
          }
        }, 100);
      }
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  if (!selectedCity) {
    return <div className={styles.message}>Selecciona una ciudad para gestionar sus zonas verdes</div>;
  }

  return (
    <div className={styles.zoneForm}>
      <h3>Zonas Verdes de {selectedCity}</h3>
      
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span>Altura del árbol:</span>
          <strong>{treeStats.height}</strong>
        </div>
        <div className={styles.statItem}>
          <span>Total de zonas:</span>
          <strong>{treeStats.nodes}</strong>
        </div>
      </div>
      
      <div className={styles.formToggle}>
        <button 
          className={`${styles.toggleButton} ${!editMode ? styles.active : ''}`} 
          onClick={() => setEditMode(false)}
        >
          Agregar Zona
        </button>
        <button 
          className={`${styles.toggleButton} ${editMode ? styles.active : ''}`} 
          onClick={() => setEditMode(true)}
        >
          Editar Zona
        </button>
      </div>
      
      {!editMode ? (
        <form onSubmit={handleAddZone} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Nombre de la zona:</label>
            <input
              type="text"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
              placeholder="Ingresa nombre de la zona verde"
              className={styles.input}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Zona padre (opcional):</label>
            <select
              value={parentZone}
              onChange={(e) => setParentZone(e.target.value)}
              className={styles.select}
            >
              <option value="">Zona raíz</option>
              {allZones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>
          
          <button type="submit" className={styles.button}>
            Agregar Zona Verde
          </button>
        </form>
      ) : (
        <form onSubmit={handleEditZone} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Seleccionar zona a editar:</label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className={styles.select}
              required
            >
              <option value="">Selecciona una zona</option>
              {allZones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label>Nuevo nombre:</label>
            <input
              type="text"
              value={newZoneName}
              onChange={(e) => setNewZoneName(e.target.value)}
              placeholder="Nuevo nombre de la zona"
              className={styles.input}
              required
            />
          </div>
          
          <button type="submit" className={styles.button}>
            Actualizar Zona
          </button>
        </form>
      )}
    </div>
  );
};

export default GreenZoneForm;
