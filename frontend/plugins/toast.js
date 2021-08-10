import ToastComponent from '@/components/Toast/Index.vue';
import Vue from 'vue';

let instance;
let getVueInstance = () => {
    instance = new Vue({
        render: h => h(ToastComponent)
    }).$mount();
    document.body.appendChild(instance.$el);

}

const Toast = {
    success(options) {
        !instance && getVueInstance()
        instance.$children[0].add({
            ...options,
            type: 'success'
        })
    },
    info(options) {
        !instance && getVueInstance()
        instance.$children[0].add({
            ...options,
            type: 'info'
        })
    },
    error(options) {
        !instance && getVueInstance()
        instance.$children[0].add({
            ...options,
            type: 'error'
        })
    }
}



export default ({}, inject) => {
    inject('toast', Toast)
}