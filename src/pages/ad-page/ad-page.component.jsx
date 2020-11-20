import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { allAdsSelector } from '../../redux/ads/ads.selectors';

import { formatDate } from '../../redux/ads/ads.utils';

import CustomButton from '../../components/custom-button/custom-button.component';

import './ad-page.styles.scss';

const AdPage = ({ allAds, match }) => {
  const adId = match.params.adId;
  const ad = allAds[adId];

  const { title, salary, addedAt, currency, info } = ad;

  return (
    <div className="ad-page">
      <h2 className="ad-page__title">{title}</h2>
      <div className="ad-page__content">
        <div className="ad-page__header">
          <p>
            Dodano: <span>{formatDate(addedAt.seconds)}</span>
          </p>
          <div className="ad-page__salary">
            Wynagrodzenie:
            <span>
              {salary.fixed
                ? ` ${salary.fixed} ${currency}`
                : salary.from && salary.to
                ? ` ${salary.from} - ${salary.to} ${currency}`
                : ' nie podano'}
            </span>
          </div>
        </div>
        <div className="ad-page__details">
          <h3 className="ad-page__description-title">Opis stanowiska:</h3>
          {info}
        </div>
        <div className="ad-page__buttons">
          <CustomButton>Zadzwoń</CustomButton>
          <CustomButton inverted>Napisz wiadomość</CustomButton>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  allAds: allAdsSelector,
});

export default withRouter(connect(mapStateToProps)(AdPage));
