import React, { useEffect, useState } from 'react';
import { Button, CustomUpload, Input, Picker, RadioInput, RichText, StepperInput, TextArea } from '../../components';
import { Formik, useFormikContext } from 'formik';
import { colors, routesPath } from '../../utils';
import { ButtonContainer, MiniInputs, RadioStyle } from './style';
import { H2, H3 } from '../../styles';
import { AiFillFile } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
const { SETTINGS } = routesPath;

const NewFaqAtom = ({ setFormvalues }: any) => {
  const [editorContent, setEditorContent] = useState<any>({});

  const navigate = useNavigate();

  const [activePlatform, setActivePlatform] = useState('');

  const schema = yup.object().shape({
    question: yup.string().required('Question is required'),
    // solution: yup.string().required('Content is required'),
  });

  // This checks to see if there is any text in the textbox
  const formIsNotValid = !editorContent?.content?.[0].content;

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
            <div>
              <InnerForm
                handleChange={handleChange}
                values={values}
                handleSubmit={handleSubmit}
                errors={errors}
                setEditorContent={setEditorContent}
                setActivePlatform={setActivePlatform}
              />
              <ButtonContainer>
                <Button type="submit" text="Create Item" formIsNotValid={formIsNotValid} />
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
          );
        }}
      </Formik>
    </div>
  );
};

const InnerForm = ({ handleChange, values, handleSubmit, errors, setEditorContent, setActivePlatform }: any) => {
  const { values: value, isValid } = useFormikContext();
  console.log(isValid);

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
        <RichText setEditorContent={setEditorContent} />
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
      </div>
    </form>
  );
};
export default NewFaqAtom;
