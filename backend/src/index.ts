import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

import { taskRoutes } from "./controllers/taskController";
import { userController } from "./controllers/userController";

import db from "./db/db";
db();

const app = new Elysia()

  .use(
    cors({
      origin: ["192.168.1.72:8081", "localhost:5173"],
      allowedHeaders: ["Content-Type"],
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  )
  .group("/api/v1", (app) => app.use(userController))
  .group("/api/v1", (app) => app.use(taskRoutes))

  .listen({
    port: 3000,
  });

console.log("server on port : ", app.server?.port);
