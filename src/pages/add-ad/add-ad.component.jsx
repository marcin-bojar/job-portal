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

import './add-ad.styles.scss';

const AddAdSchema = yup.object().shape({
  category: yup
    .string()
    .oneOf(['office', 'driver', 'forklift', 'warehouse'])
    .required('Pole obowiązkowe'),
  region: yup.string().required('Pole obowiązkowe'),
  system: yup.string().required('Pole obowiązkowe'),
  contract: yup.string().required('Pole obowiązkowe'),
  license: yup.string().oneOf(['none', 'B', 'B+E', 'C', 'C+E', 'D', 'D+E']),
  title: yup.string().min(5, 'Minimum 5 znaków').required('Pole obowiązkowe'),
  info: yup.string().required('Pole obowiązkowe'),
});

const categoryOptionsMap = {
  office: 'Praca biurowa',
  driver: 'Kierowca',
  forklift: 'Operator',
  warehouse: 'Praca na magazynie',
};

const licenseDropdownOptions = [
  <div className="add-ad__group">
    <Field name="license" type="checkbox" id="null" value="none" />
    <label htmlFor="null">brak wymagań</label>
  </div>,
  <div className="add-ad__group">
    <Field name="license" type="checkbox" id="B" value="B" />
    <label htmlFor="B">B</label>
  </div>,
  <div className="add-ad__group">
    <Field name="license" type="checkbox" id="B+E" value="B+E" />
    <label htmlFor="B+E">B+E</label>
  </div>,
  <div className="add-ad__group">
    <Field name="license" type="checkbox" id="C" value="C" />
    <label htmlFor="C">C</label>
  </div>,
  <div className="add-ad__group">
    <Field name="license" type="checkbox" id="C+E" value="C+E" />
    <label htmlFor="C+E">C+E</label>
  </div>,
  <div className="add-ad__group">
    <Field name="license" type="checkbox" id="D" value="D" />
    <label htmlFor="D">D</label>
  </div>,
  <div className="add-ad__group">
    <Field name="license" type="checkbox" id="D+E" value="D+E" />
    <label htmlFor="D+E">D+E</label>
  </div>,
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
                    name="contract"
                    label="Rodzaj umowy"
                    autoComplete="off"
                    component={FormInputFormik}
                  />
                  <ErrorMessage
                    name="contract"
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
                <Dropdown items={licenseDropdownOptions}>
                  Wymagane prawo jazdy
                </Dropdown>
              </div>
            </div>
          )}
          {values.category &&
            values.region &&
            values.contract &&
            values.system && (
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
