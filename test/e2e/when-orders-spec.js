const expect = require('chai').expect;
const AuthForm = require('./page-objects/auth');
const Client = require('./page-objects/client');
const Menu = require('./page-objects/menu');
const Orders = require('./page-objects/orders');
const Kitchen = require('./page-objects/kitchen');

describe('Testing work with orders', function() {
    let auth = {};
    let client = {};
    let menu = {};
    let orders = {};
    let kitchen = {};

    function loginClient(name) {
        auth = new AuthForm();
        auth.get();
        auth.setName(name);
        auth.setEmail(`${name}@abc.ru`);
        auth.submitBtn.click();

        client = new Client();
    }

    function makeOrders() {
        client.toMenu();
        menu = new Menu();
        menu.firstDishBuyBtn.click();
        menu.firstDishBuyBtn.click();
        client.toOrders();
        orders = new Orders();
    }

    function loginKitchen() {
        kitchen = new Kitchen();
        kitchen.get();
    }

    afterEach(() => {
        const clean = require('mongo-clean');
        const url = 'mongodb://localhost:27017/droncafe';

        clean(url, { action: 'remove' }, (err, db) => {
            if (err) {
                console.log(err);
            }
        })
    });

    describe('Testing work with orders in the client interface', function(){
        let name;

        beforeEach(() => {
            name = `test${Math.floor(Date.now() / 1000)}`;
            loginClient(name);
            makeOrders();
        });

        it('Testing the creation of orders', function(){
            expect(orders.length).eventually.to.equal(2);
        });

        it('Testing order status after creation', function(){
            orders.firstOrderStatus
                .getText()
                .then(text => expect(text).to.equal('Заказано'));
        });

        it('Testing order status after begin of cookingorders', function(){
            loginKitchen();
            kitchen.newOrdersFirstBtn.click();
            loginClient(name);
            orders = new Orders();
            orders.firstOrderStatus
                .getText()
                .then(text => expect(text).to.equal('Готовится'));
        });

        it('Testing order status after end of cookingorders', function(){
            loginKitchen();
            kitchen.newOrdersFirstBtn.click();
            kitchen.cookingOrdersFirstBtn.click();
            loginClient(name);
            orders = new Orders();
            orders.firstOrderStatus
                .getText()
                .then(text => expect(text).to.equal('Доставляется'));
        });

    });

    describe('Testing work with orders in the kitchen interface', function(){
        let name;

        beforeEach(() => {
            name = `test${Math.floor(Date.now() / 1000)}`;
            loginClient(name);
            makeOrders();
            loginKitchen();
        });

        it('Testing of ordering the kitchen', function(){
            expect(kitchen.newOrdersLength).eventually.to.equal(2);
        });

        it('Testing removing order from list of new orders to cookingorders orders: list of new orders', function(){
            kitchen = new Kitchen();
            kitchen.get();
            kitchen.newOrdersFirstBtn.click();
            expect(kitchen.newOrdersLength).eventually.to.equal(1);
        });

        it('Testing removing order from list of new orders to cookingorders orders: list of cookingorders orders', function(){
            kitchen = new Kitchen();
            kitchen.get();
            kitchen.newOrdersFirstBtn.click();
            expect(kitchen.cookingOrdersLength).eventually.to.equal(1);
        });

        it('Testing removing order from list of cookingorders orders', function(){
            kitchen = new Kitchen();
            kitchen.get();
            kitchen.newOrdersFirstBtn.click();
            kitchen.cookingOrdersFirstBtn.click();
            expect(kitchen.cookingOrdersLength).eventually.to.equal(0);
        });

    });
});
