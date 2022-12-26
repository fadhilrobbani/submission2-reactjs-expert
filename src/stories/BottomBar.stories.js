import React from 'react';
import BottomBar from '../components/BottomBar';

const stories = {
  title: 'BottomBar',
  component: BottomBar,
};

export default stories;

const TemplateStory = (args) => <BottomBar {...args} />;
const withNotLogin = TemplateStory.bind({});
export { withNotLogin };
