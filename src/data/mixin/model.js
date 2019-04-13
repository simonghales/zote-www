// @flow

export type MixinModel = {
  key: string,
  name: string,
  stylesKey: string,
};

export type MixinsModel = {
  [string]: MixinModel,
};
