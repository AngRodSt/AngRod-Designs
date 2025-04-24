import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

const SubmitButton = ({
  text,
  props,
  className,
}: {
  text: string;
  className?: string;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) => {
  return (
    <StyledWrapper>
      <button
        className={clsx('button w-full uppercase mb-10', className)}
        {...props}
      >
        <span className="flex gap-5 justify-center items-center">
          <div
            className={`${props?.disabled === false ? 'hidden' : 'block'} sk-fading-circle`}
          >
            <div className="sk-circle1 sk-circle"></div>
            <div className="sk-circle2 sk-circle"></div>
            <div className="sk-circle3 sk-circle"></div>
            <div className="sk-circle4 sk-circle"></div>
            <div className="sk-circle5 sk-circle"></div>
            <div className="sk-circle6 sk-circle"></div>
            <div className="sk-circle7 sk-circle"></div>
            <div className="sk-circle8 sk-circle"></div>
            <div className="sk-circle9 sk-circle"></div>
            <div className="sk-circle10 sk-circle"></div>
            <div className="sk-circle11 sk-circle"></div>
            <div className="sk-circle12 sk-circle"></div>
          </div>
          {text}
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    padding: 15px 20px;
    border: none;
    outline: none;
    background-color: #f1ccae;
    color: black;
    border-radius: 7px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease-out;
  }

  .button:hover {
    transform: translateY(-3px);
    background-color: #3a0d0d;
    color: #ffff;
  }

  .button:disabled {
    background-color: #d3d3d3;
    color: #a9a9a9;
    cursor: not-allowed;
    transform: none;
  }
`;

export default SubmitButton;
