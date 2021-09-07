export type ConfigType = {
  env: EnvEnums;
};

export enum EnvEnums {
  development = 'development',
  test = 'test',
  production = 'production',
}

const devConfig: ConfigType = {
  env: EnvEnums.development,
};
const testConfig: ConfigType = {
  env: EnvEnums.test,
};
const liveConfig: ConfigType = {
  env: EnvEnums.production,
};

const allEnvCong = {
  development: devConfig,
  test: testConfig,
  production: liveConfig,
};

// for app internal use envs
export const appConfig: ConfigType = allEnvCong[process.env.NODE_ENV];
