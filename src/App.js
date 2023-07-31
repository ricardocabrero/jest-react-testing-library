import { Provider } from 'react-redux';
import store from './store/store';
import { useState } from 'react';
import List from './components/List/List';
import Form from './components/Form/Form';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>To do list with Redux</h1>
        <Form/>
        <List/>
      </div>
    </Provider>
  );
}

export default App;
