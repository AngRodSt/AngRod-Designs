import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

const SubmitButton = ({
  text,
  props,
  className
}:{
  text:string,
  className?: string,
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>
}) => {
    
    return (
    <StyledWrapper>
      <button className={clsx("button w-full uppercase mb-10", className)} {...props}>
        {text}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    padding: 15px 20px;
    border: none;
    outline: none;
    background-color: #9c200d;
    color: #eee;
    border-radius: 7px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease-out;
  }

  .button:hover {
    transform: translateY(-3px);
  }

  `;

export default SubmitButton;