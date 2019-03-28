// @flow
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { setAddingBlockRedux } from '../../../redux/ui/reducer';
import AddBlockFilter from './components/AddBlockFilter/AddBlockFilter';
import BlocksList from './components/BlocksList/BlocksList';

type Props = {
  closeAddingBlock: () => void,
};

type State = {
  filter: string,
};

class AddBlockView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filter: '',
    };
  }

  handleFilterUpdate = (value: string) => {
    this.setState({
      filter: value,
    });
  };

  handleShadeClicked = () => {
    const { closeAddingBlock } = this.props;
    closeAddingBlock();
  };

  handleAddBlock = (blockKey: string) => {};

  render() {
    const { filter } = this.state;
    return (
      <div className={styles.containerClass}>
        <div className={styles.shadeClass} onClick={this.handleShadeClicked} />
        <div className={styles.mainClass}>
          <header className={styles.mainHeaderClass}>
            <AddBlockFilter filterInput={filter} onChange={this.handleFilterUpdate} />
          </header>
          <section className={styles.mainBodyClass}>
            <BlocksList addBlock={this.handleAddBlock} filter={filter} />
          </section>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  closeAddingBlock: () => setAddingBlockRedux(false),
};

export default connect(
  null,
  mapDispatchToProps
)(AddBlockView);
