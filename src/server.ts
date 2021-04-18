import * as dotenv from 'dotenv'
dotenv.config();

import app from './config/app';


app.listen(process.env.PORT || 3000, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${process.env.PORT || 3000}`)
})