import React from 'react';
import { render<%= ssr ? ', hydrate ' : ' ' %>} from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import routes from './routes';
<%_ if (ssr) { _%>
import config from './config';
<%_ } _%>
import './styles/<%= sass ? "_index.scss" : "index.css" %>';

<%_ if (ssr) { _%>
const renderMethod = config.isProd ? hydrate : render;
<%_ } _%>
<%=  ssr ? 'renderMethod' : 'render'%>(
    <BrowserRouter>
        <App routes={routes} />
    </BrowserRouter>,
    global.document.getElementById('root')
);
