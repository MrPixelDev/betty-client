import { io, Socket } from "socket.io-client";
import { createContext } from "react";

// export default class WSService {
//   socket: Socket | undefined;

//   private setSocket(newSocket: Socket): Socket {
//     this.socket = newSocket;
//     return this.socket;
//   }

//   createSocket(): Socket {
//     const newSocket = io(
//       `${process.env.REACT_APP_SOCKET_URL}:${process.env.REACT_APP_SOCKET_PORT}`
//     );
//     return this.setSocket(newSocket);
//   }
// }

// export const socket = io(
//   `${process.env.REACT_APP_SOCKET_URL}:${process.env.REACT_APP_SOCKET_PORT}`
// );
// export const WebSocketContext = createContext<Socket>(socket);
// export const WebSocketProvider = WebSocketContext.Provider;

// socket?.on("sitelogin", (e) => {
//   console.log(e);
// });

// socket?.on("sitelogout", (e) => {
//   console.log(e);
// });
// export default socket;
