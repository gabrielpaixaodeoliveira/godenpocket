import React from 'react';
import { CssBaseline, ThemeProvider, createTheme, Container, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import InstrumentForm from './components/InstrumentForm';
import InstrumentDetails from './components/InstrumentDetails';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const InstrumentRoute: React.FC = () => {
  const { instrumentData } = useParams();
  const instrument = instrumentData ? JSON.parse(decodeURIComponent(instrumentData)) : null;

  if (!instrument) {
    return (
      <Container>
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Instrumento não encontrado
        </Typography>
      </Container>
    );
  }

  return <InstrumentDetails instrument={instrument} />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<InstrumentForm />} />
          <Route path="/instrument/:instrumentData" element={<InstrumentRoute />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
