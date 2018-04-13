import styled from 'styled-components';
// @ts-ignore
import logo from '../images/request-logo.png';

const blueCyan = '#5392ff';
const bluePurple = '#103b56';

export const StyledButton = styled.div`
  cursor: pointer;
  color: white;
  line-height: 3rem;
  margin-top: 1rem;
  width: 100%;
  text-align: center;
  font-size: 22px;
  background-color: ${blueCyan};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export const BlueBanner = styled.div`
  background: ${bluePurple};
  width: 100%;
  display: flex;
  color: white;
`;

export const H2 = styled.h2`
  font-weight: 500;
`;

export const RequestLogo = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-image: url(${logo});
  width: 4rem;
  background-size: contain;
  background-repeat: no-repeat;

`;

export const FormHeader = styled(BlueBanner)`
  padding-right: 2rem;
  padding-left: 2rem;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  height: 6rem;
  justify-content: center;
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const Footer = styled(BlueBanner)`
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 2rem;
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

export const Status = styled.div`
  min-height: 2rem;
`;

export const TextArea = styled.div`
  margin-bottom: 2rem;
`;
