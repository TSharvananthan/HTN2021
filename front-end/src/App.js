import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Landing from './components/Landing';
import Footer from './components/Footer';
import TestReview from './components/TestReview';

export default function App() {
  const MainBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }));

  return (
    <Router>
      <MainBox>
        <CssBaseline />
        <Switch>
          <Route exact path='/test'>
            <TestReview />
          </Route>
          <Route exact path='/'>
            <Landing />
          </Route>
        </Switch>
        <Footer />
      </MainBox>
    </Router>
  );
}
