import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const HeaderElement = styled.header`
  width: 100%;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  display: flex;
  gap: 20px;
  min-height: 30px;
  padding: 12px 24px;
  color: rgb(255, 255, 255);
  background-color: teal;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

export const Link = styled(NavLink)`
  display: flex;
  gap: 20px;
  text-decoration: none;
`;
