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
    const emailInput = screen.getByPlaceholderText('youremail@example.com');
    userEvent.type(emailInput, 'kucingoren@gmail.com');
    expect(emailInput).toHaveValue('kucingoren@gmail.com');
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

  it('should call onLogin function when clicked', () => {
    const mockLogin = jest.fn();
    render(
      <Router>
        <LoginInput onLogin={mockLogin} />
      </Router>
    );
    const emailInput = screen.getByPlaceholderText('youremail@example.com');
    userEvent.type(emailInput, 'kucingoren@gmail.com');
    const passwordInput = screen.getByPlaceholderText('******');
    userEvent.type(passwordInput, 'dummypassword');
    expect(passwordInput).toHaveValue('dummypassword');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    userEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith({
      email: 'kucingoren@gmail.com',
      password: 'dummypassword',
    });
  });
});
