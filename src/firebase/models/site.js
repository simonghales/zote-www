// @flow

export type FirestoreSiteDataModel = {
  data: {
    history: Array<{}>,
    selectedHistoryKey: string,
  },
  settings: {
    name: string,
  },
};
