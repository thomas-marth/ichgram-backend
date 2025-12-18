import { Server as HttpServer } from "http";
import { Server } from "socket.io";
declare const setupSocketServer: (httpServer: HttpServer) => Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
export default setupSocketServer;
//# sourceMappingURL=socket.d.ts.map