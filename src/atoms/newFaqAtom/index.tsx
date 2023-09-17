import React, { useState } from 'react';
import { Button, CustomUpload, Input, Picker, RadioInput, RichText, StepperInput, TextArea } from '../../components';
import { Formik } from 'formik';
import { colors, routesPath } from '../../utils';
import { ButtonContainer, MiniInputs, RadioStyle } from './style';
import { H2, H3 } from '../../styles';
import { AiFillFile } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
const { SETTINGS } = routesPath;

const NewFaqAtom = ({ setFormvalues }: any) => {
  const navigate = useNavigate();

  const [activePlatform, setActivePlatform] = useState('');

  const schema = yup.object().shape({
    question: yup.string().required('Question is required'),
    solution: yup.string().required('Content is required'),
  });

  return (
    <div>
      <Formik
        initialValues={{
          question: '',
          solution: '',
          platform: '',
        }}
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          const { question, solution } = values;
          setFormvalues({
            question,
            solution,
            activePlatform,
          });
          setSubmitting(false);
        }}>
        {formikProps => {
          const { handleChange, values, handleSubmit, errors } = formikProps;
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <Input
                  label="Frequently Asked Question"
                  backgroundColor={colors.white}
                  borderColor={colors.grey}
                  placeholder="Enter  Question"
                  type="text"
                  value={values?.question}
                  name={'question'}
                  onChange={handleChange}
                  error={errors.question}
                />
                <RichText />
                <TextArea
                  label="Prosposed Solution"
                  backgroundColor={colors.white}
                  borderColor={colors.grey}
                  placeholder="Enter answer to the FAQ"
                  value={values.solution}
                  name={'solution'}
                  onChange={handleChange}
                  error={errors.solution}
                />
                <MiniInputs>
                  <Picker
                    error={errors.platform}
                    label="Select a Platform"
                    selectedValue={setActivePlatform}
                    marginBottom="0"
                    options={[
                      { label: 'Low', value: 'low' },
                      { label: 'Medium', value: 'medium' },
                      { label: 'High', value: 'high' },
                    ]}
                  />
                </MiniInputs>

                <ButtonContainer>
                  <Button type="submit" text="Create Item" />
                  <Button
                    onClick={() => navigate(SETTINGS)}
                    text="Cancel"
                    disabled={false}
                    secondary
                    backgroundColor="red"
                    borderColor="transparent"
                    color={colors.primary}
                    boxShadow="none"
                  />
                </ButtonContainer>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewFaqAtom;
