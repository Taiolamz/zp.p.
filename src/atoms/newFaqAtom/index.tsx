import React, { useState } from 'react';
import { Button, CustomUpload, Input, Picker, RadioInput, StepperInput, TextArea } from '../../components';
import { Formik } from 'formik';
import { colors, routesPath, spacing } from '../../utils';
import { ButtonContainer, MiniInputs } from './style';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { H2 } from '../../styles';
const { SETTINGS } = routesPath;

const NewFaqAtom = ({ setFormvalues, onClick, tagsList }: any) => {
  const navigate = useNavigate();

  const [activePlatform, setActivePlatform] = useState('');
  const [selectedTags, setSelectedTags] = useState('');

  const schema = yup.object().shape({
    question: yup.string().required('Question is required'),
    solution: yup.string().required('Content is required'),

    platform: activePlatform.length < 2 ? yup.string().required('Select a platform') : yup.string(),
    tag: selectedTags.length < 2 ? yup.string().required('Select a Tag') : yup.string(),
  });

  return (
    <div>
      <Formik
        initialValues={{
          question: '',
          solution: '',
          platform: '',
          tag: '',
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
                <H2 left bold style={{ marginBottom: spacing.small }}>
                  New FAQ
                </H2>
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
                      { label: 'App', value: 'app' },
                      { label: 'Web', value: 'web' },
                    ]}
                  />
                </MiniInputs>

                <div style={{ marginBottom: spacing.large }}>
                  {/* this is for the listings */}
                  <Picker
                    width={100}
                    error={errors.tag}
                    label="Select a Tag"
                    selectedValue={setSelectedTags}
                    marginBottom="0"
                    options={tagsList}
                  />
                </div>

                <ButtonContainer>
                  <Button type="submit" text="Create Item" onClick={onClick} />
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
