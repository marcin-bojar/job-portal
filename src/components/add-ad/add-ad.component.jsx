import React, { useState, useRef, useEffect } from 'react';
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

import {
  categoryOptionsMap,
  contractDropdownOptions,
  licenseDropdownOptions,
} from '../../ads-config/ads.config';

import './add-ad.styles.scss';

const AddAdSchema = yup.object().shape({
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
      value: yup.string().oneOf(['fixed', 'range']).required('Wybierz rodzaj'),
      fixed: yup
        .number()
        .typeError('Podaj liczbę')
        .integer('Podaj liczbę całkowitą')
        .required('Pole obowiązkowe'),
      from: yup
        .number()
        .typeError('Podaj liczbę')
        .integer('Podaj liczbę całkowitą')
        .required('Pole obowiązkowe'),
      to: yup
        .number()
        .typeError('Podaj liczbę')
        .integer('Podaj liczbę całkowitą')
        .required('Pole obowiązkowe'),
    }),
  }),
  title: yup.string().min(5, 'Minimum 5 znaków').required('Pole obowiązkowe'),
  info: yup.string().required('Pole obowiązkowe'),
});

const AddAd = ({ createAd }) => {
  const [isSalaryProvided, setIsSalaryProvided] = useState(null);
  const salaryRef = useRef(null);

  useEffect(() => {
    if (isSalaryProvided === true || isSalaryProvided === false) {
      salaryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isSalaryProvided]);

  return (
    <div className="add-ad">
      <h2 className="add-ad__title">Dodaj ogłoszenie</h2>
      <Formik
        initialValues={{
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
        }}
        onSubmit={createAd}
        validationSchema={AddAdSchema}
      >
        {({ values, validateField, setFieldTouched, setValues }) => {
          const validateOnBlur = fieldName => {
            setFieldTouched(fieldName, true);
            validateField(fieldName);
          };

          return (
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
                  <ErrorMessage
                    name="category"
                    selectInput
                    component={FormError}
                  />
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
                    <div
                      className="add-ad__group"
                      onBlur={validateOnBlur.bind(null, 'contract')}
                    >
                      <Dropdown items={contractDropdownOptions}>
                        Rodzaj umowy
                      </Dropdown>

                      <ErrorMessage
                        name="contract"
                        dropdownInput
                        component={FormError}
                      />
                    </div>
                    <div
                      className="add-ad__group"
                      onBlur={validateOnBlur.bind(null, 'license')}
                    >
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
                values.system &&
                values.contract.length !== 0 &&
                values.license.length !== 0 && (
                  <div className="add-ad__salary-container" ref={salaryRef}>
                    <h3 className="add-ad__highlights-title">Wynagrodzenie</h3>
                    <div className="add-ad__salary-decision">
                      <h4 className="add-ad__salary-q">
                        Czy chcesz podać wynagrodzenie?
                      </h4>
                      <div className="add-ad__salary-buttons">
                        <CustomButton
                          inverted={
                            isSalaryProvided === null || !isSalaryProvided
                          }
                          type="button"
                          onClick={() => {
                            setIsSalaryProvided(true);
                            setValues({
                              ...values,
                              salaryProvided: true,
                              salary: {
                                fixed: '',
                                from: '',
                                to: '',
                                value: '',
                              },
                            });
                          }}
                        >
                          Tak
                        </CustomButton>
                        <CustomButton
                          inverted={
                            isSalaryProvided === null || isSalaryProvided
                          }
                          type="button"
                          onClick={() => {
                            setIsSalaryProvided(false);
                            setValues({
                              ...values,
                              salaryProvided: false,
                              salary: {
                                fixed: null,
                                from: null,
                                to: null,
                                value: '',
                              },
                            });
                          }}
                        >
                          Nie
                        </CustomButton>
                      </div>
                    </div>
                    {isSalaryProvided && (
                      <div className="add-ad__salary-inputs">
                        <div className="add-ad__salary-value-select">
                          <label htmlFor="salary.value">
                            Rodzaj wynagrodzenia:{' '}
                          </label>
                          <Field
                            id="salary.value"
                            name="salary.value"
                            optionsMap={{
                              fixed: 'Stała wartość',
                              range: 'Widełki',
                            }}
                            component={CustomSelect}
                          />
                          <ErrorMessage
                            name="salary.value"
                            selectInput
                            component={FormError}
                          />
                        </div>

                        {values.salary.value === 'fixed' && (
                          <div className="add-ad__group">
                            <Field
                              name="salary.fixed"
                              label="Wartość wynagrodzenia"
                              autoComplete="off"
                              component={FormInputFormik}
                            />
                            <ErrorMessage
                              name="salary.fixed"
                              shortInput
                              component={FormError}
                            />
                          </div>
                        )}
                        {values.salary.value === 'range' && (
                          <div className="add-ad__range">
                            <div
                              className="add-ad__group"
                              style={{ margin: '0' }}
                            >
                              <Field
                                name="salary.from"
                                label="Od"
                                autoComplete="off"
                                component={FormInputFormik}
                              />
                              <ErrorMessage
                                name="salary.from"
                                shortInput
                                component={FormError}
                              />
                            </div>
                            <div className="add-ad__group">
                              <Field
                                name="salary.to"
                                label="Do"
                                autoComplete="off"
                                component={FormInputFormik}
                              />
                              <ErrorMessage
                                name="salary.to"
                                shortInput
                                component={FormError}
                              />
                            </div>
                          </div>
                        )}
                        <div className="add-ad__group">
                          <label htmlFor="salary.currency">Waluta: </label>
                          <Field
                            name="salary.currency"
                            optionsMap={{ PLN: 'PLN', EUR: 'EUR' }}
                            autoComplete="off"
                            component={CustomSelect}
                          />
                          <ErrorMessage
                            name="salary.currency"
                            selectInput
                            component={FormError}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              {values.category &&
                values.region &&
                values.system &&
                values.contract.length !== 0 &&
                values.license.length !== 0 &&
                isSalaryProvided !== null && (
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
                    <div className="add-ad__buttons-wrapper">
                      <CustomButton type="submit">Dodaj</CustomButton>
                    </div>
                  </div>
                )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  createAd: adData => dispatch(createAdStart(adData)),
});

export default connect(null, mapDispatchToProps)(AddAd);
