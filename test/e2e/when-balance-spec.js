const expect = require('chai').expect;
const AuthForm = require('./page-objects/auth');
const Client = require('./page-objects/client');
const Menu = require('./page-objects/menu');

describe('Testing work with balance in the client interface', function(){
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

    it('Start balance === 100', function(){
        client
            .getBalance()
            .then(text => expect(text).to.be.equal('Баланс: 100у.е.'));
    });

    it('Increase of balance by 100', function(){
        client.incBalanceBtn.click();
        client
            .getBalance()
            .then(text => expect(text).to.be.equal('Баланс: 200у.е.'));
    });

    it('Testing buy button', function(){
        client.toMenu();
        menu = new Menu();
        menu.firstDishBuyBtn.click();
        client
            .getBalance()
            .then(text => expect(text).to.be.equal('Баланс: 68у.е.'));
    });

});