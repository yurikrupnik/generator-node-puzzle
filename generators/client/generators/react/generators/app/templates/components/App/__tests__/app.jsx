import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'; // eslint-disable-line
import {
    render, cleanup
} from 'react-testing-library';
import App from '../app';
import routes from '../../../routes';

jest.mock('../../../routes'); // eslint-disable-line no-undef

const {
    it,
    afterEach
} = global;

afterEach(cleanup);

it('renders <App /> component', async () => { // integration test
    const tree = (
        <Router history={createBrowserHistory()}>
            <App routes={routes} />
        </Router>
    );
    render(tree);
});
