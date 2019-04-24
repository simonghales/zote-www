// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import PageParser from './components/PageParser/PageParser';
import { usePageBySlug } from '../../../editor/state/hooks/pages';

const PagePreview = (props: {
  match: {
    params: {
      slug?: string,
    },
  },
}) => {
  const slug = props.match.params.slug ? props.match.params.slug : '';
  const page = usePageBySlug(slug);
  if (!page) return null; // todo - return 404
  return <PageParser pageKey={page.key} />;
};

export default withRouter(PagePreview);
