import express from "express";
import { AppDataSource } from "./data-source";
import Routes from "./routes";

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.use(new Routes().router);

    const port = process.env.PORT || 3000;

    const server = app.listen(port, () => {
        console.log(`Server up on port ${port}`)
    })

    process.on('SIGINT', () => {
        server.close()
        console.log('Server down')
    })

    return server
})