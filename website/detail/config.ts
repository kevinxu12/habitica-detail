import { app } from "../server/replay-server"
import {connectToMongo} from "./mongoose";

const getApp = async () => {
  // await connectToMongo();
  return app;
}

export { getApp };
