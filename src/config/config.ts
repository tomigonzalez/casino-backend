const getAcessToken = (): string => {
  if (process.env.ACCESS_TOKEN_SECRET) {
    return process.env.ACCESS_TOKEN_SECRET;
  }
  throw new Error("ACCES TOKEN SECRET NOT PRESENT");
};
const getRefreshToken = () => {
  if (process.env.REFRESH_TOKEN_SECRET) {
    return process.env.REFRESH_TOKEN_SECRET;
  }
  throw new Error("REFRESH TOKEN SECRET NOT PRESENT");
};

let config: config | null = null;

export const getConfig = (): config => {
  if (config) {
    return config;
  }
  config = {
    accesTokenSecret: getAcessToken(),
    refreshTokenSecret: getRefreshToken(),
  };
  return config;
};

export type config = {
  accesTokenSecret: string;
  refreshTokenSecret: string;
};
