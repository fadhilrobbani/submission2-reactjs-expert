const ActionType = {
  SET_CATEGORIES: 'categories/set',
};

function setCategoriesActionCreator(category) {
  return {
    type: ActionType.SET_CATEGORIES,
    payload: {
      category,
    },
  };
}

export { ActionType, setCategoriesActionCreator };
