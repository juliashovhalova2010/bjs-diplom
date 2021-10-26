'use strict';
const exit = new LogoutButton();
exit.action = () => {
    ApiConnector.logout(response => {
      if (response.success) {
        location.reload();
      }
    });
  };

ApiConnector.current(response => {
      if (response.success) {
        ProfileWidget.showProfile(response.data);
      }
});

const tableBody = new RatesBoard();
function getStoc() {
    ApiConnector.getStocks(response => {
     if (response.success) {
          tableBody.clearTable();
          tableBody.fillTable(response.data);
    }
});
    
getStoc();
setInterval(getStoc, 60000);


const addMoneyForm = new MoneyManager();
    
addMoneyForm.addMoneyCallback = function (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            addMoneyForm.setMessage(false, 'Кошелек пополнен');
        } else {
            addMoneyForm.setMessage(response.success, response.error);
        }
    });
};

addMoneyForm.conversionMoneyCallback = function (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            addMoneyForm.setMessage(false, 'Успешно сконвертирована валюта');
        } else {
            addMoneyForm.setMessage(response.success, response.error);
        }
    })
}

addMoneyForm.sendMoneyCallback = function (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            addMoneyForm.setMessage(false, 'Перевод выполнен');
        } else {
            addMoneyForm.setMessage(response.success, response.error);
        }
    })
}
    
const favoritesTableBody = new FavoritesWidget();  
    
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesTableBody.clearTable();
        favoritesTableBody.fillTable(response.data);
        addMoneyForm.updateUsersList(response.data);
    }
});

favoritesTableBody.addUserCallback = function (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesTableBody.clearTable();
            favoritesTableBody.fillTable(response.data);
            addMoneyForm.updateUsersList(response.data);
            favoritesTableBody.setMessage(false, 'Контакт успешно добавлен в избранное');
        } else {
            favoritesTableBody.setMessage(response.success, response.error);
        }
    });
};

favoritesTableBody.removeUserCallback = function (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesTableBody.clearTable();
            favoritesTableBody.fillTable(response.data);
            addMoneyForm.updateUsersList(response.data);
            favoritesTableBody.setMessage(false, 'Контакт успешно удален');
        } else {
            favoritesTableBody.setMessage(response.success, response.error);
        }
    });
}
