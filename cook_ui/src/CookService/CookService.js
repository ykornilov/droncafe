'use strict';

cookApp.factory('socket', socketFactory => {
    return socketFactory({
        ioSocket: io.connect('/kitchen')
    });
});