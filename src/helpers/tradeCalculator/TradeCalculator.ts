/**
 * Performs the calculations for determining a proper position size for a trade.
 */
export default class TradeCalculator {
   static Cash = {
      /**
       * @param {number} risk - The risk percent as a decimal.
       * @param {number} percentChange - The percent change from entry to stop loss.
       * @param {number} bankRoll - The total amount in the trading account.
       * Returns the position size for a trade.
       */
      calculatePositionSize(risk: any, percentChange: number, bankRoll: number): number {
         if (risk === 0) throw new Error(`Risk cannot be 0.`);
         if (percentChange === 0) throw new Error(`Percent change cannot be 0.`);
         if (bankRoll === 0) throw new Error(`Bank roll cannot be 0.`);
         if (risk < 0) throw new Error('Risk cannot be negative.');
         if (percentChange < 0) throw new Error('Percent change cannot be negative.');
         if (bankRoll < 0) throw new Error('Bank roll cannot be negative.');

         return ((risk * 100) / percentChange) * bankRoll;
      }
   };

   /**
    * @param {number} entry - The entry price of the trade.
    * @param {numbet} stopLoss - The stop loss of the trade.
    * Returns the percent change from the entry price to the stop loss price.
    */
   static calculatePercentChange = (entry: number, stopLoss: number): number => {
      if (entry === 0 || stopLoss === 0) throw new Error('Value cannot be 0.');
      if (entry < 0 || stopLoss < 0) throw new Error('Value cannot be negative.');

      if (stopLoss > entry) return ((stopLoss - entry) / stopLoss) * 100;

      return ((entry - stopLoss) / entry) * 100;
   };

   static calculateRiskReward = (entry: number, stopLoss: number, target: number): number => {
      if (entry === 0) throw new Error(`Entry pricr cannot be 0.`);
      if (stopLoss === 0) throw new Error(`stop loss change cannot be 0.`);
      if (target === 0) throw new Error(`target cannot be 0.`);
      if (entry < 0) throw new Error('Entry price cannot be negative.');
      if (stopLoss < 0) throw new Error('Stop loss cannot be negative.');
      if (target < 0) throw new Error('target cannot be negative.');

      return (target - entry) / (entry - stopLoss);
   };
}
