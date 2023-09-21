import React, { useEffect, useState } from 'react';
import { Button, CustomUpload, DatePicker, Input, Picker, RadioInput, StepperInput, TextArea } from '../../components';
import { Formik } from 'formik';
import { colors } from '../../utils';
import { ButtonContainer, MiniInput1, MiniInput2, RadioStyle, SingleMiniInput } from './style';
import { H2, H3, H4, H5 } from '../../styles';
import { AiFillFile } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import CustomTimeInput from '../customTimeInput';
import * as yup from 'yup';
import { routesPath } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { Dictionary } from '../../types';

const { SETTINGS } = routesPath;

export interface IPropsInitialValues {
  title: string;
  message: string;
  status: string;
  image: string;
  interval: string;
  delivery_date: string;
  delivery_time: string;
  delivery_meridiem: string;
  type: string;
}

export interface IPropsRadioData {
  id: number;
  label: string;
  value: string;
}

export interface IProps {
  onSubmit: (item: Dictionary) => any;
  initialValues?: IPropsInitialValues;
  requestStatus?: string;
  radioData?: IPropsRadioData[];
  type?: string;
}

const NewNotification = ({ radioData, requestStatus, initialValues, type, onSubmit }: IProps) => {
  const [deliverTime, setDeliverTime] = useState({});

  const [selectedNotificationInterval, setSelectedNotificationInterval] = useState('');

  const [selectedNotificationAction, setSelectedNotificationAction] = useState('');

  const [selectedNotificationReceipients, setSelectedNotificationReceipients] = useState('');

  const [imageValue, setImageValue] = useState('');

  const [recipentFileValue, setRecipentFileValue] = useState('');

  const [deliverDate, setDeliverDate] = useState('');

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    message: yup.string().required('Message is required'),
  });

  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{
          title: initialValues?.title || '',
          message: initialValues?.message || '',
          interval: initialValues?.interval || '',
          delivery_time: initialValues?.delivery_time || '',
          delivery_date: initialValues?.delivery_date || '',
          recipients: initialValues?.title || '',
          image: '',
          type: initialValues?.type || '',
          spreadsheet: '',
        }}
        validationSchema={schema}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          const { title, message } = values;

          const payload = {
            title,
            message,
            interval: selectedNotificationInterval,
            delivery_time: deliverTime,
            recipients: selectedNotificationReceipients,
            image: imageValue,
            spreadsheet: recipentFileValue,
            delivery_date: deliverDate,
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
                  label="Notification Title"
                  backgroundColor={colors.white}
                  borderColor={colors.grey}
                  placeholder="Enter title"
                  type="text"
                  value={values?.title}
                  name={'title'}
                  onChange={handleChange}
                  error={errors.title}
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

                <MiniInput2>
                  <Picker
                    error={errors.interval}
                    label="Notification Interval (Optional)"
                    selectedValue={setSelectedNotificationInterval}
                    marginBottom="0"
                    placeholder="Select an Action"
                    options={[
                      { label: 'One Time', value: 'one time' },
                      { label: 'Weekly', value: 'weekly' },
                      { label: 'Monthly', value: 'monthly' },
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
                    <CustomTimeInput setTimeValue={setDeliverTime} error={errors.delivery_time} />
                  </SingleMiniInput>
                </MiniInput2>
                <RadioStyle>
                  <H3 left>Notification Receipients</H3>
                  <RadioInput data={radioData} selectedValue={setSelectedNotificationReceipients} />
                  {selectedNotificationReceipients === 'specific users' && (
                    <CustomUpload
                      icon={<AiFillFile color={colors.grey} />}
                      inputMessage={'Import File'}
                      backgroundColor={colors.white}
                      setFileValue={setRecipentFileValue}
                    />
                  )}
                </RadioStyle>
                <ButtonContainer>
                  <Button type="submit" text="Create Item" disabled={requestStatus === 'loading' ? true : false} />
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

export default NewNotification;
