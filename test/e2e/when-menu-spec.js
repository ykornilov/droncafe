const expect = require('chai').expect;
const AuthForm = require('./page-objects/auth');
const Client = require('./page-objects/client');
const Menu = require('./page-objects/menu');

describe('Testing work with menu in the client interface', function(){
    let auth = {};
    let client = {};
    let menu ={};
    let name;

    function loginClient(name) {
        auth = new AuthForm();
        auth.get();
        auth.setName(name);
        auth.setEmail(`${name}@abc.ru`);
        auth.submitBtn.click();

        client = new Client();
    }

    beforeEach(() => {
        name = `test${Math.floor(Date.now() / 1000)}`;
        loginClient(name);
    });

    afterEach(() => {
        const clean = require('mongo-clean');
        const url = 'mongodb://localhost:27017/droncafe';

        clean(url, { action: 'remove' }, (err, db) => {
            if (err) {
                console.log(err);
            }
        })
    });

    it('Testing navigation to menu', function(){
        client.toMenu();
        menu = new Menu();
        expect(menu.length).eventually.to.equal(5);
    });

    it('Testing warning message in the menu when balance > cost of the dish', function(){
        client.toMenu();
        menu = new Menu();
        expect(menu.firstDishWarning.isPresent()).eventually.to.equal(false);
    });

    it('Testing buy button in the menu when balance > cost of the dish', function(){
        client.toMenu();
        menu = new Menu();
        expect(menu.firstDishBuyBtn.isPresent()).eventually.to.equal(true);
    });

    it('Testing warning message in the menu when balance < cost of the dish', function(){
        client.toMenu();
        menu = new Menu();
        menu.firstDishBuyBtn.click();
        menu.firstDishBuyBtn.click();
        menu.firstDishBuyBtn.click();
        menu.firstDishWarning
            .getText()
            .then(text => expect(text).to.be.equal('Пополните баланс на 28у.е.'));
    });

    it('Testing buy button in the menu when balance < cost of the dish', function(){
        client.toMenu();
        menu = new Menu();
        menu.firstDishBuyBtn.click();
        menu.firstDishBuyBtn.click();
        menu.firstDishBuyBtn.click();
        expect(menu.firstDishBuyBtn.isPresent()).eventually.to.equal(false);
    });

});