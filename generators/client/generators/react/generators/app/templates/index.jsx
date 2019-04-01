import React from 'react';
import { render<%= srr ? ', hydrate ' : ' ' %>} from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import routes from './routes';
<%_ if (srr) { _%>
import config from './config';
<%_ } _%>
import './styles/_index.scss';

<%_ if (srr) { _%>
const renderMethod = config.isProd ? hydrate : render;
<%_ } _%>
<%=  srr ? 'renderMethod' : 'render'%>(
    <BrowserRouter>
        <App routes={routes} />
    </BrowserRouter>,
    global.document.getElementById('root')
);
