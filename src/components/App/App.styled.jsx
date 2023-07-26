import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 0px 30px;
  padding-top: 50px;
`;

export const RequestError = styled.span`
  color: red;
`;

export const LoadingContainer = styled.div`
  display: flex;
  max-width: 350px;
  gap: 20px;
  align-items: center;
  align-content: flex-end;
`;

export const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;
