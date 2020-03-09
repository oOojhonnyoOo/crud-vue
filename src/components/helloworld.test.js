import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import HelloWorld from './HelloWorld'; // name of your Vue component
import axios from 'axios'

var wrapper = mount(HelloWorld);



describe('Component', () => {
    test('Is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('Contains a table', ()=>{
        expect(wrapper.contains('table')).toBe(true)
    });
   
   test('User List', async function(){

        wrapper.setData(wrapper.vm.pagination.page = 1);

        var response = await axios.get(`https://gorest.co.in/public-api/users?_format=json&access-token=${wrapper.vm.token}&page=${wrapper.vm.pagination.page}`)
        
        expect(response.data._meta.code).toBe(200)
        
    }, 10000);
});