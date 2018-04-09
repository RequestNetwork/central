import * as React from 'react';
import { render } from 'react-dom';
import { Form } from './Form';
import CentralBank from './abi';
import { Background } from './components/Toolbox';

export const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider);

export const instanceCentralBank = new web3.eth.Contract(
  CentralBank.abi,
  '0x995d6a8c21f24be1dd04e105dd0d83758343e258'
);

const App = () => (
  <Background>
    <Form />
  </Background>
);

render(<App />, document.getElementById('root'));
