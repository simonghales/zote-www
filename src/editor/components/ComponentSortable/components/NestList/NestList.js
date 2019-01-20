// @flow
import React, { Component } from 'react';
import Nestable from 'react-nestable';
import styles from './styles';
import BlockItem from '../BlockItem/BlockItem';
import type { SortableBlockModel } from '../../models';

type Props = {
  blocks: Array<SortableBlockModel>,
  onSelect: (blockKey: string) => void,
};

function renderCondensedNestItem(item: SortableBlockModel, onSelect: (blockKey: string) => void) {
  return <BlockItem blockKey={item.blockKey} selected={item.selected} onSelect={onSelect} />;
}

class NestList extends Component<Props> {
  handleRenderItem = ({ item }: { item: SortableBlockModel }) => {
    const { onSelect } = this.props;
    return renderCondensedNestItem(item, onSelect);
  };

  render() {
    const { blocks } = this.props;
    return (
      <div className={styles.containerClass}>
        <Nestable
          items={blocks}
          renderItem={this.handleRenderItem}
          onChange={() => {}}
          maxDepth={50}
        />
      </div>
    );
  }
}

export default NestList;
