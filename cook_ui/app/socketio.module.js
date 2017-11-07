'use strict';

angular
    .module('socketio', [
        'btford.socket-io'
    ])
    .factory('socket', socketFactory => {
        return socketFactory({
            ioSocket: io.connect('/kitchen')
        });
    });