import express, { Express } from 'express';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from './routes/index'

dotenv.config();

const app: Express = express();
const port: Number | String = process.env.PORT || 3000;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

app.use('api/', routes);

app.listen(port, () => {
    console.log(`server runing on port ${port}`);
})