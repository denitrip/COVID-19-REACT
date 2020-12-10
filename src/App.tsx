
import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Map from './components/Map/Map';

function App() {
  return (
    <div className="App">
      <Header/>
      <Map url="https://api.covid19api.com/summary"></Map> 
    </div>
  );
}

export default App;
