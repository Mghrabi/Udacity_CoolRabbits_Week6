import { Application, Request, Response } from "express";
import { User, UserModel } from "../models/userModel";
import {
  compareHash,
  createHash,
  createToken,
} from "../utilities/authentication";
import { authorizationMiddleWare } from "../utilities/authorization";

//needs return type
const createUserHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // console.log("hit users/signup");
    const { firstname, lastname, password }: User = req.body;
    const User = new UserModel();
    const hash = createHash(password as string);
    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      hash,
    });
    //give a token
    const accessToken = createToken((user as User).id as number);
    return res.send({ ...user, accessToken });
  } catch (err: unknown) {
    return res.status(400).send(`err in creating user, ${err} `);
  }
};

const userLoginHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // console.log("hit users/login");
    const { password, userId } = req.body;
    const User = new UserModel();
    const user = await User.show(userId);
    if (!user) {
      return res.send("err: user with this id doesn't exist");
    }
    // console.log("user", user);
    const result = await compareHash(password, user.hash as string);
    if (!result) {
      return res.status(400).send("password is not correct");
    }
    //give a token
    const accessToken = createToken(userId);
    const { id, firstname, lastname } = user;
    return res.send({
      id,
      firstname,
      lastname,
      accessToken,
    });
  } catch (err: unknown) {
    return res.status(400).send(`err in creating user, ${err} `);
  }
};

const deleteUserHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // console.log("hit users/delete/:userId");
    //I could have just deleted the user with userId in the token, but I wrote the function this way (with if statement)
    //to allow for future if-else statements (like: if customer service decided to delete the user account)
    if (res.locals.userIdInToken != req.params.userId) {
      return res.status(400).send(
        `you don\'t have the authority to delete the user with id ${req.params.userId}`
      );
    }
    const User = new UserModel();
    await User.delete(req.params.userId);
    //even if user doesn't exist this will return the deletion statement of the user like with userId=1000
    return res.send("user is deleted");
  } catch (err: unknown) {
    return res.status(400).send(
      `err in deleting user with id ${req.params.userId}, err: ${err} `
    );
  }
};

const getAllUsersHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // console.log("hit users/index");
    const User = new UserModel();
    const users = await User.index();
    return res.send(users);
  } catch (err: unknown) {
    return res.status(400).send(`err in getting all users, err: ${err} `);
  }
};

const getOneUserByIdHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // console.log("hit users/show/:userId");
    if (res.locals.userIdInToken != req.params.userId) {
      return res.status(400).send(
        `you don\'t have the authority to view the user with id ${req.params.userId}`
      );
    }
    const User = new UserModel();
    const user = await User.show(req.params.userId);
    if (!user) {
      return res.status(400).send("no user found with this userId");
    }
    const { id, firstname, lastname } = user;
    return res.send({ id, firstname, lastname });
  } catch (err: unknown) {
    return res.status(400).send(
      `err in getting user with Id ${req.params.userId}, err: ${err} `
    );
  }
};

const userRouter = (app: Application): void => {
  app.post("/users/signup", createUserHandler);
  app.post("/users/login", userLoginHandler);
  //this is an extra endpoint (don't have a test)
  app.delete(
    "/users/:userId",
    authorizationMiddleWare,
    deleteUserHandler
  );
  app.get("/users/index", authorizationMiddleWare, getAllUsersHandler);
  //note (I made the user not allowed to view other users data in this route specifically, but I let him to do so
  //via the index route above -just for the proof of concept-)
  app.get(
    "/users/show/:userId",
    authorizationMiddleWare,
    getOneUserByIdHandler
  );
};

export default userRouter;
