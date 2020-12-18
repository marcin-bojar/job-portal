import React from 'react';
import * as yup from 'yup';

import FormikDropdownItem from '../components/formik-dropdown-item/formik-dropdown-item.component';

export const categoryOptionsMap = {
  office: 'Praca biurowa',
  driver: 'Kierowca',
  forklift: 'Operator',
  warehouse: 'Praca na magazynie',
};

export const currencyOptionsMap = {
  PLN: 'PLN',
  EUR: 'EUR',
  CZK: 'CZK',
  GBP: 'GBP',
  HUF: 'HUF',
  NOK: 'NOK',
  SEK: 'SEK',
  DKK: 'DKK',
  USD: 'USD',
};

export const contractDropdownOptions = [
  <FormikDropdownItem name="contract" label="Umowa o pracę" />,
  <FormikDropdownItem name="contract" label="B2B" />,
  <FormikDropdownItem name="contract" label="Umowa zlecenie" />,
  <FormikDropdownItem name="contract" label="Umowa o dzieło" />,
  <FormikDropdownItem name="contract" label="Inna" />,
];

export const licenseDropdownOptions = [
  <FormikDropdownItem name="license" label="brak wymagań" />,
  <FormikDropdownItem name="license" label="B" />,
  <FormikDropdownItem name="license" label="B+E" />,
  <FormikDropdownItem name="license" label="C" />,
  <FormikDropdownItem name="license" label="C+E" />,
  <FormikDropdownItem name="license" label="D" />,
  <FormikDropdownItem name="license" label="D+E" />,
];

export const formikInitialValues = {
  salaryProvided: false,
  category: '',
  title: '',
  info: '',
  region: '',
  license: [],
  contract: [],
  system: '',
  salary: {
    value: '',
    fixed: '',
    from: '',
    to: '',
    currency: '',
  },
};

export const AddAdSchema = yup.object().shape({
  salaryProvided: yup.boolean(),
  category: yup
    .string()
    .oneOf(['office', 'driver', 'forklift', 'warehouse'])
    .required('Pole obowiązkowe'),
  region: yup.string().required('Pole obowiązkowe'),
  system: yup.string().required('Pole obowiązkowe'),
  contract: yup.array().min(1, 'Podaj min jedną opcję'),
  license: yup.array().min(1, 'Podaj min jedną opcję'),
  salary: yup.object().when('salaryProvided', {
    is: true,
    then: yup.object().shape({
      value: yup.string().required('Wybierz rodzaj'),

      fixed: yup.number().when('value', {
        is: 'fixed',
        then: yup
          .number()
          .typeError('Podaj liczbę')
          .integer('Podaj liczbę całkowitą')
          .required('Pole obowiązkowe'),
      }),

      from: yup.number().when('value', {
        is: 'range',
        then: yup
          .number()
          .typeError('Podaj liczbę')
          .integer('Podaj liczbę całkowitą')
          .required('Pole obowiązkowe'),
      }),

      to: yup.number().when('value', {
        is: 'range',
        then: yup
          .number()
          .typeError('Podaj liczbę')
          .integer('Podaj liczbę całkowitą')
          .required('Pole obowiązkowe'),
      }),

      currency: yup.string().required('Wybierz walutę'),
    }),
  }),
  title: yup.string().min(5, 'Minimum 5 znaków').required('Pole obowiązkowe'),
  info: yup.string().required('Pole obowiązkowe'),
});
