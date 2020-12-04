import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { allAdsSelector } from '../../redux/ads/ads.selectors';

import { formatDate } from '../../redux/ads/ads.utils';

import CustomButton from '../../components/custom-button/custom-button.component';
import SalaryAmount from '../salary-amount/salary-amount-component';

import './ad-content.styles.scss';
import AdHighlight from '../ad-highlight/ad-highlight.component';

const AdContent = ({ allAds, match }) => {
  const adId = match.params.adId;
  const ad = allAds[adId];

  const {
    title,
    salary,
    addedAt,
    highlights: { region, system, contract, license },
    adSections: { info },
  } = ad;

  return (
    <div className="ad-content">
      <h2 className="ad-content__title">{title}</h2>
      <div className="ad-content__header">
        <p>
          Dodano: <span>{formatDate(addedAt.seconds)}</span>
        </p>
        <div className="ad-content__salary">
          Wynagrodzenie:{' '}
          <span>
            <SalaryAmount salary={salary} notProvidedText=" nie podano" />
          </span>
        </div>
      </div>
      <div className="ad-content__highlights">
        <AdHighlight icon="pin">{region}</AdHighlight>
        <AdHighlight icon="clock">{system}</AdHighlight>
        <AdHighlight icon="contract">{contract}</AdHighlight>
        <AdHighlight icon="licence">{license}</AdHighlight>
      </div>
      <div className="ad-content__details">
        <h3 className="ad-content__description-title">Opis stanowiska:</h3>
        <div className="ad-content__description">
          <pre>{info}</pre>
        </div>
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
