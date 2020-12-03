import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';

import { createAdStart } from '../../redux/ads/ads.actions';

import FormInputFormik from '../../components/form-input-formik/form-input-formik.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './add-ad.styles.scss';

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
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="add-ad__category">
            <label htmlFor="category">Wybierz kategorię: </label>
            <Field
              id="category"
              name="category"
              as="select"
              value={values.category}
            >
              <option value={null}></option>
              <option value="office">Praca biurowa</option>
              <option value="driver">Kierowca</option>
              <option value="forklift">Operator</option>
              <option value="warehouse">Praca na magazynie</option>
            </Field>
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
                <div className="add-ad__group add-ad__group--grid">
                  <div className="add-ad__group">
                    <Field name="license" type="checkbox" id="B" value="B" />
                    <label htmlFor="B">B</label>
                  </div>
                  <div className="add-ad__group">
                    <Field
                      name="license"
                      type="checkbox"
                      id="B+E"
                      value="B+E"
                    />
                    <label htmlFor="B+E">B+E</label>
                  </div>
                  <div className="add-ad__group">
                    <Field name="license" type="checkbox" id="C" value="C" />
                    <label htmlFor="C">C</label>
                  </div>
                  <p className="grid-title">Wymagane prawo jazdy</p>
                  <div className="add-ad__group">
                    <Field
                      name="license"
                      type="checkbox"
                      id="C+E"
                      value="C+E"
                    />
                    <label htmlFor="C+E">C+E</label>
                  </div>
                  <div className="add-ad__group">
                    <Field name="license" type="checkbox" id="D" value="D" />
                    <label htmlFor="D">D</label>
                  </div>
                  <div className="add-ad__group">
                    <Field
                      name="license"
                      type="checkbox"
                      id="D+E"
                      value="D+E"
                    />
                    <label htmlFor="D+E">D+E</label>
                  </div>
                </div>
              </div>
            </div>
          )}
          {values.category &&
            values.region &&
            values.contract &&
            values.system && (
              <div className="add-ad__content">
                <Field
                  name="title"
                  label="Tytuł"
                  autoComplete="off"
                  width={60}
                  component={FormInputFormik}
                />
                <div className="add-ad__text-editor">
                  <Editor
                    init={{
                      width: '100%',
                      height: '40rem',
                      margin: '0 auto',
                      placeholder: 'Treść ogłoszenia',
                    }}
                    onEditorChange={content => {
                      setFieldValue('info', content);
                    }}
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
