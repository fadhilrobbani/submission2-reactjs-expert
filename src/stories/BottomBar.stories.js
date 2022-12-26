import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BottomBar from '../components/BottomBar';

const stories = {
  title: 'BottomBar',
  component: BottomBar,
};

export default stories;

const TemplateStory = (args) => (
  <Router>
    <BottomBar {...args} />
  </Router>
);
const withNotLogin = TemplateStory.bind({});
withNotLogin.args = {
  onLogoutHandler: () => {},
  authUserId: '',
};
export { withNotLogin };
