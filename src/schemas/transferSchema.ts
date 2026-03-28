import { z } from 'zod';

export const transferSchema = z.object({
  recipient: z.string().min(5, 'O destinatário deve ter pelo menos 5 caracteres.'),
  account: z.string().min(4, 'Conta inválida.').regex(/^\d+$/, 'A conta deve conter somente números.'),
  amount: z.coerce.number()
    .positive('O valor da transferência deve ser maior que zero.'),
});

export type TransferData = z.infer<typeof transferSchema>;
