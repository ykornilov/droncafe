class Client {
    get incBalanceBtn() {
        return element(by.css('.card-content')).$('button');
    }

    getBalance() {
        return element(by.binding('common.user.balance')).getText();
    }

    toMenu() {
        element(by.css('.card-action')).all(by.tagName('a')).first().click();
    }

    toOrders() {
        element(by.css('.card-action')).all(by.tagName('a')).last().click();
    }
}

module.exports = Client;