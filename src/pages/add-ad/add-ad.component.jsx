import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';

import { createAdStart } from '../../redux/ads/ads.actions';

import FormInputFormik from '../../components/form-input-formik/form-input-formik.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import CustomTextarea from '../../components/custom-textarea/custom-textarea.component';

import './add-ad.styles.scss';

const AddAd = ({ createAd }) => (
  <div className="add-ad">
    <h2 className="add-ad__title">Dodaj ogłoszenie</h2>
    <Formik
      initialValues={{
        category: 'office',
        title: '',
        description: '',
        region: '',
        license: 'B',
        contract: '',
        system: '',
      }}
      onSubmit={createAd}
    >
      {({ values }) => (
        <Form>
          <div className="add-ad__category">
            <label htmlFor="category">Wybierz kategorię: </label>
            <Field
              id="category"
              name="category"
              as="select"
              value={values.category}
            >
              <option
                value="office"
                style={{ backgroundColor: 'var(--color-office-theme' }}
              >
                Praca biurowa
              </option>
              <option
                value="driver"
                style={{ backgroundColor: 'var(--color-driver-theme' }}
              >
                Kierowca
              </option>
              <option
                value="forklift"
                style={{ backgroundColor: 'var(--color-forklift-theme' }}
              >
                Operator
              </option>
              <option
                value="warehouse"
                style={{ backgroundColor: 'var(--color-warehouse-theme' }}
              >
                Praca na magazynie
              </option>
            </Field>
          </div>
          <div className="add-ad__highlights">
            <h3 className="add-ad__highlights-title">Podstawowe informacje</h3>
            <div className="add-ad__highlights-items">
              <div className="add-ad__group">
                <label htmlFor="license">Prawo jazdy: </label>
                <Field
                  id="license"
                  name="license"
                  as="select"
                  value={values.license}
                >
                  <option value={null}>nie wymagane</option>
                  <option value="B">B</option>
                  <option value="B+E">B+E</option>
                  <option value="C">C</option>
                  <option value="C+E">C+E</option>
                  <option value="D">D</option>
                  <option value="D+E">D+E</option>
                </Field>
              </div>
              <div className="add-ad__group">
                <Field
                  name="region"
                  label="Miejsce pracy"
                  component={FormInputFormik}
                />
              </div>
              <div className="add-ad__group">
                <Field
                  name="contract"
                  label="Rodzaj umowy"
                  component={FormInputFormik}
                />
              </div>
              <div className="add-ad__group">
                <Field
                  name="system"
                  label="System pracy"
                  component={FormInputFormik}
                />
              </div>
            </div>
          </div>
          <Field
            name="title"
            label="Tytuł"
            autoComplete="off"
            width={60}
            component={FormInputFormik}
          />
          <Field
            name="description"
            placeholder="Treść ogłoszenia"
            autoComplete="off"
            component={CustomTextarea}
          />
          <CustomButton type="submit">Dodaj</CustomButton>
        </Form>
      )}
    </Formik>
  </div>
);

const mapDispatchToProps = dispatch => ({
  createAd: adData => dispatch(createAdStart(adData)),
});

export default connect(null, mapDispatchToProps)(AddAd);
