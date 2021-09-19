import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Landing from './components/Landing';
import Footer from './components/Footer';

export default function App() {
  const theme = createTheme({});
  return (
    <Router>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route exact path='/'>
              <Landing />
            </Route>
          </Switch>
          <Footer />
        </ThemeProvider>
      </Box>
    </Router>
  );
}
