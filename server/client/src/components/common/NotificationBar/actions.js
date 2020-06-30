



export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  };
};
  
export const showErrorNotification = (message) => {
  console.log('Error Notificaiton');
  return {
    type: 'SHOW_NOTIFICATION',
    data: Object.assign({}, { message, type: 'Errors' }),
  };
};

export const showInfoNotification = (message) => {
  console.log('Info Notificaiton');
  return {
    type: 'SHOW_NOTIFICATION',
    data: Object.assign({}, { message, type: 'Info' }),
  };
};

export const showSuccessNotification = (message) => {
  console.log('Success Notificaiton');
  return {
    type: 'SHOW_NOTIFICATION',
    data: Object.assign({}, { message, type: 'Success' }),
  };
}

export const showWarningNotification = (message) => {
  console.log('Warning Notificaiton');
  return {
    type: 'SHOW_NOTIFICATION',
    data: Object.assign({}, { message, type: 'Warnings' }),
  };
}

