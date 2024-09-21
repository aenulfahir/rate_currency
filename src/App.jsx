// eslint-disable-next-line no-unused-vars
import React from 'react';
import CurrencyTable from './CurrencyTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency Exchange Rates</h1>
      </header>
      <main>
        <CurrencyTable />
      </main>
    </div>
  );
}

export default App;
