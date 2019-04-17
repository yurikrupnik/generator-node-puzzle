import path from 'path';
import express from 'express';
import morgan from 'morgan';
import { port<%= db ? ', databaseUrl ' : ' '%>} from './config';
<% if (ssr) { _%>
import render from './services/render';
import App from './components/App';
import routes from './routes';
<%_ } _%>
import api from './api';
<% if (db) { _%>
import db from './services/db';
<%_ } _%>
<%_ if (io) { _%>
import server from './services/socket/server';
<%_ } _%>
<%_ if (auth) { _%>
import passport from './services/passport';
<%_ } _%>

const app = express();

const assets = path.resolve(__dirname, 'assets');

app.use(express.static(assets));
app.use(morgan('dev'));
app.use(express.json(), express.urlencoded({ extended: false }));
<% if (ssr) { _%>
app.set('view engine', 'ejs');
app.set('views', assets);
<%_ } _%>

<%_ if (db) { _%>
app.use(db(databaseUrl));
<%_ } _%>
<%_ if (auth) { _%>
app.use(passport(app));
<%_ } _%>
app.use(api);
<%_ if (ssr) { _%>
app.use(render(<%= ssr ? "App, routes" : "" %>));
<%_ } _%>
// app.use(route);

<%= io ? 'server(app)' : 'app' %>.listen(port, (err) => {
    if (err) {
        console.log('err', err); // eslint-disable-line no-console
    } else {
        console.log(`running at port: ${port}`); // eslint-disable-line no-console
    }
});
