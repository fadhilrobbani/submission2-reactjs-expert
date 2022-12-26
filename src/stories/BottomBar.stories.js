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
const onUserLoggedIn = TemplateStory.bind({});
onUserLoggedIn.args = {
  authUserId: '',
};

const onUserNotLoggedIn = TemplateStory.bind({});
onUserNotLoggedIn.args = {
  authUserId: 'users-2',
};
export { onUserLoggedIn, onUserNotLoggedIn };
