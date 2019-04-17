import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Providers from '../providers';

const providers = [];

const {
    describe,
    it,
    afterEach
} = global;

afterEach(cleanup);

describe('providers', () => {
    it('renders three <Providers /> components', () => {
        render(
            <Providers providers={providers}>
                <div>
                    asd
                </div>
            </Providers>
        );
    });
});
