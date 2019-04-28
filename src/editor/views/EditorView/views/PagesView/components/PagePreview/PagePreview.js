// @flow
import React from 'react';
import store from 'redux/store';
import { connect } from 'react-redux';
import * as styles from './styles';
import type { PageModel } from '../../../../../../../data/page/model';
import { getPageSlug } from '../../../../../../../data/page/state';
import {
  getPageSlugFromPreviewPathname,
  getPreviewSiteLinkPath,
} from '../../../../../../../preview/routing/routing';
import { PREVIEW_IFRAME_ROUTE_CHANGED } from '../../../../../../../preview/event';
import { getPageBySlugFromReduxState } from '../../../../../../../redux/editor/state';
import type { ReduxDataState } from '../../../../../../../redux/store';
import { setSelectedPageKeyRedux } from '../../../../../../../redux/ui/reducer';
import { getReduxPresentState } from '../../../../../../../redux/styles/state';

type Props = {
  page: PageModel,
  selectPage: (pageKey: string) => void,
};

class PagePreview extends React.Component<Props> {
  componentDidMount(): void {
    this.addIframeListener();
  }

  componentWillUnmount() {
    this.removeIframeListener();
  }

  addIframeListener() {
    window.addEventListener('message', this.handleIframeMessage);
  }

  removeIframeListener() {
    window.removeEventListener('message', this.handleIframeMessage);
  }

  handleIframeMessage = (event: any) => {
    const { data } = event;
    if (event.origin !== window.origin) {
      console.warn(`Message is from ${event.origin} and has been ignored.`);
      return;
    }
    if (data && data.message && data.message === PREVIEW_IFRAME_ROUTE_CHANGED) {
      const { pathname } = data.data;
      this.handleRouteChanged(pathname);
    }
  };

  handleRouteChanged(pathname: string) {
    const { page, selectPage } = this.props;
    const historyState = store.getState();
    const state = getReduxPresentState(historyState);
    const slug = getPageSlugFromPreviewPathname(pathname);
    const newPage = getPageBySlugFromReduxState(slug, state);
    if (newPage && page.key !== newPage.key) {
      selectPage(newPage.key);
    }
  }

  render() {
    const { page } = this.props;
    const slug = getPageSlug(page);
    return <iframe className={styles.iframeClass} src={getPreviewSiteLinkPath(slug)} />;
  }
}

const mapDispatchToProps = {
  selectPage: (pageKey: string) => setSelectedPageKeyRedux(pageKey),
};

export default connect(
  null,
  mapDispatchToProps
)(PagePreview);
