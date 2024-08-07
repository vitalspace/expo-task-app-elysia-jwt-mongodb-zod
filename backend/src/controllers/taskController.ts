import { jwt } from "@elysiajs/jwt";
import { Elysia, error, t } from "elysia";
import { Task } from "../models/task.model";

interface ITask {
  title: string;
  description: string;
  type: string;
}

export const taskRoutes = new Elysia({
  prefix: "/tasks",
  detail: {
    tags: ["tasks"],
  },
})
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT || "Bun is a GREAT RuTiM3",
    })
  )
  .get("/", async ({ jwt, cookie: { auth } }) => {
    try {
      if (!auth) return error(401, "Unauthorized");

      const user = await jwt.verify(auth.value);

      if (!user || typeof user.id !== "string")
        return error(401, "Unauthorized");

      const tasks = await Task.find({ author: user.id });

      return { tasks };
    } catch (error) {
      return { status: 500, message: `Internal server error ${error}` };
    }
  })

  .get("/getbytype/:id", async ({ jwt, params, cookie: { auth } }) => {
    try {
      if (!auth) return error(401, "Unauthorized");

      const user = await jwt.verify(auth.value);

      if (!user || typeof user.id !== "string")
        return error(401, "Unauthorized");

      const tasks = await Task.find({
        $and: [{ author: user.id }, { type: params.id }],
      });

      return { tasks };
    } catch (error) {
      return { status: 500, message: `Internal server error ${error}` };
    }
  })

  .post(
    "/",
    async ({ jwt, body, cookie: { auth } }) => {
      try {
        if (!auth) return error(401, "Unauthorized");
        const user = await jwt.verify(auth.value);

        if (!user || typeof user.id !== "string")
          return error(401, "Unauthorized");

        const { title, description, type }: ITask = body;

        const task = new Task({
          title,
          description,
          author: user.id,
          type: type,
        });

        await task.save();
        return { message: "Task created successfully" };
      } catch (error) {
        //@ts-ignore
        return error(500, { message: `Internal server error  ${error}` });
      }
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
        type: t.String(),
      }),
    }
  )

  .get("/:id", async ({ jwt, params, cookie: { auth } }) => {
    try {
      if (!auth) return error(401, "Unauthorized");
      const user = await jwt.verify(auth.value);

      if (!user || typeof user.id !== "string")
        return error(401, "Unauthorized");

      const { id } = params;

      const task = await Task.findOne({ _id: id });

      if (!task)
        return error(404, { message: `No task found with the ID: ${id}` });

      return { task };
    } catch (error) {
      //@ts-ignore
      return error(500, { message: `Internal server error ${error}` });
    }
  })

  .delete(
    "/:id",
    async ({ jwt, set, params, cookie: { auth } }) => {
      try {
        if (!auth) return error(401, "Unauthorized");
        const user = await jwt.verify(auth.value);

        if (!user || typeof user.id !== "string")
          return error(401, "Unauthorized");

        const { id } = params;

        const result = await Task.findByIdAndDelete({ _id: id });

        if (!result)
          return error(404, { message: `No task found with the ID: ${id}` });

        set.status = 200;

        return { message: `The task was deleted successfully` };
      } catch (error) {
        return { status: 500, message: `Internal server error ${error}` };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .put(
    "/:id",
    async ({ jwt, set, body, params, cookie: { auth } }) => {
      try {
        if (!auth) return error(401, "Unauthorized");
        const user = await jwt.verify(auth.value);

        if (!user || typeof user.id !== "string")
          return error(401, "Unauthorized");

        const { id } = params;

        if (!id) return error(400, "ID is required");

        const updatedUser = await Task.findByIdAndUpdate(
          { _id: id },
          { $set: { ...body } },
          { new: true }
        );

        if (!updatedUser)
          return error(404, { message: `No task found with the ID: ${id}` });

        set.status = 200;
        return { message: "Task updated successfully", newData: updatedUser };
      } catch (error) {
        set.status = 500;
        return { message: `Internal server error ${error}` };
      }
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
        completed: t.Boolean(),
      }),
      params: t.Object({
        id: t.String(),
      }),
    }
  );
