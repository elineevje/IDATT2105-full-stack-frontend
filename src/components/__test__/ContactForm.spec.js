import { mount } from '@vue/test-utils';
import ContactForm from '/src/components/ContactForm.vue';
import { assert, describe, test } from 'vitest';


describe('ContactForm Component', () => {
    test('submit method should validate form and make a successfull API call', async () => {
        const wrapper = mount(ContactForm);
        const vm = wrapper.vm;

        vm.form.name = 'Test testing';
        vm.form.email = 'test@example.com';
        vm.form.message = 'Test message';

        await vm.submit();

        assert.equal(vm.error.length, 0);
    });

    test('submit method should handle form validation errors', async () => {
        const wrapper = mount(ContactForm);
        const vm = wrapper.vm;

        vm.form.name = 'test';
        vm.form.email = 'test@gmail.com';
        vm.form.message = '';

        await vm.submit();

        assert.notEqual(vm.error.length, 0);
    });

    test('submit method should handle invalid email in form', async() => {
        const wrapper = mount(ContactForm);
        const vm = wrapper.vm;

        vm.form.name = 'Jon';
        vm.form.email = 'jon.com';
        vm.form.message = 'Test message from jon';

        await vm.submit();

        assert.equal(vm.error, 'Email is invalid.');
    });

    test('submit method should handle empty name field', async() => {
        const wrapper = mount(ContactForm);
        const vm = wrapper.vm;

        vm.form.name = '';
        vm.form.email = 'sara@mail.com';
        vm.form.message = 'Test message from sara';

        await vm.submit();

        assert.equal(vm.error, 'Name is required.');
    });

});