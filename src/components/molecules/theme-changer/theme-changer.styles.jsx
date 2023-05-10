import styled from 'styled-components'

export const ThemeChangeButton = styled.div`
  margin-left: 30px;
  .checkbox {
    opacity: 0;
    position: absolute;
  }

  .label {
    background-color: ${({ theme }) => theme.oppositeBackground};
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    position: relative;
    height: 26px;
    width: 50px;
    transform: scale(1.5);
  }

  .label .ball {
    background-color: ${({ theme }) => theme.lightBackground};
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    height: 22px;
    width: 22px;
    transform: translateX(0px);
    transition: transform 0.2s linear;
  }

  .checkbox:checked + .label .ball {
    transform: translateX(24px);
  }

  .fa-moon {
    color: #f39c12;
  }

  .fa-sun {
    color: #f1c40f;
  }
`
