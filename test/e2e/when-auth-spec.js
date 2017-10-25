const expect = require('chai').expect;
const AuthForm = require('./page-objects/auth');

describe('Testing required-fields in the authform of the client interface', function(){
    let auth = {};

    beforeEach(() => {
        auth = new AuthForm();
        auth.get();
    });

    it('Incorrect name and email => Submit button is disabled', function(){
        expect(auth.isReady).eventually.to.equal(false);
    });

    it('Incorrect name and correct email => Submit button is disabled', function(){
        auth.setEmail('abc@abc.ru');
        expect(auth.isReady).eventually.to.equal(false);
    });

    it('Correct name and incorrect email (email is empty) => Submit button is disabled', function(){
        auth.setName('abc');
        expect(auth.isReady).eventually.to.equal(false);
    });

    it('Correct name and incorrect email (email = "abc") => Submit button is disabled', function(){
        auth.setName('abc');
        auth.setEmail('abc');
        expect(auth.isReady).eventually.to.equal(false);
    });

    it('Correct name and incorrect email (email = "abc@abc") => Submit button is disabled', function(){
        auth.setName('abc');
        auth.setEmail('abc');
        expect(auth.isReady).eventually.to.equal(false);
    });

    it('Correct name and email => Submit button is enabled', function(){
        const name = `test${Math.floor(Date.now() / 1000)}`;
        auth.setName(name);
        auth.setEmail(`${name}@abc.ru`);
        expect(auth.isReady).eventually.to.equal(true);
    });

});