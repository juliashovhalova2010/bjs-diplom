'use strict';
const userForm = new UserForm(); 
userForm.loginFormCallback = data => {
    ApiConnector.login(data, callback => {
      if (callback.success === true) {
          location.reload(); //войди
      } else{
        UserForm.setLoginErrorMessage(callback.data); //выведи ошибку
      }
    });
  }

  userForm.registerFormCallback = data => {
    ApiConnector.register(data, callback => {
      if (callback.success === true) {
          location.reload(); //войди
      } else{
        userForm.setLoginErrorMessage(callback.data); //выведи ошибку
      }
    });
  }