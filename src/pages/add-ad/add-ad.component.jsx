import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';

import { createAdStart } from '../../redux/ads/ads.actions';

import FormInputFormik from '../../components/form-input-formik/form-input-formik.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './add-ad.styles.scss';

const AddAd = ({ createAd }) => (
  <div className="add-ad">
    <h2 className="add-ad__title">Dodaj ogłoszenie</h2>
    <Formik
      initialValues={{
        category: 'office',
        title: '',
        description: '',
      }}
      onSubmit={createAd}
    >
      {({ values }) => (
        <Form>
          <Field name="category" as="select" value={values.category}>
            <option value="office">Praca biurowa</option>
            <option value="driver">Kierowca</option>
            <option value="forklift">Operator</option>
            <option value="warehouse">Praca na magazynie</option>
          </Field>
          <Field name="title" label="Tytuł" component={FormInputFormik} />
          <Field name="description" as="textarea" />
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
