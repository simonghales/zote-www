// @flow
import React from 'react';
import styles from './styles';

const getPreviewUrl = (): string => `${window.location.origin}/preview`;

type Props = {};

class ModuleIframe extends React.Component<Props> {
  iframeRef: {
    current: any,
  };

  constructor(props: Props) {
    super(props);
    this.iframeRef = React.createRef();
  }

  render() {
    return <iframe className={styles.iframeClass} src={getPreviewUrl()} ref={this.iframeRef} />;
  }
}

export default ModuleIframe;
