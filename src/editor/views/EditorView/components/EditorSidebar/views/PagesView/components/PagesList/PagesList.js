// @flow
import React from 'react';
import { connect } from 'react-redux';
import PageItem from './components/PageItem/PageItem';
import { usePages, useSelectedPageKey } from '../../../../../../../../state/hooks/pages';
import type { PageModel } from '../../../../../../../../../data/page/model';
import { getPageName, getPageSlug } from '../../../../../../../../../data/page/state';
import { setSelectedPageKeyRedux } from '../../../../../../../../../redux/ui/reducer';
import { goToEditPageComponent } from '../../../../../../../../routing/actions';

type Props = {
  selectPage: (pageKey: string) => void,
};

const PagesList = ({ selectPage }: Props) => {
  const pages = usePages();
  const selectedPageKey = useSelectedPageKey();
  const handleOnSelect = (pageKey: string) => {
    selectPage(pageKey);
  };
  const handleOnEdit = (pageKey: string) => {
    goToEditPageComponent(pageKey);
  };
  return (
    <div>
      {Object.keys(pages).map(pageKey => {
        const page: PageModel = pages[pageKey];
        return (
          <PageItem
            name={getPageName(page)}
            slug={getPageSlug(page)}
            active={pageKey === selectedPageKey}
            onSelect={() => handleOnSelect(pageKey)}
            onEdit={() => handleOnEdit(pageKey)}
            key={pageKey}
          />
        );
      })}
    </div>
  );
};

const mapDispatchToProps = {
  selectPage: (pageKey: string) => setSelectedPageKeyRedux(pageKey),
};

export default connect(
  null,
  mapDispatchToProps
)(PagesList);
