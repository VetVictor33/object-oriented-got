import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.use(routes);

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