import express from 'express';
import { getData, postData, updateData, deleteData } from './events.controller';

const Router = express.Router();

Router.route('/events').get(getData).post(postData);

Router.route('/events/:id').patch(updateData).delete(deleteData);

export default Router;
