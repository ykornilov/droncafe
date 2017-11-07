class AuthForm {
    get url() {
        return '/client';
    }

    get form() {
        return element(by.name('userForm'));
    }

    get name() {
        return element(by.model('$ctrl.user.name'));
    }

    get email() {
        return element(by.model('$ctrl.user.email'));
    }

    get submitBtn() {
        return element(by.tagName('form')).$('button');
    }

    get isDisplayed() {
        return this.form.isDisplayed();
    }

    get isReady() {
        return this.submitBtn.isEnabled();
    }

    setName(value) {
        this.name.sendKeys(value);
    }

    setEmail(value) {
        this.email.sendKeys(value);
    }

    get() {
        browser.get(this.url);
    }
}

module.exports = AuthForm;