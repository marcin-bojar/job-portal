import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { allAdsSelector } from '../../redux/ads/ads.selectors';

import { formatDate } from '../../redux/ads/ads.utils';

import CustomButton from '../../components/custom-button/custom-button.component';
import Icon from '../../components/icons/icon-index.component.js';

import './ad-content.styles.scss';

const AdContent = ({ allAds, match }) => {
  const adId = match.params.adId;
  const ad = allAds[adId];

  const { title, salary, addedAt, currency, info, region, system } = ad;

  return (
    <div className="ad-content">
      <h2 className="ad-content__title">{title}</h2>
      <div className="ad-content__header">
        <p>
          Dodano: <span>{formatDate(addedAt.seconds)}</span>
        </p>
        <div className="ad-content__salary">
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
      <div className="ad-content__highlights">
        <div className="highlight">
          <Icon name="pin" />
          <p className="highlight__text">{region}</p>
        </div>
        <div className="highlight">
          <Icon name="clock" />
          <p className="highlight__text">{system}</p>
        </div>
        <div className="highlight">
          <Icon name="contract" />
          <p className="highlight__text">Umowa o pracę</p>
        </div>
        <div className="highlight">
          <Icon name="licence" />
          <p className="highlight__text">C+E</p>
        </div>
      </div>
      <div className="ad-content__details">
        <h3 className="ad-content__description-title">Opis stanowiska:</h3>
        {info}
      </div>
      <div className="ad-content__buttons">
        <CustomButton>Zadzwoń</CustomButton>
        <CustomButton inverted>Napisz wiadomość</CustomButton>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  allAds: allAdsSelector,
});

export default withRouter(connect(mapStateToProps)(AdContent));
