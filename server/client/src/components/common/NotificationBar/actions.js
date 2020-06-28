

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  };
};
  
export const showErrorNotification = (message) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: Object.assign({}, { message, type: 'error' }),
  };
};

export const showInfoNotification = (message) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: Object.assign({}, { message, type: 'info' }),
  };
};


