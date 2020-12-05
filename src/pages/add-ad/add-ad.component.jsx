import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import * as yup from 'yup';

import { createAdStart } from '../../redux/ads/ads.actions';

import FormInputFormik from '../../components/form-input-formik/form-input-formik.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import CustomTextarea from '../../components/custom-textarea/custom-textarea.component';
import CustomSelect from '../../components/custom-select/custom-select.component';
import FormError from '../../components/form-error/form-error.component';
import Dropdown from '../../components/dropdown/dropdown.component';
import FormikDropdownItem from '../../components/formik-dropdown-item/formik-dropdown-item.component';

import './add-ad.styles.scss';

const AddAdSchema = yup.object().shape({
  category: yup
    .string()
    .oneOf(['office', 'driver', 'forklift', 'warehouse'])
    .required('Pole obowiązkowe'),
  region: yup.string().required('Pole obowiązkowe'),
  system: yup.string().required('Pole obowiązkowe'),
  contract: yup.array().min(1, 'Podaj min jedną opcję'),
  license: yup.array().min(1, 'Podaj min jedną opcję'),
  title: yup.string().min(5, 'Minimum 5 znaków').required('Pole obowiązkowe'),
  info: yup.string().required('Pole obowiązkowe'),
});

const categoryOptionsMap = {
  office: 'Praca biurowa',
  driver: 'Kierowca',
  forklift: 'Operator',
  warehouse: 'Praca na magazynie',
};

const contractDropdownOptions = [
  <FormikDropdownItem name="contract" label="Umowa o pracę" />,
  <FormikDropdownItem name="contract" label="B2B" />,
  <FormikDropdownItem name="contract" label="Umowa zlecenie" />,
  <FormikDropdownItem name="contract" label="Umowa o dzieło" />,
  <FormikDropdownItem name="contract" label="Inna" />,
];

const licenseDropdownOptions = [
  <FormikDropdownItem name="license" label="brak wymagań" />,
  <FormikDropdownItem name="license" label="B" />,
  <FormikDropdownItem name="license" label="B+E" />,
  <FormikDropdownItem name="license" label="C" />,
  <FormikDropdownItem name="license" label="C+E" />,
  <FormikDropdownItem name="license" label="D" />,
  <FormikDropdownItem name="license" label="D+E" />,
];

const AddAd = ({ createAd }) => (
  <div className="add-ad">
    <h2 className="add-ad__title">Dodaj ogłoszenie</h2>
    <Formik
      initialValues={{
        category: '',
        title: '',
        info: '',
        region: '',
        license: '',
        contract: '',
        system: '',
        salary: {
          fixed: null,
          from: null,
          to: null,
        },
      }}
      onSubmit={createAd}
      validationSchema={AddAdSchema}
    >
      {({ values }) => (
        <Form>
          <div className="add-ad__category">
            <div className="add-ad__group">
              <label htmlFor="category">Wybierz kategorię: </label>
              <Field
                id="category"
                name="category"
                optionsMap={categoryOptionsMap}
                component={CustomSelect}
              />
              <ErrorMessage name="category" selectInput component={FormError} />
            </div>
          </div>
          {values.category && (
            <div className="add-ad__highlights">
              <h3 className="add-ad__highlights-title">
                Podstawowe informacje
              </h3>
              <div className="add-ad__highlights-items">
                <div className="add-ad__group">
                  <Field
                    name="region"
                    label="Miejsce pracy"
                    autoComplete="off"
                    component={FormInputFormik}
                  />
                  <ErrorMessage
                    name="region"
                    shortInput
                    component={FormError}
                  />
                </div>
                <div className="add-ad__group">
                  <Field
                    name="system"
                    label="System pracy"
                    autoComplete="off"
                    component={FormInputFormik}
                  />
                  <ErrorMessage
                    name="system"
                    shortInput
                    component={FormError}
                  />
                </div>
                <div className="add-ad__group">
                  <Dropdown items={contractDropdownOptions}>
                    Rodzaj umowy
                  </Dropdown>
                  <ErrorMessage
                    name="contract"
                    dropdownInput
                    component={FormError}
                  />
                </div>
                <div className="add-ad__group">
                  <Dropdown items={licenseDropdownOptions}>
                    Wymagane prawo jazdy
                  </Dropdown>
                  <ErrorMessage
                    name="license"
                    dropdownInput
                    component={FormError}
                  />
                </div>
              </div>
            </div>
          )}
          {values.category &&
            values.region &&
            values.contract &&
            values.system &&
            values.license && (
              <div className="add-ad__content">
                <div className="add-ad__ad-title">
                  <Field
                    name="title"
                    label="Tytuł"
                    autoComplete="off"
                    component={FormInputFormik}
                  />
                  <ErrorMessage name="title" component={FormError} />
                </div>
                <div className="add-ad__group">
                  <Field
                    name="info"
                    autoComplete="off"
                    placeholder="Treść ogłoszenia"
                    component={CustomTextarea}
                  />
                  <ErrorMessage
                    name="info"
                    textareaInput
                    component={FormError}
                  />
                </div>
                <CustomButton type="submit">Dodaj</CustomButton>
              </div>
            )}
        </Form>
      )}
    </Formik>
  </div>
);

const mapDispatchToProps = dispatch => ({
  createAd: adData => dispatch(createAdStart(adData)),
});

export default connect(null, mapDispatchToProps)(AddAd);
