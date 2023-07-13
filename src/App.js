import React from 'react';
import './App.css';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from './components/Navbar';

import authConfig from "./authConfig";
import { AuthProvider } from "oidc-react";
import useLocalStorage from "use-local-storage";

import Container from 'react-bootstrap/Container';
import Tasks from './components/Tasks';
import Scoreboard from './components/Scoreboard';
import ScoreChart from './components/Scorechart';
import RadarChart from './components/Radar';
import Heatmap from './components/Heatmap';
import TeamCard from './components/TeamCard';

function App() {
  const defaultDark = window.matchMedia(
    "(prefers-colors-scheme: dark)"
  ).matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="App text-light gradient-background" data-theme={theme}>
      <AuthProvider {...authConfig}>
        <NavBar />

        <Row className='m-3 d-flex justify-content-between'>
          <Col lg={3}>
            <div className='m-2 bg-dark border border-dark border-1 rounded shadow bg-opacity-50 border-opacity-10'>
              <h3 className='m-3 d-flex justify-content-center'>Tasks</h3>
              <Tasks />
            </div>
          </Col>
          <Col lg={6} >
            <div className='m-2 bg-dark border border-dark border-1 rounded shadow bg-opacity-50 border-opacity-10'>
              <h3 className='m-3 d-flex justify-content-center'>Scoreboard</h3>
              <ScoreChart />
              <Scoreboard />
            </div>
          </Col>
          <Col lg={3}>
            <div className='m-2 bg-dark border border-dark border-1 rounded shadow bg-opacity-50 border-opacity-10'>
              <h3 className='m-3 d-flex justify-content-center'>Team</h3>
              <RadarChart />
              <Heatmap />
            </div>
          </Col>

        </Row>
      </AuthProvider>
    </div>
  );
}

export default App;
