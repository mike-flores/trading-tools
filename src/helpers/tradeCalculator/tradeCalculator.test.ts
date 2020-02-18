import TradeCalculator from './TradeCalculator';

describe('Trade Caculator', () => {
   describe('calculatePercentChange()', () => {
      test(' when two non-zero non-negative numbers when argument one > argument two', () => {
         let result = TradeCalculator.calculatePercentChange(100, 98);
         expect(result).toBe(2);

         result = TradeCalculator.calculatePercentChange(100, 95);
         expect(result).toBe(5);
      });

      test('when with two non-zero non-negative numbers when argument two > argument one', () => {
         let result = TradeCalculator.calculatePercentChange(98, 100);
         expect(result).toBe(2);

         result = TradeCalculator.calculatePercentChange(95, 100);
         expect(result).toBe(5);
      });

      test('when two non-negative numbers where argument any value is 0 ', () => {
         expect(() => {
            TradeCalculator.calculatePercentChange(10, 0);
         }).toThrowError('Value cannot be 0.');
         expect(() => {
            TradeCalculator.calculatePercentChange(0, 10);
         }).toThrowError('Value cannot be 0.');
      });

      test('when two non zero numbers where argument one is negative ', () => {
         expect(() => {
            TradeCalculator.calculatePercentChange(-10, 10);
         }).toThrowError('Value cannot be negative.');
         expect(() => {
            TradeCalculator.calculatePercentChange(10, -10);
         }).toThrowError('Value cannot be negative.');
      });
      test('when two non zero numbers where both arguments are negative ', () => {
         expect(() => {
            TradeCalculator.calculatePercentChange(-10, -10);
         }).toThrowError('Value cannot be negative.');
      });
   });

   describe('calculatePositionSize() with cash account', () => {
      test('when all non zero non negative arguments', () => {
         const result = TradeCalculator.Cash.calculatePositionSize(2, 5, 1000);
         expect(result).toBe(400);
      });
      //
      test('when any and all arguments being zero', () => {
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(0, 0, 0);
         }).toThrowError('Value cannot be 0.');
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(2, 5, 0);
         }).toThrowError('Value cannot be 0.');
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(2, 0, 1000);
         }).toThrowError('Value cannot be 0.');
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(0, 5, 1000);
         }).toThrowError('Value cannot be 0.');
      });

      test('when any and all arguments as negative numbers', () => {
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(-1, -1, -1);
         }).toThrowError('Value cannot be negative.');
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(-1, 5, 1000);
         }).toThrowError('Value cannot be negative.');
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(2, -1, 1000);
         }).toThrowError('Value cannot be negative.');
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(2, 5, -1);
         }).toThrowError('Value cannot be negative.');
      });
   });
});
