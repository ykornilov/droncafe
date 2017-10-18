'use strict';

clientApp.factory('socket', socketFactory => {
    return socketFactory({
        ioSocket: io.connect('/client')
    });
});
