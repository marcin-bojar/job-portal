import React from 'react';

import FormikDropdownItem from '../components/formik-dropdown-item/formik-dropdown-item.component';

export const categoryOptionsMap = {
  office: 'Praca biurowa',
  driver: 'Kierowca',
  forklift: 'Operator',
  warehouse: 'Praca na magazynie',
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
