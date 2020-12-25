import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import slideInAdItem from '../../framer-motion/variants/slide-in-ad-item';

import SalaryAmount from '../salary-amount/salary-amount-component';

import { formatDate } from '../../redux/ads/ads.utils';

import './ads-preview-item.styles.scss';

const AdsPreviewItem = ({
  title,
  highlights: { region },
  salary,
  addedAt,
  category,
  id,
  custom,
}) => (
  <motion.li
    variants={slideInAdItem}
    animate={'visible'}
    initial={'hidden'}
    custom={custom}
    className="ads-preview__list-item"
  >
    <Link
      to={`/ads/${id}`}
      className={`ads-preview-item ads-preview-item--${category}`}
    >
      <div className="ads-preview-item__block">
        <h3 className="ads-preview-item__title">{title}</h3>
        <p className="ads-preview-item__region">{region.toUpperCase()}</p>
      </div>
      <div className="ads-preview-item__block ads-preview-item__block--column">
        {salary ? (
          <div className="ads-preview-item__salary">
            {<SalaryAmount salary={salary} notProvidedText={null} />}
          </div>
        ) : null}
        <p className="ads-preview-item__added">{formatDate(addedAt.seconds)}</p>
      </div>
    </Link>
  </motion.li>
);

export default AdsPreviewItem;
