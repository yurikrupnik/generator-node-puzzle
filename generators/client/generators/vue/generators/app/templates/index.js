import Vue from 'vue';
import './styles/_index.scss';

new Vue({
    data: {
        message: 'world'
    },
    template: '<div>hello {{message}}</div>'
}).$mount('#root');
