class Kitchen {
    get url() {
        return '/kitchen';
    }

    get() {
        browser.get(this.url);
    }

    get newOrdersLength() {
        return this.getNewOrdersList().count();
    }

    get newOrdersFirst() {
        return this.getNewOrdersList().first();
    }

    get newOrdersFirstBtn() {
        return this.newOrdersFirst.$('button');
    }

    getNewOrdersList() {
        return element.all(by.repeater('order in common.orders | filter: {status: 0}'));
    }


    get cookingOrdersLength() {
        return this.getCookingOrdersList().count();
    }

    get cookingOrdersFirst() {
        return this.getCookingOrdersList().first();
    }

    get cookingOrdersFirstBtn() {
        return this.cookingOrdersFirst.$('button');
    }

    getCookingOrdersList() {
        return element.all(by.repeater('order in common.orders | filter: {status: 1}'));
    }
}

module.exports = Kitchen;