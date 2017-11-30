/**
 * This file is part of Work Digital's Admin Panel.
 *
 * (c) 2017 Work Digital
 */
'use strict';

import Vue from 'vue';
import utils from './../../utils';
import TestInjector from '!!vue-loader?inject!./../../../src/components/Test.vue';

const getComponentWithMockedHttp = (name, method) => TestInjector({
    './../modules/http': {
        [name]: method
    }
});

describe('SearchAlgorithms component', () => {
    it('fetches algorithms when mounted', done => {
        const mockedResponse = 'whatever';

        const component = getComponentWithMockedHttp('get', endpoint => {
            expect(endpoint).toBe('/just_an_endpoint');

            return new Promise(resolve => {
                resolve({
                    data: mockedResponse
                });
            });
        });

        const vm = new Vue(component).$mount();

        utils.waitForTicks(1, () => {
            expect(vm.myVariable).toBe(mockedResponse);
            done();
        });
    });
});
