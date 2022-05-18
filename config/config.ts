import dotenv from 'dotenv';

dotenv.config();

interface ENV {
  PORT: number | undefined;
  MONGO_URI: string | undefined;
  JWT_SECRET: string | undefined;
}

interface Config {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : 3030,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (configValues: ENV): Config => {
  for (const [key, value] of Object.entries(configValues)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return configValues as Config;
};

const uncheckedConfig = getConfig();

const config = getSanitzedConfig(uncheckedConfig);

export default config;
