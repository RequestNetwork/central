import * as React from 'react';
import { instanceCentralBank, Web3 } from './index';
import {
  FormHeader,
  StyledButton,
  FormSection,
  inputStyles,
  Status,
} from './components/Toolbox';

interface InputState {
  amount: number;
  recipient: string;
  message: string;
}

export class Form extends React.Component<{}, InputState> {
  state = {
    amount: 0,
    recipient: '',
    message: '',
  };
  handleAmount = (event: React.FormEvent<HTMLInputElement>) =>
    this.setState({ amount: parseInt(event.currentTarget.value, 10) })

  handleRecipient = (event: React.FormEvent<HTMLInputElement>) =>
    this.setState({ recipient: event.currentTarget.value })

  handleOnClick = () =>
    this.sendTokens(this.state.amount, this.state.recipient)

  setMessage = (message: string) => this.setState({ message });

  async sendTokens(amount: number, recipient: string) {
    this.setMessage('pending');
    return await instanceCentralBank.methods
      .mint(Web3.utils.toWei(amount.toString(), 'ether'))
      .send({
        gas: 300000,
        from: recipient,
      })
      .then(() => this.setMessage('success'))
      .catch(() => this.setMessage('failure'));
  }

  render() {
    return (
      <FormSection>
        <FormHeader>
            <h2>Central Bank</h2>
      <Status> {this.state && this.state.message}</Status>
        </FormHeader>
        <input
          style={inputStyles}
          placeholder="Enter an amount to mint"
          type="number"
          onChange={this.handleAmount}
        />
        <input
          style={inputStyles}
          placeholder="Enter the address of the recipient"
          type="text"
          onChange={this.handleRecipient}
        />
        <StyledButton onClick={this.handleOnClick}>Send</StyledButton>
      </FormSection>
    );
  }
}
