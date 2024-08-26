import express, { Express } from 'express';
import { json, urlencoded } from 'body-parser';
import { connectDB } from './services';

import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes'

dotenv.config();

const app: Express = express();
const port: Number | String = process.env.PORT || 3000;

app.use(cors());
app.use(json());
app.use(urlencoded());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`server runing on port ${port}`);
    connectDB().then((res: any) => {
        console.log(`Database connected`);
    }).catch(error => {
        console.error(`Database not connected: `, error);
    })
});