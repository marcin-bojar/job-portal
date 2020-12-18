import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MakeAsyncFunction from 'react-redux-promise-listener';

import { promiseListener } from '../../redux/store';
import AdsActionTypes from '../../redux/ads/ads.types';

import { errorSelector } from '../../redux/ads/ads.selectors';

import FormInputFormik from '../../components/form-input-formik/form-input-formik.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import CustomTextarea from '../../components/custom-textarea/custom-textarea.component';
import CustomSelect from '../../components/custom-select/custom-select.component';
import FormError from '../../components/form-error/form-error.component';
import Dropdown from '../../components/dropdown/dropdown.component';

import {
  categoryOptionsMap,
  currencyOptionsMap,
  contractDropdownOptions,
  licenseDropdownOptions,
  formikInitialValues,
  AddAdSchema,
} from '../../ads-config/ads.config';

import './add-ad.styles.scss';

const AddAd = ({ error }) => {
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
      <MakeAsyncFunction
        listener={promiseListener}
        start={AdsActionTypes.CREATE_AD_START}
        resolve={AdsActionTypes.CREATE_AD_SUCCESS}
        reject={AdsActionTypes.CREATE_AD_FAILURE}
      >
        {asyncSubmit => (
          <Formik
            initialValues={formikInitialValues}
            onSubmit={async (values, { resetForm }) => {
              try {
                await asyncSubmit(values);
                if (!error) resetForm();
              } catch (error) {}
            }}
            validationSchema={AddAdSchema}
          >
            {({
              values,
              validateField,
              setFieldTouched,
              setValues,
              isSubmitting,
            }) => {
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
                        <h3 className="add-ad__highlights-title">
                          Wynagrodzenie
                        </h3>
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
                                    value: '',
                                    fixed: '',
                                    from: '',
                                    to: '',
                                    currency: '',
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
                                    value: '',
                                    fixed: null,
                                    from: null,
                                    to: null,
                                    currency: '',
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
                              <label
                                className="add-ad__salary-label"
                                htmlFor="salary.value"
                              >
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
                              <label
                                className="add-ad__salary-label"
                                htmlFor="salary.currency"
                              >
                                Waluta:{' '}
                              </label>
                              <Field
                                id="salary.currency"
                                name="salary.currency"
                                optionsMap={currencyOptionsMap}
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
                          <CustomButton type="submit" disabled={isSubmitting}>
                            Dodaj
                          </CustomButton>
                        </div>
                      </div>
                    )}
                </Form>
              );
            }}
          </Formik>
        )}
      </MakeAsyncFunction>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  error: errorSelector,
});

export default connect(mapStateToProps)(AddAd);
