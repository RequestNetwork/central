import * as React from 'react';
import { instanceCentralBank, Web3 } from './index';
import { FormHeader, StyledButton, FormSection, StyledInput } from './components/Toolbox';

interface InputState {
  amount: number;
  recipient: string;
  message: string;
}

class Form extends React.Component<_, State> {
  state = {
    amount: 0,
    recipient: '',
    message: ''
  };
  handleAmount = ({ target: { value } }) => this.setState({ amount: value });

  handleRecipient = ({ target: { value } }) =>
    this.setState({ recipient: value });

  handleOnClick = () =>
    this.sendTokens(this.state.amount, this.state.recipient);

  setMessage = message => this.setState({ message });

  async sendTokens(amount, recipient) {
    this.setMessage('pending');
    return await instanceCentralBank.methods
      .mint(Web3.utils.toWei(amount.toString(), 'ether'))
      .send({
        gas: 300000,
        from: recipient
      })
      .then(() => this.setMessage('success'))
      .catch(() => this.setMessage('failure'));
  }

  render() {
    return (
      <FormSection>
        <FormHeader>
          <h2>Central Bank</h2>
        </FormHeader>
        <StyledInput
          placeholder="Amount"
          type="number"
          onChange={this.handleAmount}
        />
        <StyledInput
          placeholder="Recipient"
          type="text"
          onChange={this.handleRecipient}
        />
        <StyledButton onClick={this.handleOnClick}>Send</StyledButton>
        <div>{this.state && this.state.message}</div>
      </FormSection>
    );
  }
}

export default Form;
