const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

logoutButton.action = (logoutCallback => {
    ApiConnector.logout(logoutCallback => {
        if (logoutCallback) {
            location.reload();
        }
    });
});

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

function getCoursed () {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
};
setInterval(getCoursed, 60000);

moneyManager.addMoneyCallback = (data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(`Успешно`);
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
});
moneyManager.conversionMoneyCallback = (data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(`Успешно`);
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
});

moneyManager.sendMoneyCallback = (data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(`Успешно`);
        } else {
            moneyManager.setMessage(false, response.error);
        }
    })
});

favoritesWidget.favoritesTableBody = (data => {
    ApiConnector.getFavorites(data, response => {
        if (response.success) {
            FavoritesWidget.clearTable();
            FavoritesWidget.fillTable(response.data);
            MoneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(`Успешно`);
        }
    });
});
favoritesWidget.addUserCallback = (data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            FavoritesWidget.clearTable();
            FavoritesWidget.fillTable(response.data);
            MoneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(`Успешно`);
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
});

favoritesWidget.removeUserCallback = (data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            FavoritesWidget.clearTable();
            FavoritesWidget.fillTable(response.data);
            MoneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(`Успешно`);
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
});
