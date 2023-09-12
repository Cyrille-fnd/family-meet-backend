import createApplication from "express";
import bodyParser from "body-parser";
import expressRouter from "./src/routes";
import getConfig from "./src/config";

const { PORT } = getConfig()

const expressServer = createApplication();
expressServer.use(bodyParser.json());
expressServer.use('/', expressRouter);

expressServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
