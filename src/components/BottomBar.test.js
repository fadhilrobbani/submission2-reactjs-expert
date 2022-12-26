import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import BottomBar from './BottomBar';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('BottomBar Component', () => {
  it('home button should be enabled and call hooks navigate to "/" when clicked', () => {
    render(
      <Router>
        <BottomBar onLogoutHandler={() => {}} />
      </Router>
    );
    const homeButton = screen.getByTestId('homeButton');
    expect(homeButton).toBeEnabled();
    expect(homeButton).toBeVisible();
    expect(homeButton.textContent).toBe('Home');
    userEvent.click(homeButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });

  it('leaderboards button should be enabled and call hooks navigate to "/leaderboards" when clicked', () => {
    render(
      <Router>
        <BottomBar onLogoutHandler={() => {}} authUserId="" />
      </Router>
    );
    const leaderboardsButton = screen.getByTestId('leaderboardsButton');
    expect(leaderboardsButton).toBeEnabled();
    expect(leaderboardsButton).toBeVisible();
    expect(leaderboardsButton.textContent).toBe('Leaderboards');
    userEvent.click(leaderboardsButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/leaderboards');
  });

  it('login button should be enabled and call hooks navigate to "/login" when clicked if user not login', () => {
    render(
      <Router>
        <BottomBar onLogoutHandler={() => {}} authUserId="" />
      </Router>
    );
    const loginButton = screen.getByTestId('loginOrLogoutButton');
    expect(loginButton).toBeEnabled();
    expect(loginButton).toBeVisible();
    expect(loginButton.textContent).toBe('Login');
    userEvent.click(loginButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
  });

  it('logout button should be enabled and call hooks navigate to "/login" when clicked if user already login', () => {
    const onLogoutHandler = jest.fn();
    render(
      <Router>
        <BottomBar onLogoutHandler={onLogoutHandler} authUserId="users-1" />
      </Router>
    );
    const logoutButton = screen.getByTestId('loginOrLogoutButton');
    expect(logoutButton).toBeEnabled();
    expect(logoutButton).toBeVisible();
    expect(logoutButton.textContent).toBe('Logout');
    userEvent.click(logoutButton);
    expect(onLogoutHandler).toHaveBeenCalled();
  });
});
