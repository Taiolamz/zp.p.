import React, { useState } from 'react';
import { Button, CustomUpload, Input, TextArea } from '../../components';
import { Formik } from 'formik';
import { colors } from '../../utils';
import { ButtonContainer, MiniInputs } from './style';
import { BiImageAdd } from 'react-icons/bi';

const NewArticle = ({ radioData }: any) => {
  const [selectedNotificationInterval, setSelectedNotificationInterval] = useState('');

  const [selectedNotificationAction, setSelectedNotificationAction] = useState('');

  const [selectedNotificationReceipients, setSelectedNotificationReceipients] = useState('');

  return (
    <div>
      <Formik
        initialValues={{
          message: '',
          title: '',
          description: '',
          deliveryTime: '',
          escalateTo: '',
          priorityLevel: '',
        }}
        enableReinitialize={true}
        // validationSchema={escalateCchema}
        onSubmit={async (values, { setSubmitting }) => {
          const { title, message, deliveryTime } = values;

          console.log({
            title,
            message,
            selectedNotificationAction,
            selectedNotificationInterval,
            deliveryTime,
            selectedNotificationReceipients,
          });
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
                />

                <TextArea
                  label="Article Content"
                  backgroundColor={colors.white}
                  borderColor={colors.grey}
                  placeholder="Enter message body"
                  value={values.message}
                  name={'content'}
                  onChange={handleChange}
                  error={errors.message}
                />
                <MiniInputs>
                  <CustomUpload
                    inputMessage={'Attach Item Image'}
                    label={'Attach Image (Optional)'}
                    backgroundColor={colors.white}
                    icon={<BiImageAdd size={30} color={colors.primary} />}
                  />
                </MiniInputs>

                <ButtonContainer>
                  <Button type="submit" text="Create Item" />
                  <Button
                    text="Cancel"
                    disabled={false}
                    secondary
                    backgroundColor="red"
                    borderColor="transparent"
                    color={colors.primary}
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
