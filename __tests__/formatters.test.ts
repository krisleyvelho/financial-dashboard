import { formatCurrency, formatPercentage, translateCategory } from '@/lib/utils/formatters'

describe('Formatters', () => {
  describe('formatCurrency', () => {
    it('formats currency in BRL', () => {
      expect(formatCurrency(1000)).toBe('R$\xa01.000,00')
      expect(formatCurrency(1234.56)).toBe('R$\xa01.234,56')
      expect(formatCurrency(0)).toBe('R$\xa00,00')
    })

    it('handles negative values', () => {
      expect(formatCurrency(-500)).toBe('-R$\xa0500,00')
    })
  })

  describe('formatPercentage', () => {
    it('formats percentage with default decimals', () => {
      expect(formatPercentage(10.5)).toBe('10.5%')
      expect(formatPercentage(100)).toBe('100.0%')
    })

    it('formats percentage with custom decimals', () => {
      expect(formatPercentage(10.567, 2)).toBe('10.57%')
      expect(formatPercentage(10.567, 0)).toBe('11%')
    })
  })

  describe('translateCategory', () => {
    it('translates known categories', () => {
      expect(translateCategory('food')).toBe('Alimentação')
      expect(translateCategory('transport')).toBe('Transporte')
      expect(translateCategory('housing')).toBe('Moradia')
    })

    it('returns original value for unknown categories', () => {
      expect(translateCategory('unknown')).toBe('unknown')
    })
  })
})
