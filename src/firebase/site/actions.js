// @flow

import { uniqueId } from 'lodash';
import firebase from 'firebase/app';
import store from 'redux/store';
import { firebaseDatabase } from '../config';

import type { FirestoreSiteDataModel, FirestoreSiteHistoryDataModel } from './models';
import { getCurrentReduxStateAsFirestoreSiteHistoryData } from './state';
import { getSiteKeyFromRootReduxState } from '../../redux/ui/state';
import { reduxSetChangesSaved } from '../../redux/shared/actions';

const sitesCollection = firebaseDatabase.collection('sites');

export function fetchFirestoreSiteData(siteKey: string): FirestoreSiteDataModel | null {
  const siteDocRef = sitesCollection.doc(siteKey);
  return siteDocRef
    .get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        console.log('site exists', data);
        return data;
      }
      console.warn('site doesnt exist');
      return null;
    })
    .catch(error => {
      console.error('Error getting document:', error);
      return null;
    });
}

export function generateHistoryKey(): string {
  return uniqueId(`history_`);
}

export function updateFirestoreSiteHistoryData(
  siteKey: string,
  data: FirestoreSiteHistoryDataModel
): Promise<any> {
  const siteDocRef = sitesCollection.doc(siteKey);
  return siteDocRef.update({
    'data.history': firebase.firestore.FieldValue.arrayUnion(data),
  });
}

export function storeReduxStateInFirestore(): Promise<any> {
  const state = store.getState();
  const data = getCurrentReduxStateAsFirestoreSiteHistoryData(state);
  const siteKey = getSiteKeyFromRootReduxState(state);
  return updateFirestoreSiteHistoryData(siteKey, data).then(() => {
    store.dispatch(reduxSetChangesSaved());
  });
}
