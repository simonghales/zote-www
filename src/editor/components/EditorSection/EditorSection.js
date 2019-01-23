// @flow
import React, { Component } from 'react';
import styles from './styles';
import EditorSectionNav, {
  CONTENT_NAV_OPTION,
  HTML_NAV_OPTION,
} from './components/EditorSectionNav/EditorSectionNav';
import EditorSectionBody from './components/EditorSectionBody/EditorSectionBody';

type Props = {};

type State = {
  selectedTab: string,
};

class EditorSection extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      // selectedTab: CONTENT_NAV_OPTION.key,
      selectedTab: HTML_NAV_OPTION.key,
    };
  }

  setTab = (tab: string) => {
    this.setState({
      selectedTab: tab,
    });
  };

  render() {
    const { selectedTab } = this.state;
    return (
      <div className={styles.containerClass}>
        <EditorSectionNav selectedTab={selectedTab} setTab={this.setTab} />
        <div className={styles.contentClass}>
          <EditorSectionBody selectedTab={selectedTab} />
        </div>
      </div>
    );
  }
}

export default EditorSection;
