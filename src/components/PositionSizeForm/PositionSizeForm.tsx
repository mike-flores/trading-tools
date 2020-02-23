import React, { useState } from 'react';
import { Form, SimpleItem, ButtonItem, RequiredRule } from 'devextreme-react/form';
import { NumberBox } from 'devextreme-react/number-box';
import { TextBox } from 'devextreme-react/text-box';
import { Card } from 'react-bootstrap';
import TradeCalculator from '../../helpers/tradeCalculator/TradeCalculator';
import './_positionSizeForm.scss';

const commonNumberOptions = {
   mode: 'text',
   valueChangeEvent: 'input',
   min: 0
};

const PositionSizeForm: React.FC = () => {
   const [positionSize, setPositionSize] = useState();
   const [riskReward, setRiskReward] = useState('');
   const [tradeData] = useState({
      bankRoll: '',
      entryPrice: '',
      stopLoss: '',
      riskPercent: '',
      target: ''
   });

   const handleCalculate = (event: any): void => {
      const { bankRoll, entryPrice, stopLoss, riskPercent, target } = tradeData;
      const result = event.validationGroup.validate();
      if (result.isValid) {
         const change = TradeCalculator.calculatePercentChange(
            parseInt(entryPrice),
            parseInt(stopLoss)
         );
         const size = TradeCalculator.Cash.calculatePositionSize(
            parseFloat(riskPercent).toFixed(2),
            change,
            parseFloat(bankRoll)
         );
         setPositionSize(size);

         const riskToReward = TradeCalculator.calculateRiskReward(
            parseFloat(entryPrice),
            parseFloat(stopLoss),
            parseFloat(target)
         );
         setRiskReward(`1:${riskToReward.toFixed(2)}`);
      }
   };

   return (
      <>
         <Form id='position-size-form__form' formData={tradeData}>
            <SimpleItem
               dataField='bankRoll'
               editorType='dxNumberBox'
               editorOptions={{
                  ...commonNumberOptions,

                  format: {
                     type: 'currency',
                     //                    style: 'decimal',
                     currency: 'BTC',
                     precision: 6
                  },
                  inputAttr: {
                     'data-testid': 'position-size-form__input-bankroll'
                  }
               }}
            >
               <RequiredRule message='Bank roll is required.' />
            </SimpleItem>
            <SimpleItem
               dataField='entryPrice'
               editorType='dxNumberBox'
               editorOptions={{
                  ...commonNumberOptions,
                  format: {
                     type: 'currency',
                     currency: 'USD',
                     precision: 2
                     // allowGrouping: 'false'
                  },

                  defaultValue: 200,
                  inputAttr: {
                     'data-testid': 'position-size-form__input-entry-price'
                  }
               }}
            >
               <RequiredRule message='Entry price is required.' />
            </SimpleItem>
            <SimpleItem
               dataField='stopLoss'
               editorType='dxNumberBox'
               editorOptions={{
                  ...commonNumberOptions,
                  format: { type: 'currency', currency: 'USD', precision: 2 },

                  inputAttr: {
                     'data-testid': 'position-size-form__input-stop-loss'
                  }
               }}
            >
               <RequiredRule message='Stop loss is required.' />
            </SimpleItem>
            <SimpleItem
               dataField='riskPercent'
               editorType='dxNumberBox'
               editorOptions={{
                  ...commonNumberOptions,
                  format: { type: 'percent', precision: 2 },
                  min: 0.01,
                  max: 1,
                  inputAttr: {
                     'data-testid': 'position-size-form__input-risk-percent'
                  }
               }}
            >
               <RequiredRule message='Risk percent is required.' />
            </SimpleItem>
            <SimpleItem
               dataField='target'
               editorType='dxNumberBox'
               editorOptions={{
                  ...commonNumberOptions,
                  format: { type: 'currency', currency: 'USD', precision: 2 },

                  inputAttr: {
                     'data-testid': 'position-size-form__input-target'
                  }
               }}
            />
            <ButtonItem
               buttonOptions={{
                  ...commonNumberOptions,
                  type: 'success',
                  text: 'Calculate',
                  onClick: handleCalculate,
                  elementAttr: {
                     'data-testid': 'position-size-form__button-calculate'
                  }
               }}
            />
         </Form>
         <Card
            data-testid='position-size-form__results-panel'
            id='position-size-form__results'
            bg='warning'
            text='white'
         >
            <Card.Header>Results</Card.Header>
            <Card.Body>
               <div>
                  Position Size:
                  <NumberBox
                     format={{ type: 'currency', currency: 'BTC', precision: 9 }}
                     readOnly
                     value={positionSize}
                     inputAttr={{ 'data-testid': 'position-size-form__output-position-size' }}
                     style={{
                        background: 'transparent',
                        display: 'inline-block',
                        border: 'none',
                        color: 'white'
                     }}
                  />
               </div>
               <div>
                  Risk/Reward:
                  <TextBox
                     readOnly
                     value={riskReward}
                     inputAttr={{ 'data-testid': 'position-size-form__output-risk-reward' }}
                     style={{
                        background: 'transparent',
                        display: 'inline-block',
                        border: 'none',
                        color: 'white'
                     }}
                  />
               </div>
            </Card.Body>
         </Card>
      </>
   );
};

export default PositionSizeForm;
