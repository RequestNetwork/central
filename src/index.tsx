import * as React from 'react';
import { render } from 'react-dom';
import { Form } from './Form';
import CentralBank from './abi';
import {
  Background,
  FormSection,
  FormHeader,
  TextArea,
  Footer,
} from './components/Toolbox';

export const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider);
const tokenAddress = '0x995d6a8c21f24be1dd04e105dd0d83758343e258';

export const instanceCentralBank = new web3.eth.Contract(
  CentralBank.abi,
  tokenAddress
);

interface State {
  isRinkeby: boolean;
}

export class App extends React.Component<{}, State> {
  state = {
    isRinkeby: false,
  };

  componentDidMount() {
    web3.eth.net.getId().then((networkId: number) => {
      if (networkId === 4) {
        this.setState({ isRinkeby: true });
      }
    });
  }

  render() {
    const { isRinkeby } = this.state;

    if (!isRinkeby) {
      return (
        <Background>
          <FormSection>
            <FormHeader>Rinkeby Testnet Only</FormHeader>
            <TextArea>Please set Metamask to use Rinkeby</TextArea>
          </FormSection>
        </Background>
      );
    }
    return (
      <>
        <Background>
          <Form />
        </Background>
        <Footer>
            <div>Token Address</div>
            <TextArea>{tokenAddress}</TextArea>
        </Footer>
      </>
    );
  }
}

render(<App />, document.getElementById('root'));
