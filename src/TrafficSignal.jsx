import React from 'react';
import redSignal from './images/redSignal.jpeg';
import yellowSignal from './images/yellowSignal.jpeg';
import greenSignal from './images/greenSignal.jpeg';
import TrafficSignalContext from './TrafficSignalContext';

const renderSignal = (signalColor) => {
  if (signalColor === 'red') return redSignal;
  if (signalColor === 'yellow') return yellowSignal;
  if (signalColor === 'green') return greenSignal;
  return null;
};

const TrafficSignal = () => {
  return (
    <TrafficSignalContext.Consumer>
      {
        ({ signalColor, changeSignal }) => (
          <div>
            <div className="button-container">
              <button onClick={() => changeSignal('red')} type="button">
                Red
              </button>
              <button onClick={() => changeSignal('yellow')} type="button">
                Yellow
              </button>
              <button onClick={() => changeSignal('green')} type="button">
                Green
              </button>
            </div>
            <img className="signal" src={renderSignal(signalColor)} alt="" />
          </div>
        )
      }
    </TrafficSignalContext.Consumer>
    
  );
};

export default TrafficSignal;
