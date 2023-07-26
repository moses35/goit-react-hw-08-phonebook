import styled from '@emotion/styled';
import { Button as Submit } from '@chakra-ui/react';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 250px;
  gap: 10px;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 11px;
`;

export const Button = styled(Submit)`
  margin-left: 0px;
  margin-top: 10px;
`;
