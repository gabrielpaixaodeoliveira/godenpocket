import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { Instrument } from '../../types/Instrument';
import { instrumentService } from '../../services/instrumentService';

export default function InstrumentDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [instrument, setInstrument] = useState<Instrument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInstrument() {
      try {
        if (typeof id === 'string') {
          const instrumentData = await instrumentService.getInstrumentById(id);
          if (instrumentData) {
            setInstrument(instrumentData);
          } else {
            setError('Instrumento não encontrado');
          }
        }
      } catch (err) {
        setError('Erro ao buscar instrumento');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchInstrument();
    }
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </Box>
        </Paper>
      </Container>
    );
  }

  if (error || !instrument) {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" color="error">
            {error || 'Instrumento não encontrado'}
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Detalhes do Instrumento
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography><strong>Marca:</strong> {instrument.marca}</Typography>
          <Typography><strong>Modelo:</strong> {instrument.modelo}</Typography>
          <Typography><strong>Madeira:</strong> {instrument.madeira}</Typography>
          <Typography><strong>Cor:</strong> {instrument.cor}</Typography>
          <Typography><strong>Captadores:</strong> {instrument.captadores}</Typography>
        </Box>
      </Paper>
    </Container>
  );
} 