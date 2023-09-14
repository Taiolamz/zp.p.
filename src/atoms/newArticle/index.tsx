import React, { useState } from 'react';
import { Button, CustomUpload, Input, TextArea } from '../../components';
import { Formik } from 'formik';
import { colors, routesPath } from '../../utils';
import { ButtonContainer, MiniInputs } from './style';
import { BiImageAdd } from 'react-icons/bi';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Dictionary } from '../../types';
const { SETTINGS } = routesPath;

export interface IPropsInitialValues {
  title: string;
  content: string;
  active_platform: string;
  status: string;
  image: string;
}

export interface IProps {
  onSubmit: (item: Dictionary) => any;
  initialValues?: IPropsInitialValues;
}

const NewArticle = ({ onSubmit, initialValues }: IProps) => {
  const navigate = useNavigate();

  const [imageValue, setImageValue] = useState('');

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
  });

  return (
    <div>
      <Formik
        initialValues={{
          content: initialValues?.content || '',
          title: initialValues?.title || '',
          image: initialValues?.image || '',
        }}
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          const {
            content,
            title,
            // active_platform, status, image
          } = values ?? '';
          const payload = {
            title: title,
            content: content,
            image: imageValue,
          };

          onSubmit(payload);
          setSubmitting(false);
        }}>
        {formikProps => {
          const { handleChange, values, handleSubmit, errors } = formikProps;
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <Input
                  label="Item Title"
                  backgroundColor={colors.white}
                  borderColor={colors.grey}
                  placeholder="Enter Article name"
                  type="text"
                  value={values?.title}
                  name={'title'}
                  onChange={handleChange}
                  error={errors.title}
                />

                <TextArea
                  label="Article Content"
                  backgroundColor={colors.white}
                  borderColor={colors.grey}
                  placeholder="Enter message body"
                  value={values.content}
                  name={'content'}
                  onChange={handleChange}
                  error={errors.content}
                />

                <MiniInputs>
                  <CustomUpload
                    inputMessage={'Attach Item Image'}
                    label={'Attach Image (Optional)'}
                    backgroundColor={colors.white}
                    icon={<BiImageAdd size={30} color={colors.primary} />}
                    setFileValue={setImageValue}
                    name="imageFile"
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

export default NewArticle;
