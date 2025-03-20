import { Instrument } from '../types/Instrument';

export const instrumentService = {
  async saveInstrument(instrument: Instrument): Promise<string> {
    try {
      // Gera um ID único
      const id = crypto.randomUUID();
      
      // Pega instrumentos existentes ou inicia array vazio
      const existingData = localStorage.getItem('instruments');
      const instruments = existingData ? JSON.parse(existingData) : [];
      
      // Adiciona novo instrumento
      const newInstrument = {
        id,
        ...instrument,
        createdAt: new Date().toISOString()
      };
      
      instruments.push(newInstrument);
      
      // Salva no localStorage
      localStorage.setItem('instruments', JSON.stringify(instruments));
      
      return id;
    } catch (error) {
      console.error('Erro ao salvar instrumento:', error);
      throw error;
    }
  },

  async getInstrumentById(id: string): Promise<Instrument | null> {
    try {
      const data = localStorage.getItem('instruments');
      if (!data) return null;
      
      const instruments = JSON.parse(data);
      return instruments.find((inst: Instrument & { id: string }) => inst.id === id) || null;
    } catch (error) {
      console.error('Erro ao buscar instrumento:', error);
      throw error;
    }
  }
}; 