// @flow

import type { ComponentsModels } from '../../data/component/model';
import type { PagesModel } from '../../data/page/model';
import type { StylesModels } from '../../data/styles/model';
import type { MixinsModel } from '../../data/mixin/model';

export type FirestoreSiteHistoryDataModel = {
  historyKey: string,
  components: ComponentsModels,
  pages: PagesModel,
  styles: StylesModels,
  mixins: MixinsModel,
};

export type FirestoreSiteDataModel = {
  data: {
    history: Array<FirestoreSiteHistoryDataModel>,
    selectedHistoryKey: string,
  },
  settings: {
    name: string,
  },
};

export function getCurrentSiteHistoryData(
  siteData: FirestoreSiteDataModel
): FirestoreSiteHistoryDataModel | null {
  const {
    data: { history, selectedHistoryKey },
  } = siteData;
  if (history.length === 0) return null;
  if (selectedHistoryKey) {
    const selectedHistory = history.find(
      historyData => historyData.historyKey === selectedHistoryKey
    );
    if (selectedHistory) {
      return selectedHistory;
    }
  }
  return history[0];
}

export function getComponentsFromSiteHistoryData(
  data: FirestoreSiteHistoryDataModel
): ComponentsModels {
  return data.components;
}

export function getPagesFromSiteHistoryData(data: FirestoreSiteHistoryDataModel): PagesModel {
  return data.pages;
}

export function getStylesFromSiteHistoryData(data: FirestoreSiteHistoryDataModel): StylesModels {
  return data.styles;
}

export function getMixinsFromSiteHistoryData(data: FirestoreSiteHistoryDataModel): MixinsModel {
  return data.mixins;
}
