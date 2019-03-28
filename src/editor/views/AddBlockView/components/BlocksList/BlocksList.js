// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { ReduxState } from '../../../../../redux/store';
import * as styles from './styles';
import { getDefaultBlocks } from '../../../../../data/block/types/state';
import type { BlockTypeModel } from '../../../../../data/block/types/model';
import BlockItem from './components/BlockItem/BlockItem';

function filterBlocks(blocks: Array<BlockTypeModel>, filter: string): Array<BlockTypeModel> {
  return blocks.filter(block => block.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
}

type Props = {
  blocks: Array<BlockTypeModel>,
  filter: string,
  addBlock: (blockKey: string) => void,
};

const BlocksList = ({ blocks, filter, addBlock }: Props) => (
  <ul className={styles.containerClass}>
    {filterBlocks(blocks, filter).map(block => (
      <li className={styles.itemClass} key={block.key}>
        <BlockItem name={block.name} icon={block.icon} add={() => addBlock(block.key)} />
      </li>
    ))}
  </ul>
);

const mapStateToProps = (state: ReduxState) => {
  const blocks = getDefaultBlocks();
  return {
    blocks,
  };
};

export default connect(mapStateToProps)(BlocksList);
