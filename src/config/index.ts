export type ConfigType = {
  env: EnvEnums;
  apiHost: string;
};

export enum EnvEnums {
  development = 'development',
  test = 'test',
  production = 'production',
}

const devConfig: ConfigType = {
  env: EnvEnums.development,
  apiHost: 'http://localhost:3000',
};
const testConfig: ConfigType = {
  env: EnvEnums.test,
  apiHost: 'http://localhost:3000', // can change this for tests
};
const liveConfig: ConfigType = {
  env: EnvEnums.production,
  apiHost: 'http://localhost:3000', // can change this for live
};

const allEnvCong = {
  development: devConfig,
  test: testConfig,
  production: liveConfig,
};

export const appConfig: ConfigType = allEnvCong[process.env.NODE_ENV];
