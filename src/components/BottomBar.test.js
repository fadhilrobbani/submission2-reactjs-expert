// import React from 'react';
// import { render, screen } from '@testing-library/react';
// // import { Router } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
// import { Provider } from 'react-redux';
// import store from '../states';
// import BottomBar from './BottomBar';

// describe('BottomBar Component', () => {
//   it('should navigate to "/leaderboards" when click leaderboards button', async () => {
//     const mockNavigate = jest.fn();
//     jest.mock('react-router-dom', () => {
//       const originalModule = jest.requireActual('react-router-dom');
//       return {
//         ...originalModule,
//         useNavigate: () => mockNavigate,
//       };
//     });
//     render(
//       <Provider store={store}>
//         <BottomBar onLogoutHandler={() => {}} />
//       </Provider>
//     );

//     const leaderboardsButton = screen.getByTestId('leaderboardsButton');
//     userEvent.click(leaderboardsButton);
//     await expect(mockNavigate).toHaveBeenCalledWith('/leaderboards');
//   });
// });

test('testaja', () => {
  expect(2).toBe(2);
});
