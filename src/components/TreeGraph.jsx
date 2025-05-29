import React from 'react';
import styles from './TreeGraph.module.scss';

function TreeGraph({ treeData }) {
  return (
    <div className={styles.treeContainer}>
      <h3>Árbol de Zonas Verdes</h3>
      {treeData && treeData.raiz ? (
        <>
          <div className={styles.treeInfo}>
            Profundidad: {treeData.calcularAltura ? treeData.calcularAltura() : '?'} - 
            Nodos: {treeData.contarNodos ? treeData.contarNodos() : '?'}
          </div>
          <div>Visualización simplificada temporalmente</div>
        </>
      ) : (
        <div className={styles.emptyMessage}>
          No hay zonas verdes para mostrar.
        </div>
      )}
    </div>
  );
}

export default TreeGraph;
