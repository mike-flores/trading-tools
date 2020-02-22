import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import PositionSizeForm from '../PositionSizeForm';

describe('PositionSizeForm', () => {
   let wrapper;

   const risk = {
      MIN: '1',
      MAX: '100'
   };

   const positionSizeOutput = 'position-size-form__output-position-size';

   const tradeOutputs = [positionSizeOutput];

   const buttonCalculate = 'position-size-form__button-calculate';

   const inputBankRoll = 'position-size-form__input-bankroll';
   const inputEntryPrice = 'position-size-form__input-entry-price';
   const inputStopLoss = 'position-size-form__input-stop-loss';
   const inputRiskPercent = 'position-size-form__input-risk-percent';

   const numberInputs = [inputBankRoll, inputEntryPrice, inputStopLoss, inputRiskPercent];
   const inputs = [...numberInputs];

   it('renders without crashing', () => {
      const container = document.createElement('div');
      act(() => {
         ReactDOM.render(<PositionSizeForm />, container);
      });
   });

   describe('when the component first renders', () => {
      beforeEach(() => {
         act(() => {
            wrapper = render(<PositionSizeForm />);
         });
      });
      afterEach(cleanup);

      it('should have empty input fields', () => {
         inputs.forEach(element => {
            expect(wrapper.getByTestId(element)).toHaveAttribute('aria-valuenow', '');
         });
      });
   });

   describe('NumberBoxes', () => {
      describe('when a number greater than zero is entered into a numberbox', () => {
         beforeEach(() => {
            act(() => {
               wrapper = render(<PositionSizeForm />);
               numberInputs.forEach(element => {
                  userEvent.type(wrapper.getByTestId(element), '98');
               });
            });
         });
         afterEach(cleanup);

         it('should update the value in numberbox', () => {
            inputs.forEach(element => {
               expect(wrapper.getByTestId(element)).toHaveAttribute('aria-valuenow', '98');
            });
         });
      });

      describe('when a number less than or equal to zero is entered into a numberbox', () => {
         beforeEach(() => {
            act(() => {
               wrapper = render(<PositionSizeForm />);
               numberInputs.forEach(element => {
                  userEvent.type(wrapper.getByTestId(element), '-123');
               });
            });
         });
         afterEach(cleanup);

         it('should default the value to the min but it really does not allow a negative input so it would be blank in the numberbox', () => {
            // setting the value behind the scenes causes the component to set a
            // negative number to the min, but in the actual interface, a negative number isn't even typable.
            numberInputs.forEach(element => {
               expect(wrapper.getByTestId(element)).toHaveAttribute('aria-valuenow', '1');
            });
         });
      });

      describe('when a non-number is entered into a numberbox', () => {
         beforeEach(() => {
            act(() => {
               wrapper = render(<PositionSizeForm />);
            });
            numberInputs.forEach(element => {
               userEvent.type(wrapper.getByTestId(element), 'Hello World!');
            });
         });
         afterEach(cleanup);
         it('should not update the value', () => {
            numberInputs.forEach(element => {
               expect(wrapper.getByTestId(element)).toHaveAttribute('aria-valuenow', '');
            });
         });
      });

      describe('when a number greater than 100 is entered into the risk numberbox', () => {
         beforeEach(() => {
            act(() => {
               wrapper = render(<PositionSizeForm />);
               userEvent.type(wrapper.getByTestId(inputRiskPercent), '200');
            });
         });
         afterEach(cleanup);
         it('should default the value to max', () => {
            expect(wrapper.getByTestId(inputRiskPercent)).toHaveAttribute(
               'aria-valuenow',
               risk.MAX
            );
         });
      });
   });

   describe('when the calculate button is clicked and there are empty required fields', () => {
      beforeEach(() => {
         act(() => {
            wrapper = render(<PositionSizeForm />);
            userEvent.click(wrapper.getByTestId(buttonCalculate));
         });
      });
      afterEach(cleanup);

      it('should show validation errors on the empty required fields', async () => {
         await wait(() => expect(wrapper.getByText('Bank roll is required.')).toBeInTheDocument());
         await wait(() =>
            expect(wrapper.getByText('Entry price is required.')).toBeInTheDocument()
         );
         await wait(() => expect(wrapper.getByText('Stop loss is required.')).toBeInTheDocument());
         await wait(() =>
            expect(wrapper.getByText('Risk percent is required.')).toBeInTheDocument()
         );
      });

      it('should show no values for the outputs in the trade calculation results', () => {
         tradeOutputs.forEach(element => {
            expect(wrapper.getByTestId(element)).toHaveTextContent('');
         });
      });
   });

   describe('when the calculate button is clicked and all the required fields are valid', () => {
      beforeEach(() => {
         act(() => {
            wrapper = render(<PositionSizeForm />);
            userEvent.type(wrapper.getByTestId(inputBankRoll), '1000');

            userEvent.type(wrapper.getByTestId(inputEntryPrice), '100');
            userEvent.type(wrapper.getByTestId(inputStopLoss), '95');
            userEvent.type(wrapper.getByTestId(inputRiskPercent), '2');
            userEvent.click(wrapper.getByTestId(buttonCalculate));
         });
      });
      afterEach(cleanup);

      it('should show the position size output result', async () => {
         expect(wrapper.getByTestId(positionSizeOutput)).toHaveTextContent('400');
      });
      it('should retain the values in the fields', () => {
         expect(wrapper.getByTestId(inputBankRoll)).toHaveAttribute('aria-valuenow', '1000');
         expect(wrapper.getByTestId(inputEntryPrice)).toHaveAttribute('aria-valuenow', '100');
         expect(wrapper.getByTestId(inputStopLoss)).toHaveAttribute('aria-valuenow', '95');
         expect(wrapper.getByTestId(inputRiskPercent)).toHaveAttribute('aria-valuenow', '2');
      });
   });
});
