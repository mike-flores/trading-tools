/**
 * Performs the calculations for determining a proper position size for a trade.
 */
export default class TradeCalculator {
   static Cash = {
      /**
       * @param {number} risk - The risk percent.
       * @param {number} percentChange - The percent change from entry to stop loss.
       * @param {number} bankRoll - The total amount in the trading account.
       * Returns the position size for a trade.
       */
      calculatePositionSize(risk: number, percentChange: number, bankRoll: number): number {
         if (risk === 0 || percentChange === 0 || bankRoll === 0)
            throw new Error('Value cannot be 0.');
         if (risk < 0 || percentChange < 0 || bankRoll <= 0)
            throw new Error('Value cannot be negative.');

         return (risk / percentChange) * bankRoll;
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
}
