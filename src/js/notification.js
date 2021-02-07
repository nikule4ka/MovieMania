import { error, success, info, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
defaults.styling = 'material';
defaults.icons = 'material';
defaults.width = '280px';

function errorNotifications(title) {
  error({
    title,
  });
}

function successNotifications(title) {
  success({
    title,
  });
}

const notification = {
  errorNotifications,
  successNotifications,
};

export default notification;
