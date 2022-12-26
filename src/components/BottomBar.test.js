import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import BottomBar from './BottomBar';
import authUserReducer from '../states/authUser/reducer';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
let store;

describe('BottomBar Component', () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        authUser: authUserReducer,
      },
    });
  });
  it('home button should be enabled and call hooks navigate to "/" when clicked', () => {
    render(
      <Provider store={store}>
        <Router>
          <BottomBar onLogoutHandler={() => {}} />
        </Router>
      </Provider>
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
      <Provider store={store}>
        <Router>
          <BottomBar onLogoutHandler={() => {}} />
        </Router>
      </Provider>
    );
    const leaderboardsButton = screen.getByTestId('leaderboardsButton');
    expect(leaderboardsButton).toBeEnabled();
    expect(leaderboardsButton).toBeVisible();
    expect(leaderboardsButton.textContent).toBe('Leaderboards');
    userEvent.click(leaderboardsButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/leaderboards');
  });

  it('login button should be enabled and call hooks navigate to "/login" when clicked if authUser is empty or null', () => {
    render(
      <Provider store={store}>
        <Router>
          <BottomBar onLogoutHandler={() => {}} />
        </Router>
      </Provider>
    );
    const loginButton = screen.getByTestId('loginOrLogoutButton');
    expect(loginButton).toBeEnabled();
    expect(loginButton).toBeVisible();
    expect(loginButton.textContent).toBe('Login');
    userEvent.click(loginButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
  });

  it.skip('logout button should be enabled and call hooks navigate to "/login" when clicked if user already login', () => {
    const onLogoutHandler = jest.fn();
    render(
      <Provider store={store}>
        <Router>
          <BottomBar onLogoutHandler={onLogoutHandler} />
        </Router>
      </Provider>
    );
    const logoutButton = screen.getByTestId('loginOrLogoutButton');
    expect(logoutButton).toBeEnabled();
    expect(logoutButton).toBeVisible();
    expect(logoutButton.textContent).toBe('Login');
    userEvent.click(logoutButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
  });
});
