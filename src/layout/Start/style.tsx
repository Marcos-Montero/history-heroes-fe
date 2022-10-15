import styled from 'styled-components'

export const StartContainer = styled.div`
  width: 100%;
  max-width: 1080px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  animation: grow ease 0.6s;
  h1 {
    font-size: 50px;
    color: #ccc;
    margin: 10px;
  }
  @keyframes grow {
    0% {
      scale: 0;
    }
    70% {
      scale: 1.2;
    }
    100% {
      scale: 1;
    }
  }
`
export const FinalContainer = styled.div`
  width: 100%;
  max-width: 1080px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  animation: grow ease 0.6s;
  h1 {
    font-size: 50px;
    color: #ccc;
    margin: 10px;
  }
  @keyframes grow {
    0% {
      scale: 0;
    }
    70% {
      scale: 1.2;
    }
    100% {
      scale: 1;
    }
  }
`
export const PickableContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 0 14px #332;
  border-radius: 4px;
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  padding: 2em 0;
  max-height: 400px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
export const ConfirmButton = styled.button`
  padding: 20px;
  border-radius: 12px;
  transition: 0.3s;
  cursor: pointer;
  :hover {
    scale: 1.1;
  }
`
export const RandomButton = styled.button`
  background: linear-gradient(
    45deg,
    lightgray,
    pink,
    lightgray,
    pink,
    lightgray,
    pink,
    lightgray,
    pink,
    lightgray,
    pink,
    lightgray,
    pink
  );
  transition: 0.3s;
  padding: 10px;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    background: linear-gradient(
      90deg,
      pink,
      lightgray,
      pink,
      lightgray,
      pink,
      lightgray,
      pink,
      lightgray,
      pink,
      lightgray,
      pink,
      lightgray
    );
  }
`
export const StartButton = styled(ConfirmButton)`
  background: linear-gradient(orange, #ff8000);
`
export const ResetButton = styled(ConfirmButton)`
  background: linear-gradient(gray, white);
  font-size: 12px;
  padding: 5px;
`
export const FinalCardsContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 0 14px #332;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: no-wrap;
  padding: 2em;
`
