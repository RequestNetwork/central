import * as React from 'react';
import { instanceCentralBank, Web3 } from './index';
import { Fields } from './components/Fields';

import {
  FormHeader,
  FormSection,
  Status,
  RequestLogo,
} from './components/Toolbox';

interface InputState {
  message: string;
}

export class Form extends React.Component<{}, InputState> {
  state = {
    message: '',
  };

  setMessage = (message: string) => this.setState({ message });

  sendTokens = async (amount: number, recipient: string) => {
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
    const { message } = this.state;
    return (
      <FormSection>
        <FormHeader>
          <RequestLogo />
        </FormHeader>
        <Status status={message}>{message}</Status>
        <Fields onSubmit={this.sendTokens} />
      </FormSection>
    );
  }
}
