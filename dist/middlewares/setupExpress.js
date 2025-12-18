import cors from "cors";
import express from "express";
export const setupExpressMiddlewares = (app) => {
    const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";
    app.use(cors({
        origin: CLIENT_ORIGIN,
        credentials: true,
    }));
    app.use(express.json());
    return app;
};
//# sourceMappingURL=setupExpress.js.map