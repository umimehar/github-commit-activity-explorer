export type ConfigType = {
  env: EnvEnums;
  githubToken: string;
};

export enum EnvEnums {
  development = 'development',
  test = 'test',
  production = 'production',
}

const devConfig: ConfigType = {
  env: EnvEnums.development,
  githubToken: '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',
};
const testConfig: ConfigType = {
  env: EnvEnums.test,
  githubToken: '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',
};
const liveConfig: ConfigType = {
  env: EnvEnums.production,
  githubToken: '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',
};

const allEnvCong = {
  development: devConfig,
  test: testConfig,
  production: liveConfig,
};

// for app internal use envs
export const appConfig: ConfigType = allEnvCong[process.env.NODE_ENV];
