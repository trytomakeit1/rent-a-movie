import React from 'react';
import './App.css';
import Content from '../components/Content';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Content />
      </div>
    </BrowserRouter>
  );
}

export default App;
