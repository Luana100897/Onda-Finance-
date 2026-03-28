import { describe, it, expect } from 'vitest';
import { transferSchema } from './transferSchema';

describe('Transfer Schema Validation', () => {
  it('should validate correctly with valid data', () => {
    const validData = {
      recipient: 'Maria da Silva',
      account: '54321',
      amount: 150.5,
    };

    const result = transferSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail if recipient is too short', () => {
    const invalidData = {
      recipient: 'Ana',
      account: '54321',
      amount: 150.5,
    };

    const result = transferSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('O destinatário deve ter pelo menos 5 caracteres.');
    }
  });

  it('should fail if amount is zero or negative', () => {
    const invalidData = {
      recipient: 'Maria da Silva',
      account: '54321',
      amount: 0,
    };

    const result = transferSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('O valor da transferência deve ser maior que zero.');
    }
  });

  it('should fail if account is too short', () => {
    const invalidData = {
      recipient: 'Maria da Silva',
      account: '123',
      amount: 100,
    };

    const result = transferSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Conta inválida.');
    }
  });
});
