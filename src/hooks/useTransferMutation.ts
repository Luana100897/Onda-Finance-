import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { TransferData } from '@/schemas/transferSchema';
import { toast } from 'sonner';

export const useTransferMutation = () => {
  return useMutation({
    mutationFn: async (data: TransferData) => {
      try {
        const response = await axios.post('http://localhost:3001/transfers', data);
        return response.data;
      } catch (error) {
        return new Promise((resolve) => {
          setTimeout(() => resolve(data), 1500);
        });
      }
    },
    onError: () => {
      toast.error('Erro na transferência. Tente novamente mais tarde.');
    },
  });
};
