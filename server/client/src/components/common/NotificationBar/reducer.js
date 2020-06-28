
const notificationInitState = {
  isNotificationVisible: false,
  message: '',
  type: '',
};
  
export const notification = (state = notificationInitState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION': {
      return Object.assign({}, state, {
        isNotificationVisible: true,
        message: action.data.message,
        type: action.data.type
      });
    }
    case 'HIDE_NOTIFICATION':
      return Object.assign({}, state, {
        isNotificationVisible: false,
        message: '',
      });

    // case 'SHOW_NOTIFICATION_CTA':
    //   return Object.assign({}, state, {
    //     message: action.data.message,
    //     type: action.data.type,
    //   });

    default:
      return state;

  }
};