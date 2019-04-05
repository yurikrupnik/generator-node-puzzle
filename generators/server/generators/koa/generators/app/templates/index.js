import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
// import api from './api';
<% if (db) { _%>
import db from './services/db';
<%_ } _%>
import { databaseUrl, port }  from './config';

const app = new Koa();

app.keys = [process.env.SECRET || 'ko'];
app.use(logger());
app.use(bodyParser());
<% if (db) { _%>
app.use(db(app, databaseUrl));
<%_ } _%>
var route = new Router();
route.get('/', (ctx, next) => {
    ctx.body = ['ssss'];
});

// app.use(api);
// app.use(ctx => {
//     if (ctx.path === '/favicon.ico') return;
//     if (ctx.session.isNew) {
//         console.log('new');
//     } else {
//         console.log('old');
//     }
//     let n = ctx.session.views || 0;
//     ctx.session.views = ++n;
//     ctx.body = n + ' views';
// });
app.use(route.routes());
app.listen(port, (err) => {
    if (err) {
        console.log('err', err); // eslint-disable-line no-console
    } else {
        console.log(`running at port: ${port}`); // eslint-disable-line no-console
    }
});
