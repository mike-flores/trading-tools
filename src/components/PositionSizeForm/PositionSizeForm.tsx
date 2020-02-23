import React, { useState } from 'react';
import { Form, SimpleItem, ButtonItem, RequiredRule } from 'devextreme-react/form';
import { NumberBox } from 'devextreme-react/number-box';
import { Card } from 'react-bootstrap';
import TradeCalculator from '../../helpers/tradeCalculator/TradeCalculator';

// eslint-disable-next-line import/no-unresolved
import './_positionSizeForm.scss';

const commonNumberOptions = {
   min: 0,

   valueChangeEvent: 'input'
};

const PositionSizeForm: React.FC = () => {
   const [positionSize, setPositionSize] = useState();

   const [tradeData] = useState({
      bankRoll: '',
      entryPrice: '',
      stopLoss: '',
      riskPercent: ''
   });

   const handleCalculate = (event: any): void => {
      const { bankRoll, entryPrice, stopLoss, riskPercent } = tradeData;
      console.log('the data', tradeData);
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
         console.log('size', size);
         setPositionSize(size);
         console.log('psize', positionSize);
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
                  format: { type: 'currency', currency: 'BTC', precision: 9 },

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
                  format: { type: 'currency', currency: 'USD', precision: 1 },

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
                  format: { type: 'currency', currency: 'USD', precision: 1 },

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
                  format: { type: 'percent', precision: 1 },
                  min: 0.01,
                  max: 1,
                  inputAttr: {
                     'data-testid': 'position-size-form__input-risk-percent',
                     placeholder: ''
                  }
               }}
            >
               <RequiredRule message='Risk percent is required.' />
            </SimpleItem>
            <ButtonItem
               buttonOptions={{
                  ...commonNumberOptions,
                  type: 'success',
                  text: 'Calculate',
                  onClick: handleCalculate,
                  // useSubmitBehavior: true,
                  elementAttr: {
                     'data-testid': 'position-size-form__button-calculate'
                  }
               }}
            />
         </Form>
         <Card id='position-size-form__results' bg='warning' text='white'>
            <Card.Header>Results</Card.Header>
            <Card.Body>
               Position Size:
               <NumberBox
                  format={{ type: 'currency', currency: 'BTC', precision: 9 }}
                  readOnly
                  value={positionSize}
                  style={{
                     background: 'transparent',
                     display: 'inline-block',
                     border: 'none',
                     color: 'white'
                  }}
               />
            </Card.Body>
         </Card>
      </>
   );
};

export default PositionSizeForm;
