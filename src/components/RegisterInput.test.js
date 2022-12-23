import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RegisterInput from './RegisterInput';

describe('RegisterInput component', () => {
  it('should handle name typing correctly', () => {
    render(
      <Router>
        <RegisterInput onRegister={() => {}} />
      </Router>
    );
    const nameInput = screen.getByPlaceholderText('Your Name');
    userEvent.type(nameInput, 'kucingoren');
    expect(nameInput).toHaveValue('kucingoren');
  });
  it('should handle email typing correctly', () => {
    render(
      <Router>
        <RegisterInput onRegister={() => {}} />
      </Router>
    );
    const emailInput = screen.getByPlaceholderText('youremail@example.com');
    userEvent.type(emailInput, 'kucingoren@gmail.com');
    expect(emailInput).toHaveValue('kucingoren@gmail.com');
  });

  it('should handle password typing correctly', () => {
    render(
      <Router>
        <RegisterInput onRegister={() => {}} />
      </Router>
    );
    const passwordInput = screen.getByTestId('password');
    userEvent.type(passwordInput, 'kucingoren');
    expect(passwordInput).toHaveValue('kucingoren');
  });

  it.skip('should handle confirmPassword typing correctly', async () => {
    render(
      <Router>
        <RegisterInput onRegister={() => {}} />
      </Router>
    );
    const confirmPasswordInput = screen.getByTestId('confirmPassword');
    await userEvent.type(confirmPasswordInput, 'kucingoren');
    expect(confirmPasswordInput).toHaveValue('kucingoren');
  });

  it.skip('should call onRegister function when clicked', () => {
    const mockRegister = jest.fn();
    render(
      <Router>
        <RegisterInput onLogin={mockRegister} />
      </Router>
    );
    const nameInput = screen.getByPlaceholderText('Your Name');
    userEvent.type(nameInput, 'kucingoren');

    const emailInput = screen.getByPlaceholderText('youremail@example.com');
    userEvent.type(emailInput, 'kucingoren@gmail.com');

    const passwordInput = screen.getByTestId('password');
    userEvent.type(passwordInput, 'kucingoren');

    const confirmPasswordInput = screen.getByTestId('confirmPassword');
    userEvent.type(confirmPasswordInput, 'kucingoren');

    const registerButton = screen.getByRole('button', { name: 'Register' });
    userEvent.click(registerButton);

    expect(mockRegister).toBeCalledWith({
      name: 'kucingoren',
      email: 'kucingoren@gmail.com',
      password: 'kucingoren',
    });
  });
});
