class Menu {
    get length() {
        return this.getList().count();
    }

    get firstDish() {
       return this.getList().first();
    }

    get firstDishBuyBtn() {
        return this.firstDish.$('button');
    }

    get firstDishWarning() {
        return this.firstDish.all(by.tagName('p')).get(1);
    }

    getList() {
        return element.all(by.repeater('dish in $ctrl.menu'));
    }

}

module.exports = Menu;