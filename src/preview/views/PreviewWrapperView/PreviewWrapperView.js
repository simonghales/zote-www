// @flow
import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { PREVIEW_ROUTE_PATH, PREVIEW_SITE_ROUTE_PATH } from '../../routing/routing';
import PreviewView from '../PreviewView/PreviewView';
import PreviewSiteView from '../PreviewSiteView/PreviewSiteView';
import { PREVIEW_IFRAME_ROUTE_CHANGED } from '../../event';

type Props = {
  location: {
    pathname: string,
  },
};

class PreviewWrapperView extends React.Component<Props> {
  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      const pathname = this.props.location.pathname;
      this.updateParentWithPathname(pathname);
    }
  }

  updateParentWithPathname(pathname: string) {
    window.parent.postMessage(
      {
        message: PREVIEW_IFRAME_ROUTE_CHANGED,
        data: {
          pathname,
        },
      },
      '*'
    );
  }

  render() {
    return (
      <React.Fragment>
        <Route path={PREVIEW_ROUTE_PATH} component={PreviewView} />
        <Route path={PREVIEW_SITE_ROUTE_PATH} component={PreviewSiteView} />
      </React.Fragment>
    );
  }
}

export default withRouter(PreviewWrapperView);
