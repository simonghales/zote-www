// @flow
import { firebaseDatabase } from '../config';

import type { FirestoreSiteDataModel } from '../models/site';

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
