// config.ts

type ConfigNameType = 'basicConfig' | 'pages';

export const getDictcConfig: (configName: ConfigNameType) => any =  async (configName) => {
  let config = null;
  try {
    config = await import(process.env.DICTC_CONFIG_PATH as string);
  } catch (e) {
    console.log('fail to get dict config file', e);
  } finally {
    return config ? config[configName] : null;
  }
};
