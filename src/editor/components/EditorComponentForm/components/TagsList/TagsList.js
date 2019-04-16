// @flow
import React from 'react';
import { cx } from 'emotion';
import { FaPlus, FaTimes } from 'react-icons/fa';
import * as styles from './styles';

export type TagModel = {
  key: string,
  label: string,
  active: boolean,
  removable: boolean,
};

type TagProps = {
  active: boolean,
  label: string,
  removable: boolean,
  onSelect: () => void,
  onRemove: () => void,
};

const Tag = ({ active, label, removable, onSelect, onRemove }: TagProps) => (
  <div
    className={cx(styles.tagClass, {
      [styles.tagActiveClass]: active,
      [styles.tagInactiveClass]: !active,
      [styles.tagRemoveDisabledClass]: !removable,
    })}
    onClick={onSelect}
  >
    <div className={styles.tagLabelClass}>{label}</div>
    {removable && (
      <div
        className={styles.tagButtonClass}
        onClick={(event: any) => {
          event.preventDefault();
          onRemove();
        }}
      >
        {<FaTimes size={10} />}
      </div>
    )}
  </div>
);

type Props = {
  tags: Array<TagModel>,
  onSelect: (key: string) => void,
  onRemove: (key: string) => void,
  onAdd?: () => void,
};

const TagsList = ({ tags, onSelect, onRemove, onAdd }: Props) => (
  <div className={styles.listClass}>
    {tags.map((tag, index) => (
      <Tag
        active={tag.active}
        removable={tag.removable}
        label={tag.label}
        key={index.toString()}
        onSelect={() => {
          onSelect(tag.key);
        }}
        onRemove={() => {
          onRemove(tag.key);
        }}
      />
    ))}
    {onAdd && (
      <div className={styles.addTagClass} onClick={onAdd}>
        Add
        <FaPlus size={10} />
      </div>
    )}
  </div>
);

export default TagsList;
