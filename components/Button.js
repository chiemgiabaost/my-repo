import styled, { css } from "styled-components";
import { primary } from "@/lib/colors";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease; /* Added transition */
  
  svg {
    height: 16px;
    margin-right: 5px;
  }

  ${props =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}

  ${props =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;

      &:hover {
        background-color: #f1f1f1; /* Slightly darker background on hover */
      }
    `}

  ${props =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;

      &:hover {
        background-color: #fff;
        color: #000;
      }
    `}

  ${props =>
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;

      &:hover {
        background-color: #333; /* Darker black on hover */
      }
    `}

  ${props =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;

      &:hover {
        background-color: #000;
        color: #fff;
      }
    `}

  ${props =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      border: 1px solid ${primary};
      color: #fff;

      &:hover {
        background-color: darken(${primary}, 10%); /* Slightly darker primary color on hover */
        transform: scale(1.05); /* Enlarges slightly */
      }

      &:active {
        transform: scale(0.95); /* Shrinks on click */
      }
    `}

  ${props =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid ${primary};
      color: ${primary};

      &:hover {
        background-color: ${primary};
        color: #fff;
      }
    `}

  ${props =>
    props.size === 'l' &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
