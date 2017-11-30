/**
 * This file is part of Work Digital's Admin Panel.
 *
 * (c) 2017 Work Digital
 */
'use strict';

import Vue from 'vue';

/**
 * Vue performs updates asynchronously so sometimes we have to wait for an
 * arbitrary number of ticks before being able to see the change we expect.
 * So this function is a simple utility that will let you wait for a given
 * number of ticks without having to nest Vue.nextTick() calls.
 *
 * https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue
 *
 * @param {Number} ticks Number of ticks the function has to wait for
 * @param {function} callback Function to be called back after N ticks
 * @param {Number} count Used for recursion, should be left as it is
 */
const waitForTicks = function (ticks, callback, count = 0) {
    if (count < ticks) {
        Vue.nextTick(() => {
            waitForTicks(ticks, callback, count + 1);
        });
    } else {
        callback();
    }
};

export default {
    waitForTicks
};
