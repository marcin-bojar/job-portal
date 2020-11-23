import React from 'react';

const SalaryAmount = ({ salary, notProvidedText }) => {
  const { fixed, from, to, currency } = salary;
  return (
    <p className="salary-amount">
      {fixed
        ? `${fixed} ${currency}`
        : from && to
        ? `${from} - ${to} ${currency}`
        : notProvidedText}
    </p>
  );
};

export default SalaryAmount;
