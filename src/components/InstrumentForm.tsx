import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { Instrument } from '../types/Instrument';

const InstrumentForm: React.FC = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [instrumentData, setInstrumentData] = useState<Instrument | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Instrument>();

  const onSubmit = (data: Instrument) => {
    setInstrumentData(data);
    setShowQRCode(true);
    reset();
  };

  const handleClose = () => {
    setShowQRCode(false);
    setInstrumentData(null);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Cadastro de Instrumento
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Marca"
            margin="normal"
            {...register('marca', { required: 'Marca é obrigatória' })}
            error={!!errors.marca}
            helperText={errors.marca?.message}
          />

          <TextField
            fullWidth
            label="Madeira"
            margin="normal"
            {...register('madeira', { required: 'Madeira é obrigatória' })}
            error={!!errors.madeira}
            helperText={errors.madeira?.message}
          />

          <TextField
            fullWidth
            label="Modelo"
            margin="normal"
            {...register('modelo', { required: 'Modelo é obrigatório' })}
            error={!!errors.modelo}
            helperText={errors.modelo?.message}
          />

          <TextField
            fullWidth
            label="Cor"
            margin="normal"
            {...register('cor', { required: 'Cor é obrigatória' })}
            error={!!errors.cor}
            helperText={errors.cor?.message}
          />

          <TextField
            fullWidth
            label="Captadores"
            margin="normal"
            {...register('captadores', { required: 'Captadores são obrigatórios' })}
            error={!!errors.captadores}
            helperText={errors.captadores?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
        </Box>
      </Paper>

      <Dialog open={showQRCode} onClose={handleClose}>
        <DialogTitle>QR Code do Instrumento</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            <QRCodeSVG
              value={`${window.location.origin}/instrument/${encodeURIComponent(JSON.stringify(instrumentData))}`}
              size={256}
            />
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
              Escaneie o QR Code para visualizar os detalhes do instrumento
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InstrumentForm; 