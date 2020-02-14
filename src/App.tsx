import React, { useState } from 'react';
import './App.css';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Form, { Item } from 'devextreme-react/form';
import { Button } from 'devextreme-react';

import { Container, Row, Col } from 'react-bootstrap';

// const validationRules = {
//    bankRoll: [{ type: 'required', message: 'Bankroll is required.' }],
//    'risk%': [{ type: 'required', message: 'Risk % is required.' }],
//    entryPrice: [{ type: 'required', messsage: 'Entry Price is required.' }],
//    stopLoss: [{ type: 'required', message: 'Stop Loss is required.' }],
//    targetPrice: [{ type: 'required', message: 'Target Price is required.' }]
// };

const getPercentDifference = (entryPrice: number, stopLoss: number) => {
   return ((entryPrice - stopLoss) / entryPrice) * 100;
};
const getPositionSize = (bankRoll: number, riskPercent: number, percentDifference: number) => {
   return (riskPercent / percentDifference) * bankRoll;
};

const App = () => {
   const tradeData = {
      bankRoll: '',
      tradeType: '',
      'risk%': '',
      entryPrice: '',
      stopLoss: '',
      targetPrice: ''
   };

   const [positionSize, setPositionSize] = useState(0);

   const handleClick = () => {
      const entry = parseInt(tradeData.entryPrice);
      const stop = parseInt(tradeData.stopLoss);

      const diff = getPercentDifference(entry, stop);

      const bRoll = parseInt(tradeData.bankRoll);
      const risk = parseInt(tradeData['risk%']);

      const size = getPositionSize(bRoll, risk, diff);
      setPositionSize(size);
   };
   return (
      <Container style={{ height: '100vh' }}>
         <Row style={{ alignItems: 'center', height: '100%' }}>
            <Col
               style={{
                  backgroundColor: 'rgba(0,0,0,.03)',
                  paddingTop: '15px'
               }}
               xs='12'
            >
               <Row>
                  <Col>
                     <Form formData={tradeData} labelLocation='top'>
                        <Item dataField='tradeType' disabled />
                        <Item dataField='bankRoll' />
                        <Item dataField='risk%' />
                        <Item dataField='entryPrice' />
                        <Item dataField='stopLoss' />
                        <Item dataField='targetPrice' disabled />

                        <div className='dx-fieldset'>
                           <Button id='button' text='Register' type='success' />
                        </div>
                     </Form>
                  </Col>
               </Row>
               <Row style={{ marginTop: '15px' }}>
                  <Col>
                     <div>
                        <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                           {`Position Size: ${positionSize}`}
                        </p>
                     </div>
                  </Col>
               </Row>
               <Row
                  style={{
                     justifyContent: 'flex-end',
                     marginTop: '15px',
                     marginBottom: '15px'
                  }}
               >
                  <Col xs='auto'>
                     <Button id='button' text='Calculate' type='success' onClick={handleClick} />
                  </Col>
               </Row>
            </Col>
         </Row>
      </Container>
   );
};

export default App;
