import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddSubject from './Components/MasterPage/AddSubject';
import AddModule from './Components/MasterPage/AddModule';
import AddNotes from './Components/MasterPage/AddNotes';
import { Route, Routes } from 'react-router-dom';
import MasterPage from './MasterPage';
import MainCard from './Components/MainCard';

function App() {
  return (
    <div>
      <MainCard />
    </div>
  );
}

export default App;


