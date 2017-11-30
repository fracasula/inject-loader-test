import Vue from 'vue';
import Router from 'vue-router';

import * as Components from '../components';

Vue.use(Router);

let router = new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    routes: [
        {
            path: '/',
            name: 'Test',
            component: Components.Test
        }
    ]

});

export default router;
