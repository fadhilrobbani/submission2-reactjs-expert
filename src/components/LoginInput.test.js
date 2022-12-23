import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
  it('should handle email typing correctly', () => {
    render(
      <Router>
        <LoginInput onLogin={() => {}} />
      </Router>
    );
    const usernameInput = screen.getByPlaceholderText('youremail@example.com');
    userEvent.type(usernameInput, 'kucingoren@gmail.com');
    expect(usernameInput).toHaveValue('kucingoren@gmail.com');
  });

  it('should handle password typing correctly', () => {
    render(
      <Router>
        <LoginInput onLogin={() => {}} />
      </Router>
    );
    const passwordInput = screen.getByPlaceholderText('******');
    userEvent.type(passwordInput, 'dummypassword');
    expect(passwordInput).toHaveValue('dummypassword');
  });
});
