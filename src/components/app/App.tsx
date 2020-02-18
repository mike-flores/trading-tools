import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PositionSizeForm from '../PositionSizeForm/PositionSizeForm';

const App: React.FC = () => {
   return (
      <Container>
         <Row>
            <Col xs={12}>
               <PositionSizeForm />
            </Col>
         </Row>
      </Container>
   );
};

export default App;
