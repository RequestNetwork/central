import styled from 'styled-components';
import Particles from 'react-particles-js';

const blueCyan = '#6CFDCC';
const bluePurple = '#5A89F9';

export const StyledButton = styled.div`
  cursor: pointer;
  color: white;
  border-radius: 1px;
  line-height: 3rem;
  margin-top: 1rem;
  width: 100%;
  text-align: center;
  font-size: 22px;
  font-family: helvetica;
  background-image: linear-gradient(to right, ${blueCyan}, ${bluePurple});
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export const FormHeader = styled.div`
  background: ${bluePurple};
  margin-bottom: 2rem;
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: helvetica;
  color: white;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.16), 0 1px 2px rgba(0, 0, 0, 0.23);
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ParticleBacground = styled(Particles)`
  background: linear-gradient(180deg, #0e638a, #1f364d);
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 2px;
  height: 40%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  width: 60%;
  min-width: 200px;
  overflow: hidden;
`;

export const inputStyles = {
  borderRadius: '2px',
  padding: '0.5rem',
  border: 'none',
  lineHeight: '2rem',
  margin: '1rem',
  width: '70%',
  backgroundColor: '#e2e1e0',
};

export const Status =  styled.div`
  min-height: 2rem;
`;
