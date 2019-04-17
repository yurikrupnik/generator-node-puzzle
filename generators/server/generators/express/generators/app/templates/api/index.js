import express from 'express';
import users from './users';
<%_ if(db) { _%>
import projects from './projects';
<%_ } _%>
<%_ if(auth) { _%>
import auth from './auth';
<%_ } _%>

const route = express.Router();

// route.use('auth', auth);
route.use('/api', [
<%_ if(db) { _%>
    users,
    projects,
<%_ } _%>
<%_ if(auth) { _%>
    auth
<%_ } _%>
]);

export default route;
