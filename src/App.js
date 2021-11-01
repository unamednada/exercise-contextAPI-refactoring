import React from 'react';
import './App.css';
import Cars from './Cars';
import CarsContext from './CarsContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redCar: false,
      blueCar: false,
      yellowCar: false,
    }
    this.moveCar = this.moveCar.bind(this);
  }

  moveCar(car) {
    this.setState((state) => ({
      [`${car}Car`]: !state[`${car}Car`],
    }))
  }

  render() {
    const cars = {
      ...this.state,
      moveCar: this.moveCar,
    }

    return (
      <CarsContext.Provider value={ cars }>
        <Cars />
      </CarsContext.Provider>
    );
  }
  
}

export default App;
