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

   describe('calculateRiskReward()', () => {
      test('when arguments are all non zero non negative', () => {
         const result = TradeCalculator.calculateRiskReward(100, 95, 110);
         expect(result).toBe(2);
      });
      test('when any and all arguments being zero', () => {
         expect(() => {
            TradeCalculator.calculateRiskReward(0, 0, 0);
         }).toThrowError('Entry price cannot be 0.');
         expect(() => {
            TradeCalculator.calculateRiskReward(0, 95, 110);
         }).toThrowError('Entry pice cannot be 0.');
         expect(() => {
            TradeCalculator.calculateRiskReward(100, 0, 110);
         }).toThrowError('Stop loss cannnot be 0.');
         expect(() => {
            TradeCalculator.calculateRiskReward(100, 95, 0);
         }).toThrowError('Target cannot be 0.');
      });

      test('when any and all arguments as negative numbers', () => {
         expect(() => {
            TradeCalculator.calculateRiskReward(-1, -1, -1);
         }).toThrowError('Entry price cannot be negative.');
         expect(() => {
            TradeCalculator.calculateRiskReward(-1, 95, 110);
         }).toThrowError('Entry price cannot be negative.');
         expect(() => {
            TradeCalculator.calculateRiskReward(100, -1, 110);
         }).toThrowError('Stop loss cannot be negative.');
         expect(() => {
            TradeCalculator.calculateRiskReward(100, 95, -1);
         }).toThrowError('Target cannot be negative.');
      });
   });

   describe('calculatePositionSize() with cash account', () => {
      test('when arguments are all non zero non negative', () => {
         const result = TradeCalculator.Cash.calculatePositionSize(0.02, 5, 1000);
         expect(result).toBe(400);
      });
      //
      test('when any and all arguments being zero', () => {
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(0, 0, 0);
         }).toThrowError('Risk cannot be 0.');
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(0.02, 5, 0);
         }).toThrowError('Bank roll cannot be 0.');
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(0.02, 0, 1000);
         }).toThrowError('Percent change cannot be 0.');
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(0, 5, 1000);
         }).toThrowError('Risk cannot be 0.');
      });

      test('when any and all arguments as negative numbers', () => {
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(-1, -1, -1);
         }).toThrowError('Risk cannot be negative.');
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(-1, 5, 1000);
         }).toThrowError('Risk cannot be negative.');
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(2, -1, 1000);
         }).toThrowError('Percent change cannot be negative.');
         expect(() => {
            TradeCalculator.Cash.calculatePositionSize(2, 5, -1);
         }).toThrowError('Bank roll cannot be negative.');
      });
   });
});
