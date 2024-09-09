import { app } from "../server/replay-server"

const getApp = async () => {
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  await sleep(10000);

  return app;
}

export { getApp };
