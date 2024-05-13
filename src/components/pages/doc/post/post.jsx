import clsx from 'clsx';
import PropTypes from 'prop-types';

import ReleaseNoteList from 'components/pages/changelog/changelog-list';
import Hero from 'components/pages/changelog/hero';
import Breadcrumbs from 'components/pages/doc/breadcrumbs';
import Content from 'components/shared/content';
import DocFooter from 'components/shared/doc-footer';
import LastUpdatedDate from 'components/shared/last-updated-date';
import NavigationLinks from 'components/shared/navigation-links';
import TableOfContents from 'components/shared/table-of-contents';
// import Pagination from 'components/pages/changelog/pagination';
// import ChangelogFilter from 'components/pages/changelog/changelog-filter';
import { DOCS_BASE_PATH } from 'constants/docs';

// TODO: Add pagination for changelog
const Changelog = ({
  // currentSlug,
  items,
}) => (
  <>
    <Hero />
    {/* <ChangelogFilter currentSlug={currentSlug} /> */}
    <ReleaseNoteList className="mt-4" items={items} />
    {/* {pageCount > 1 && <Pagination currentPageIndex={currentPageIndex} pageCount={pageCount} />} */}
  </>
);

Changelog.propTypes = {
  // currentSlug: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Post = ({
  data: { title, subtitle, enableTableOfContents = false, updatedOn = null },
  content,
  breadcrumbs,
  navigationLinks: { previousLink, nextLink },
  isChangelog = false,
  isFlowPage = false,
  changelogPosts = [],
  currentSlug,
  fileOriginPath,
  tableOfContents,
}) => (
  <>
    <div
      className={clsx(
        'col-span-6 col-start-4 -mx-10 flex flex-col 2xl:mx-5 lg:ml-0 lg:pt-0 md:mx-auto md:pb-[70px] sm:pb-8',
        isFlowPage
          ? '2xl:col-span-9 2xl:col-start-2 xl:col-span-8 xl:col-start-3'
          : '2xl:col-span-7 xl:col-span-9 xl:ml-11 xl:mr-0 xl:max-w-[750px] lg:max-w-none'
      )}
    >
      {breadcrumbs.length > 0 && <Breadcrumbs breadcrumbs={breadcrumbs} />}
      {isChangelog ? (
        <Changelog currentSlug={currentSlug} items={changelogPosts} />
      ) : (
        <article>
          <h1 className="text-[36px] font-semibold leading-tight xl:text-3xl">{title}</h1>
          {subtitle && (
            <p className="my-2 text-xl leading-tight text-gray-new-40 dark:text-gray-new-80">
              {subtitle}
            </p>
          )}
          <Content className="mt-5" content={content} />
          <LastUpdatedDate updatedOn={updatedOn} />
        </article>
      )}

      {!isChangelog && (
        <NavigationLinks
          previousLink={previousLink}
          nextLink={nextLink}
          basePath={DOCS_BASE_PATH}
        />
      )}
      <DocFooter fileOriginPath={fileOriginPath} slug={currentSlug} />
    </div>

    <div className={clsx('col-start-11 col-end-13 -ml-11 h-full 2xl:ml-0 xl:hidden')}>
      <nav className="no-scrollbars sticky bottom-10 top-[104px] max-h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden">
        {enableTableOfContents && <TableOfContents items={tableOfContents} />}
      </nav>
    </div>
  </>
);

Post.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    enableTableOfContents: PropTypes.bool,
    updatedOn: PropTypes.string,
  }).isRequired,
  content: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  navigationLinks: PropTypes.exact({
    previousLink: PropTypes.shape({}),
    nextLink: PropTypes.shape({}),
  }).isRequired,
  isChangelog: PropTypes.bool,
  isFlowPage: PropTypes.bool,
  changelogPosts: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      content: PropTypes.string,
    })
  ),
  currentSlug: PropTypes.string.isRequired,
  fileOriginPath: PropTypes.string.isRequired,
  tableOfContents: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Post;
