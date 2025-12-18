// src/socket.ts
import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { verifyToken } from "./utils/jwt.js";
import {
  createMessage,
  formatMessageResponse,
} from "./services/message.services.js";

interface MessageSendPayload {
  to?: string;
  text?: string;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
interface SocketAckPayload {
  ok: boolean;
  error?: string;
  message?: ReturnType<typeof formatMessageResponse>;
}

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";

const setupSocketServer = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: CLIENT_ORIGIN, credentials: true },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token provided"));
    const { data, error } = verifyToken(token);
    if (error || !data) return next(new Error("Invalid token"));
    socket.data.userId = data.id.toString();
    next();
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.data.userId as string;
    socket.join(`user:${userId}`);

    socket.on("message:send", async (payload: MessageSendPayload, ack) => {
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
      } catch (err) {
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
