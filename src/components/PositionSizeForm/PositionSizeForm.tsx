import React, { useState } from 'react';
import { Form, SimpleItem, ButtonItem, RequiredRule } from 'devextreme-react/form';
import { Button, NumberBox, Validator } from 'devextreme-react';
import ValidationGroup from 'devextreme-react/validation-group';
import { Card } from 'react-bootstrap';
import TradeCalculator from '../../helpers/tradeCalculator/TradeCalculator';

// eslint-disable-next-line import/no-unresolved
import './_positionSizeForm.scss';

const commonNumberOptions = {
   min: 1,
   mode: 'number',
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

      const result = event.validationGroup.validate();
      if (result.isValid) {
         const change = TradeCalculator.calculatePercentChange(
            parseInt(entryPrice),
            parseInt(stopLoss)
         );
         const size = TradeCalculator.Cash.calculatePositionSize(
            parseInt(riskPercent),
            change,
            parseInt(bankRoll)
         );
         setPositionSize(size);
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
                  defaultValue: 11,
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
                  max: 100,
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
               <p>
                  Position Size:
                  <span data-testid='position-size-form__output-position-size'>{positionSize}</span>
               </p>
            </Card.Body>
         </Card>
      </>
   );
};

export default PositionSizeForm;
