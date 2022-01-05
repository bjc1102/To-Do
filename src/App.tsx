import React from 'react';
import { GlobalStyle } from './styles/global-style';
import ToDoList from './components/ToDoList';

function App() {
  return (
    <>
      <GlobalStyle/>
      <ToDoList/>
    </>
  );
}

export default App;
