import React, { useState } from 'react';
import { Button, CustomUpload, DatePicker, Input, Picker, RadioInput, StepperInput, TextArea } from '../../components';
import { Formik } from 'formik';
import { colors } from '../../utils';
import { ButtonContainer, MiniInput1, MiniInput2, RadioStyle, SingleMiniInput } from './style';
import { H2, H3, H4, H5 } from '../../styles';
import { AiFillFile } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import CustomTimeInput from '../customTimeInput';

const NewNotification = ({ radioData, setFormvalues }: any) => {
  const [deliverTime, setDeliverTime] = useState({});

  const [selectedNotificationInterval, setSelectedNotificationInterval] = useState('');

  const [selectedNotificationAction, setSelectedNotificationAction] = useState('');

  const [selectedNotificationReceipients, setSelectedNotificationReceipients] = useState('');

  const [imageValue, setImageValue] = useState('');

  const [recipentFileValue, setRecipentFileValue] = useState('');

  const [deliverDate, setDeliverDate] = useState('');

  console.log(deliverTime);

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
          deliverDate: '',
        }}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          const { title, message } = values;

          setFormvalues({
            title,
            message,
            selectedNotificationAction,
            selectedNotificationInterval,
            deliverTime,
            selectedNotificationReceipients,
            imageValue,
            recipentFileValue,
            deliverDate,
          });
          setSubmitting(false);
        }}>
        {formikProps => {
          const { handleChange, values, handleSubmit, errors } = formikProps;
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <Input
                  label="Notification Title"
                  backgroundColor={colors.white}
                  borderColor={colors.grey}
                  placeholder="Enter title"
                  type="text"
                  value={values?.title}
                  name={'title'}
                  onChange={handleChange}
                />

                <TextArea
                  label="Notification Message"
                  backgroundColor={colors.white}
                  borderColor={colors.grey}
                  placeholder="Enter message body"
                  value={values.message}
                  name={'message'}
                  onChange={handleChange}
                  error={errors.message}
                />
                <MiniInput1>
                  <CustomUpload
                    inputMessage={'Click here to attach image'}
                    label={'Attach Image (Optional)'}
                    backgroundColor={colors.white}
                    setFileValue={setImageValue}
                    icon={<BiImageAdd size={30} color={colors.primary} />}
                  />

                  <Picker
                    error={errors.priorityLevel}
                    label="Notification Interval (Optional)"
                    selectedValue={setSelectedNotificationInterval}
                    marginBottom="0"
                    placeholder="Select an Action"
                    options={[
                      { label: 'Low', value: 'low' },
                      { label: 'Medium', value: 'medium' },
                      { label: 'High', value: 'high' },
                    ]}
                  />
                </MiniInput1>
                <MiniInput2>
                  <Picker
                    error={errors.priorityLevel}
                    label="Notification Action (Optional)"
                    selectedValue={setSelectedNotificationAction}
                    placeholder="Select an Action"
                    marginBottom="0"
                    options={[
                      { label: 'Low', value: 'low' },
                      { label: 'Medium', value: 'medium' },
                      { label: 'High', value: 'high' },
                    ]}
                  />
                  <SingleMiniInput>
                    <H5 left semiBold color={colors.grey}>
                      Select Delivery Date (Optional)
                    </H5>
                    <DatePicker selectedDate={setDeliverDate} />
                  </SingleMiniInput>
                  <SingleMiniInput>
                    <H5 left color={colors.grey} semiBold>
                      Enter Delivery Time
                    </H5>
                    <CustomTimeInput setTimeValue={setDeliverTime} />
                  </SingleMiniInput>
                </MiniInput2>
                <RadioStyle>
                  <H3 left>Notification Receipients</H3>
                  <RadioInput data={radioData} selectedValue={setSelectedNotificationReceipients} />
                  <CustomUpload
                    icon={<AiFillFile color={colors.grey} />}
                    inputMessage={'Import File'}
                    backgroundColor={colors.white}
                    setFileValue={setRecipentFileValue}
                  />
                </RadioStyle>
                <ButtonContainer>
                  <Button
                    type="submit"
                    text="Create Item"
                    //   disabled={createEscalationTicketStatus === 'loading' ? true : false}
                  />
                  <Button
                    // onClick={handleCloseEscalateModal}
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

export default NewNotification;
