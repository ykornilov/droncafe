class Orders {
    get length() {
        return this.getList().count();
    }

    get firstOrder() {
        return this.getList().first();
    }

    get firstOrderStatus() {
        return this.firstOrder.$('div').$('p');
    }

    getList() {
        return element.all(by.repeater('order in orders'));
    }

}

module.exports = Orders;