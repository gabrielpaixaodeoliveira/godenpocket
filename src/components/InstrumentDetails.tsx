import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Container } from '@mui/material';
import { Instrument } from '../types/Instrument';

interface InstrumentDetailsProps {
  instrument: Instrument;
}

const InstrumentDetails: React.FC<InstrumentDetailsProps> = ({ instrument }) => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Detalhes do Instrumento
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Marca: {instrument.marca}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Madeira: {instrument.madeira}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Modelo: {instrument.modelo}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Cor: {instrument.cor}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Captadores: {instrument.captadores}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default InstrumentDetails; 