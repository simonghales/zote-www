// @flow

import React, { useState } from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import * as styles from './styles';
import Input, { INPUT_THEMES } from '../Input/Input';

const NoResults = () => <div>No results found.</div>;

type SearchFormItemProps = {
  onClick: () => void,
};

export const SearchFormItem = ({ onClick }: SearchFormItemProps) => (
  <div className={styles.itemClass} onClick={onClick}>
    <div className={styles.itemIconClass}>
      <FaPaintBrush size={10} />
    </div>
    <div>THING</div>
  </div>
);

export type SearchResultItem = {
  item: any,
  component: any,
};

type Props = {
  filter: (search: string, items: Array<SearchResultItem>) => Array<any>,
  items: Array<SearchResultItem>,
};

const SearchForm = ({ filter, items }: Props) => {
  const [searchInput, setSearchInput] = useState('');
  const results = filter(searchInput, items);
  return (
    <div>
      <header className={styles.headerClass}>
        <Input
          value={searchInput}
          onChangeString={setSearchInput}
          theme={INPUT_THEMES.plain}
          placeholder="Search mixins"
        />
      </header>
      <div className={styles.resultsClass}>
        {results.map(({ component }) => component)}
        {results.length === 0 && <NoResults />}
      </div>
    </div>
  );
};

export default SearchForm;
