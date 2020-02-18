import React, { useState } from 'react';
import { Form, SimpleItem, ButtonItem, RequiredRule } from 'devextreme-react/form';
import { Card } from 'react-bootstrap';
// import { calculatePercentChange, calculatePositionSize } from '../../helpers/tradeCalculator';

// eslint-disable-next-line import/no-unresolved
import './_positionSizeForm.scss';

const commonNumberOptions = {
   min: 1,
   mode: 'number',
   format: '#',
   valueChangeEvent: 'keyup'
};

const PositionSizeForm: React.FC = () => {
   const [entryPrice, setEntryPrice] = useState<number | null>(null);
   const [stopLoss, setStopLoss] = useState<number | null>(null);
   const [riskPercent, setRiskPercent] = useState<number | null>(null);
   const [positionSize] = useState<number | null>(null);

   return (
      <>
         <Form labelLocation='top' id='position-size-form__form'>
            <SimpleItem
               dataField='Entry Price'
               editorType='dxNumberBox'
               editorOptions={{
                  ...commonNumberOptions,
                  inputAttr: {
                     'data-testid': 'position-size-form__input-entry-price'
                  },
                  value: entryPrice,
                  onValueChanged: (event: any) => setEntryPrice(event.value)
               }}
            >
               <RequiredRule message='Entry price is required.' />
            </SimpleItem>
            <SimpleItem
               dataField='Stop Loss'
               editorType='dxNumberBox'
               editorOptions={{
                  ...commonNumberOptions,
                  inputAttr: {
                     'data-testid': 'position-size-form__input-stop-loss'
                  },
                  value: stopLoss,
                  onValueChanged: (event: any) => setStopLoss(event.value)
               }}
            >
               <RequiredRule message='Stop loss is required.' />
            </SimpleItem>
            <SimpleItem
               dataField='Risk %'
               editorType='dxNumberBox'
               editorOptions={{
                  ...commonNumberOptions,
                  inputAttr: {
                     'data-testid': 'position-size-form__input-risk-percent'
                  },
                  value: riskPercent,
                  onValueChanged: (event: any) => setRiskPercent(event.value),
                  max: 100
               }}
            >
               <RequiredRule message='Risk % is required.' />
            </SimpleItem>
            <ButtonItem
               buttonOptions={{
                  text: 'Calculate',
                  type: 'success',
                  useSubmitBehavior: true,
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
