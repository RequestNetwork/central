import * as React from 'react';
import { inputStyles, buttonStyles } from './Toolbox';
import { Formik } from 'formik';

interface Props {
  onSubmit: (amount: number, recipient: string) => void;
}

export class Fields extends React.Component<Props> {
  render() {
    const { onSubmit } = this.props;
    return (
      <Formik
        initialValues={{ amount: 0, recipient: '' }}
        onSubmit={({ amount, recipient }) => onSubmit(amount, recipient)}
        render={({ values, handleChange, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <input
              style={inputStyles}
              placeholder="Enter an amount to mint"
              name="amount"
              type="number"
              onChange={handleChange}
            />
            <input
              style={inputStyles}
              placeholder="Enter the address of the recipient"
              name="recipient"
              type="text"
              onChange={handleChange}
            />
            <button style={buttonStyles} type="submit">
              Send
            </button>
          </form>
        )}
      />
    );
  }
}
