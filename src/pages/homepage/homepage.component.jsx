import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { motion, AnimatePresence } from 'framer-motion';

import {
  searchInputSelector,
  filtersAppliedSelector,
  isFetchingSelector,
} from '../../redux/ads/ads.selectors';

import AdsPreview from '../../components/ads-preview/ads-preview.component';
import Search from '../../components/search/search.component';
import SearchResults from '../../components/search-results/search-results.component';
import withLoader from '../../components/with-loader/with-loader.component';

import './homepage.styles.scss';

const AdsPreviewWithLoader = withLoader(AdsPreview);

const HomePage = ({ searchInput, filtersApplied, isFetching }) => {
  const show = !searchInput.length > 0 && !filtersApplied;

  const dataVariants = {
    divided: { height: '40vh' },
    fullscreen: { height: '85vh' },
  };

  const transitions = {
    duration: 0.5,
    ease: [0.18, 1.0, 1, 0.99],
  };

  return (
    <div className={`homepage`}>
      <AnimatePresence initial={false}>
        {isFetching && (
          <motion.div
            key="loading"
            exit={{ scaleY: 0 }}
            transition={{ ease: 'easeIn' }}
            className="black"
          >
            <motion.span>Loading</motion.span>
          </motion.div>
        )}
        {show && (
          <motion.div
            key="header"
            initial={{ height: 0 }}
            animate={{ height: '45vh' }}
            transition={transitions}
            exit={{ height: 0 }}
            className="hero-header"
          >
            <h1>
              <span className="hero-header__color-letter">C</span>argo{' '}
              <span className="hero-header__color-letter">R</span>unner
            </h1>
            <h2>Praca w logistyce</h2>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        key="data"
        variants={dataVariants}
        initial="divided"
        animate={show ? 'divided' : 'fullscreen'}
        transition={transitions}
        className="data-container"
      >
        <div className="data-container__ads">
          {!show ? (
            <SearchResults />
          ) : (
            <AdsPreviewWithLoader isLoading={isFetching} />
          )}
        </div>
        <div className="data-container__search">
          <Search />
        </div>
      </motion.div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  searchInput: searchInputSelector,
  filtersApplied: filtersAppliedSelector,
  isFetching: isFetchingSelector,
});

export default connect(mapStateToProps)(HomePage);
