'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

interface SubmitNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const SubmitNotificationModal: React.FC<SubmitNotificationModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleAccept = () => {
    router.push('/');
  };

  return (
    <Backdrop>
      <Modal>
        <button className="dismiss" onClick={onClose}>
          ×
        </button>
        <div className="header">
          <div className="image">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 7L9.00004 18L3.99994 13"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="content">
            <span className="title">{title}</span>
            <p className="message">{message}</p>
          </div>
          <div className="actions">
            <button className="accept" onClick={handleAccept}>
              Aceptar
            </button>
          </div>
        </div>
      </Modal>
    </Backdrop>
  );
};

export default SubmitNotificationModal;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 0.5rem;
  max-width: 320px;
  width: 100%;
  padding: 1.5rem;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);

  .dismiss {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: white;
    border: 2px solid #d1d5db;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: #ee0d0d;
      color: #fff;
      border-color: #ee0d0d;
    }
  }

  .header {
    text-align: center;
  }

  .image {
    background-color: #e2feee;
    width: 3rem;
    height: 3rem;
    border-radius: 9999px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    animation: animate 0.6s linear alternate-reverse infinite;

    svg {
      width: 2rem;
      height: 2rem;
      color: #0afa2a;
    }
  }

  .content {
    margin-top: 0.75rem;

    .title {
      color: #066e29;
      font-size: 1rem;
      font-weight: 600;
    }

    .message {
      margin-top: 0.5rem;
      color: #595b5f;
      font-size: 0.875rem;
    }
  }

  .actions {
    margin-top: 1rem;

    .accept {
      width: 100%;
      padding: 0.5rem 1rem;
      background-color: #1aa06d;
      color: #fff;
      font-weight: 500;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background-color: #fff;
        color: black;
        border: 1px solid #d1d5db;
      }
    }
  }

  @keyframes animate {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  }
`;
