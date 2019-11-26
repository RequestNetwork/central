import * as React from 'react';
import { ethers, utils } from 'ethers';
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

export class Form extends React.Component<
  { instanceCentralBank: ethers.Contract | null },
  InputState
> {
  state = {
    message: '',
  };

  setMessage = (message: string) => this.setState({ message });

  sendTokens = async (amount: number, recipient: string) => {
    this.setMessage('pending');
    if (!this.props.instanceCentralBank) {
      this.setMessage('Token contract not setup');
      return;
    }
    return await this.props.instanceCentralBank.functions
      .mint(utils.parseEther(amount.toString()))
      .then(() => this.setMessage('success'))
      .catch((e: Error) => this.setMessage(`failure: ${e}`));
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
