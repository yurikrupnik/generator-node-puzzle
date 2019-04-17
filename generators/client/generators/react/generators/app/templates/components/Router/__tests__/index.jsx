import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import Router from '../index';

const {
    it,
    afterEach
} = global;

const Component = () => (
    <div>
        asd
    </div>
);
afterEach(cleanup);

it('should render Router', () => {
    const routes = [
        {
            path: '/',
            component: Component,
            key: '1'
        }
    ];
    render(
        <MemoryRouter>
            <Router routes={routes}>
                <h2>
                    s
                </h2>
            </Router>
        </MemoryRouter>
    );
});
