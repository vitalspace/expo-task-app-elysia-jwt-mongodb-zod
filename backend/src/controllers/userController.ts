import { jwt } from "@elysiajs/jwt";
import { Elysia, error, t } from "elysia";
import { User } from "../models/user.model";

interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const userController = new Elysia({
  //   prefix: "/",
  detail: {
    tags: ["users"],
  },
})
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT || "Bun is a GREAT RuTiM3",
    })
  )
  .post(
    "/signup",
    async ({ body, set }) => {
      try {
        const { name, username, password, email }: IUser = body;

        const existedUser = await User.findOne({
          $or: [{ email }, { username }],
        });

        if (existedUser) {
          return error(409, { message: "User already exists" });
        }

        const hashPssword = await Bun.password.hash(password);

        const user = new User({
          name,
          username,
          email,
          password: hashPssword,
        });

        await user.save();

        // const createdUser = await User.findById(user._id).select("-password");

        set.status = 201;
        return { message: "User created successfully" };
      } catch (err) {
        //@ts-ignore
        return error(500, { message: `Internal server error ${err}` });
      }
    },
    {
      body: t.Object({
        name: t.String({
          minLength: 8,
        }),

        username: t.String({
          minLength: 8,
        }),

        email: t.String({
          format: "email",
        }),

        password: t.String({
          minLength: 8,
        }),
      }),
    }
  )
  .post(
    "/signin",
    async ({ body, set, jwt, cookie: { auth } }) => {
      try {
        const { email, password } = body;

        const user = await User.findOne({
          $or: [{ email }],
        });

        if (!user) {
          return error(404, { message: "Invalid email or password" });
        }

        const isPasswordCorrect = await Bun.password.verify(
          password,
          user.password
        );

        if (!isPasswordCorrect) {
          return error(404, { message: "Invalid email or password" });
        }

        auth.set({
          value: await jwt.sign({
            //@ts-ignore
            id: user._id,
            avatar: user.avatar,
            name: user.name,
            username: user.username,
            email: user.email,
          }),
          // httpOnly: true,
          maxAge: 7 * 86400,
          path: "/",
        });

        return { token: auth.value };
      } catch (error) {
        //@ts-ignore
        return error(500, { message: `Internal server error ${err}` });
      }
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .put(
    "/update",
    async ({ jwt, body, set, cookie: { auth } }) => {
      try {
        if (!auth) return error(401, "Unauthorized");
        const profile = await jwt.verify(auth.value);

        if (!profile || typeof profile.id !== "string")
          return error(401, "Unauthorized");

        const updatedUser = await User.findByIdAndUpdate(
          { _id: profile.id },
          { $set: { ...body } },
          { new: true }
        )
          .select("-password")
          .select("-_id")
          .select("-_id")
          .select("-createdAt")
          .select("-updatedAt")
          .select("-__v");

        if (!updatedUser)
          return error(404, `User with id: ${profile.id} was not found.`);

        return JSON.stringify(updatedUser);
      } catch (error) {
        set.status = 500;
        return { message: `Internal server error ${error}` };
      }
    },

    {
      body: t.Object({
        avatar: t.String(),

        name: t.String({
          minLength: 8,
        }),

        username: t.String({
          minLength: 8,
        }),

        email: t.String({
          format: "email",
        }),
      }),
    }
  )

  .get("/profile", async ({ jwt, cookie: { auth } }) => {
    try {
      if (!auth) return error(401, "Unauthorized");

      const user = await jwt.verify(auth.value);

      if (!user) return error(401, { message: "Unauthorized" });

      const userData = await User.findById({ _id: user.id });
      if (!userData) return error(404, { message: "Uset not found" });

      return {
        avatar: userData.avatar,
        name: userData.name,
        username: userData.username,
        email: userData.email,
      };
    } catch (error) {
      //@ts-ignore
      return error(500, { message: `Internal server error ${err}` });
    }
  });
