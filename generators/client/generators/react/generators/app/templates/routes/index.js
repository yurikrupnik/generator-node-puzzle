import Dashboard from './Dashboard';
import About from './About';

export default [
    {
        path: '/',
        component: Dashboard,
        key: 'dashboard',
        exact: true
    },
    {
        path: '/about',
        component: About,
        key: 'about'
    }
];
