import { render, cleanup } from 'react-testing-library';
import React from 'react';
import MainNav from '../nav';
import routes from '../../../routes';

jest.mock('../../../routes'); // eslint-disable-line no-undef

const {
    test,
    afterEach
} = global;

afterEach(cleanup);

test('renders <Nav /> component', () => {
    render(<MainNav routes={routes} />);
});
