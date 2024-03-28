import { mount } from '@vue/test-utils';
import Calculator from '/src/components/Calculator.vue';
import { assert, describe, test } from 'vitest';

describe('Calculator Component', () => {
    test('clear method should set current to an empty string', () => {
        const wrapper = mount(Calculator);
        const vm = wrapper.vm;

        vm.current = '1500';
        vm.clear();

        assert.equal(vm.current, '');
    });

    test('append method should append a number to current', () => {
        const wrapper = mount(Calculator);
        const vm = wrapper.vm;

        vm.append('2');
        assert.equal(vm.current, '2');

        vm.append('5');
        assert.equal(vm.current, '25');
    });

    test('plus method should plus a number to current', () => {
        const wrapper = mount(Calculator);
        const vm = wrapper.vm;

        vm.current = 10;
        vm.plus();
        assert.equal(vm.current, '10+');

        vm.append('6');
        vm.equal();
        assert.equal(vm.current, '10+6 = 16')
    });

    test('minus method should subtract a number from current', () => {
        const wrapper = mount(Calculator);
        const vm = wrapper.vm;

        vm.current = 10;
        vm.minus();
        assert.equal(vm.current, '10-');

        vm.append('6');
        vm.equal();
        assert.equal(vm.current, '10-6 = 4')
    });

    test('times method should multiplicate current with a number', () => {
        const wrapper = mount(Calculator);
        const vm = wrapper.vm;

        vm.current = 6;
        vm.times();
        assert.equal(vm.current, '6*');

        vm.append('8');
        vm.equal();
        assert.equal(vm.current, '6*8 = 48')
    });

    test('divide method should divide current with a number', () => {
        const wrapper = mount(Calculator);
        const vm = wrapper.vm;

        vm.current = 56;
        vm.divide();
        assert.equal(vm.current, '56/');

        vm.append('8');
        vm.equal();
        assert.equal(vm.current, '56/8 = 7')
    });

    test('sign method should make a number negative/positive', () => {
        const wrapper = mount(Calculator);
        const vm = wrapper.vm;

        vm.current = 456;
        vm.times();
        vm.append('8')
        vm.sign();
        assert.equal(vm.current, '456*-8');
    });

    test('percentage method should calculate the percentage of the current number', () => {
        const wrapper = mount(Calculator);
        const vm = wrapper.vm;

        vm.current = 50;
        vm.percentage();
        assert.equal(vm.current, '0.5');
    });

    test('comma method should add a decimal point to the current number', () => {
        const wrapper = mount(Calculator);
        const vm = wrapper.vm;

        vm.current = 345;
        vm.comma();
        assert.equal(vm.current, '345.');
    });
})

