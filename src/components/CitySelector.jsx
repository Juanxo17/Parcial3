import React from 'react';
import styles from './CitySelector.module.scss';

const CitySelector = ({ cities, selectedCity, onSelectCity }) => {
  return (
    <div className={styles.citySelector}>
      <h3>Seleccionar Ciudad</h3>
      <div className={styles.cityList}>
        {cities.length > 0 ? (
          cities.map(city => (
            <button
              key={city}
              className={`${styles.cityButton} ${selectedCity === city ? styles.selected : ''}`}
              onClick={() => onSelectCity(city)}
            >
              {city}
            </button>
          ))
        ) : (
          <p className={styles.noCities}>No hay ciudades disponibles</p>
        )}
      </div>
    </div>
  );
};

export default CitySelector;
