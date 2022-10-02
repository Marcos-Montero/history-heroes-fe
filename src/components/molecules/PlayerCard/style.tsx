import styled from 'styled-components'
import { p1Color, p2Color } from '../../../constants/board'

export const PlayerCardContainer = styled.div<{ p: 1 | 2; enabled: boolean }>`
  height: 100px;
  width: 400px;
  padding: 8px;
  margin: 16px 0;
  border-radius: 8px;
  border: 2px white solid;
  align-self: ${(props) => (props.p === 1 ? 'flex-start' : 'flex-end')};
  background: ${(props) => (props.p === 1 ? p1Color : p2Color)};
  display: flex;
  flex-direction: ${(props) => (props.p === 1 ? 'auto' : 'row-reverse')};
  justify-content: space-evenly;
  align-items: center;
  filter: ${(props) => (props.enabled ? 'none' : 'brightness(0.2)')};
`
export const ButtonEndTurn = styled.button<{ show: boolean }>`
  opacity: ${(props) => (props.show ? 1 : 0)};
  padding: 16px;
  outline: none;
  border: none;
  font-size: 16px;
  border-radius: 16px;
  background: linear-gradient(40deg, orange, yellow, orange);
  transition-duration: 0.3s;
  cursor: pointer;
  box-shadow: 2px 2px 10px black;
  :hover {
    transform: scale(1.05);
  }
`
