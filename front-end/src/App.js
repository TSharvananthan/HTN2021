import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Switch>
          <Route exact path='/'>
            <Landing />
          </Route>
        </Switch>
        <Footer />
      </Box>
    </Router>
  );
}
