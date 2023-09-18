import React, { useState } from 'react';
import { Button, Input, Picker, RichText } from '../../components';
import { Formik } from 'formik';
import { colors, routesPath } from '../../utils';
import { ButtonContainer, MiniInputs } from './style';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
const { SETTINGS } = routesPath;

const NewFaqAtom = ({ setFormvalues }: any) => {
  const [editorContent, setEditorContent] = useState<any>({});

  const navigate = useNavigate();

  const [activePlatform, setActivePlatform] = useState('');

  // This checks to see if there is any text in the textbox
  const formatIsNotValid = !editorContent?.content?.[0].content;

  const schema = yup.object().shape({
    question: yup.string().required('Question is required'),
    solution: formatIsNotValid ? yup.string().required('Content is required') : yup.string(),
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
          const { question } = values;
          setFormvalues({
            question,
            solution: JSON.stringify(editorContent),
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
                <RichText
                  setEditorContent={setEditorContent}
                  editorContent={editorContent}
                  formIsNotValid={formatIsNotValid}
                  error={errors.solution}
                  placeholderText={'Enter answer to the FAQ'}
                  label={'Prosposed Solution'}
                />
                {/* <TextArea
                  label="Prosposed Solution"
                  backgroundColor={colors.white}
                  borderColor={colors.grey}
                  placeholder="Enter answer to the FAQ"
                  value={values.solution}
                  name={'solution'}
                  onChange={handleChange}
                  error={errors.solution}
                /> */}
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
                  <Button type="submit" text="Create Item" formIsNotValid={formatIsNotValid} />
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
