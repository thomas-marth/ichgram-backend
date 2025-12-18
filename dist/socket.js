import { Server } from "socket.io";
import { verifyToken } from "./utils/jwt.js";
import { createMessage, formatMessageResponse, } from "./services/message.services.js";
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";
const setupSocketServer = (httpServer) => {
    const io = new Server(httpServer, {
        cors: { origin: CLIENT_ORIGIN, credentials: true },
    });
    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;
        if (!token)
            return next(new Error("No token provided"));
        const { data, error } = verifyToken(token);
        if (error || !data)
            return next(new Error("Invalid token"));
        socket.data.userId = data.id.toString();
        next();
    });
    io.on("connection", (socket) => {
        const userId = socket.data.userId;
        socket.join(`user:${userId}`);
        socket.on("message:send", async (payload, ack) => {
            try {
                const { to, text } = payload || {};
                if (!to || typeof text !== "string" || !text.trim()) {
                    ack?.({ ok: false, error: "Invalid payload" });
                    return;
                }
                const message = await createMessage(userId, to, text);
                const response = formatMessageResponse(message);
                io.to(`user:${userId}`).emit("message:new", response);
                io.to(`user:${to}`).emit("message:new", response);
                ack?.({ ok: true, message: response });
            }
            catch (err) {
                ack?.({
                    ok: false,
                    error: err instanceof Error ? err.message : "Server error",
                });
            }
        });
    });
    return io;
};
export default setupSocketServer;
//# sourceMappingURL=socket.js.map