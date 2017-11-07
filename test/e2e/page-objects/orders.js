class Orders {
    get length() {
        return this.getList().count();
    }

    get firstOrder() {
        return this.getList().first();
    }

    get firstOrderStatus() {
        return this.firstOrder.$('.order-status').$('p');
    }

    getList() {
        return element.all(by.repeater('order in $ctrl.orders'));
    }

}

module.exports = Orders;