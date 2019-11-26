import * as React from 'react';
import './index.css';
import { ethers } from 'ethers';
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

interface Ethereum extends ethers.providers.AsyncSendable {
  enable: () => Promise<void>;
}

interface Web3Window extends Window {
  ethereum: Ethereum;
}

declare let window: Web3Window;

let provider: ethers.providers.JsonRpcProvider;
const tokenAddress = '0x995d6a8c21f24be1dd04e105dd0d83758343e258';

interface State {
  isRinkeby: boolean;
  instanceCentralBank: ethers.Contract | null;
}

export class App extends React.Component<{}, State> {
  state = {
    isRinkeby: false,
    instanceCentralBank: null,
  };

  componentDidMount() {
    if (window.ethereum) {
      window.ethereum.enable().then(() => {
        // Ethereum user detected. You can now use the provider.
        provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        const instanceCentralBank = new ethers.Contract(
          tokenAddress,
          CentralBank.abi,
          signer
        );

        this.setState({ instanceCentralBank });

        provider.getNetwork().then(network => {
          if (network.chainId === 4) {
            this.setState({ isRinkeby: true });
          }
        });
      });
    }
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
          <Form instanceCentralBank={this.state.instanceCentralBank} />
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
