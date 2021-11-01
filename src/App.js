import React from 'react';
import TrafficSignal from './TrafficSignal';
import './App.css';
import Cars from './Cars';
import CarsContext from './CarsContext';
import TrafficSignalContext from './TrafficSignalContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redCar: false,
      blueCar: false,
      yellowCar: false,
      signalColor: 'red',
    }
    this.moveCar = this.moveCar.bind(this);
    this.changeSignal = this.changeSignal.bind(this);
  }

  moveCar(car) {
    this.setState((state) => ({
      [`${car}Car`]: !state[`${car}Car`],
    }))
  }

  changeSignal(color) {
    this.setState({
      signalColor: color,
    })
  }
  render() {
    const { signalColor, ...cars } = this.state
    const carsValue = {
      ...cars,
      moveCar: this.moveCar,
    }
    const trafficSignal = {
      signalColor,
      changeSignal: this.changeSignal,
    }
    return (
      <div className="container">
        <CarsContext.Provider value={ carsValue }>
          <Cars />
        </CarsContext.Provider>
        <TrafficSignalContext.Provider value={ trafficSignal }>
          <TrafficSignal />
        </TrafficSignalContext.Provider>
      </div>
    );
  }

}

export default App;
