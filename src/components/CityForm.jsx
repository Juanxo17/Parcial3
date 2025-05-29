import React, { useState } from 'react';
import styles from './CityForm.module.scss';

const CityForm = ({ cities, onAddCity, onRemoveCity, onAddConnection }) => {
  const [cityName, setCityName] = useState('');
  const [selectedCity1, setSelectedCity1] = useState('');
  const [selectedCity2, setSelectedCity2] = useState('');

  const handleAddCity = (e) => {
    e.preventDefault();
    if (cityName.trim()) {
      onAddCity(cityName);
      setCityName('');
    }
  };

  const handleAddConnection = (e) => {
    e.preventDefault();
    if (selectedCity1 && selectedCity2 && selectedCity1 !== selectedCity2) {
      onAddConnection(selectedCity1, selectedCity2);
      setSelectedCity1('');
      setSelectedCity2('');
    }
  };

  return (
    <div className={styles.cityForm}>
      <div className={styles.formSection}>
        <h3>Agregar Ciudad</h3>
        <form onSubmit={handleAddCity}>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Nombre de la ciudad"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Agregar</button>
        </form>
      </div>

      <div className={styles.formSection}>
        <h3>Conectar Ciudades</h3>
        <form onSubmit={handleAddConnection}>
          <select
            value={selectedCity1}
            onChange={(e) => setSelectedCity1(e.target.value)}
            className={styles.select}
            required
          >
            <option value="">Seleccionar ciudad</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          
          <select
            value={selectedCity2}
            onChange={(e) => setSelectedCity2(e.target.value)}
            className={styles.select}
            required
          >
            <option value="">Seleccionar ciudad</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          
          <button type="submit" className={styles.button}>Conectar</button>
        </form>
      </div>

      <div className={styles.formSection}>
        <h3>Eliminar Ciudad</h3>
        <div className={styles.cityList}>
          {cities.map((city) => (
            <div key={city} className={styles.cityItem}>
              <span>{city}</span>
              <button 
                onClick={() => onRemoveCity(city)}
                className={styles.removeButton}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityForm;
