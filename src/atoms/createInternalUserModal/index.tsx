import * as yup from 'yup';
import { useState } from 'react';
import { Formik } from 'formik';
import { Container, Content, BtnContainer } from './style';
import { Modal, Button, Input, Picker } from '../../components';
import { H5 } from '../../styles';
import { colors } from '../../utils';
import { Dictionary } from '../../types';

interface RoleOptionsIProps {
  value: string;
  label: string;
}

interface DefaultValuesIProps {
  defaultEmail: string;
  defaultFirstName: string;
  defaultLastName: string;
  defaultRole: string;
}

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  title: string;
  isLoading: boolean;
  onSubmit: (item: Dictionary) => any;
  isSubmittingInternalUser: boolean;
  roleOption: RoleOptionsIProps[];
  actionBtnText: string;
  defaultValues: DefaultValuesIProps;
}

function CreateInternalUserModal({
  isModalVisible,
  closeModal,
  title,
  isLoading,
  onSubmit,
  isSubmittingInternalUser,
  roleOption,
  actionBtnText,
  defaultValues,
}: IProps) {
  const { defaultEmail, defaultFirstName, defaultLastName, defaultRole } = defaultValues;
  const [selectedRole, setSelectedRole] = useState(defaultRole);
  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    role: selectedRole.length < 2 ? yup.string().required('Role is required') : yup.string(),
  });

  return (
    <Modal title={title} isModalVisible={isModalVisible} closeModal={closeModal}>
      {isLoading ? (
        <Container>
          <H5>Please wait loading...</H5>
        </Container>
      ) : (
        <Container>
          <Content>
            <Formik
              initialValues={{
                email: defaultEmail,
                firstName: defaultFirstName,
                lastName: defaultLastName,
                role: defaultRole,
              }}
              enableReinitialize={true}
              validationSchema={schema}
              onSubmit={async (values, { setSubmitting }) => {
                const { email, firstName, lastName, role } = values ?? '';

                const payload = {
                  email: email,
                  first_name: firstName,
                  last_name: lastName,
                  role: selectedRole.length > 2 ? selectedRole : role,
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
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        error={errors.email}
                        backgroundColor={colors.white}
                        normalEmail={true}
                      />
                      <Input
                        label="First Name"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={values.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        backgroundColor={colors.white}
                      />
                      <Input
                        label="Last Name"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={values.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        backgroundColor={colors.white}
                      />

                      <Picker
                        error={errors.role}
                        label="Role"
                        selectedValue={setSelectedRole}
                        placeholder={defaultRole.length > 2 ? defaultRole : 'Select Agent'}
                        options={roleOption}
                        width={'100%'}
                      />
                      <BtnContainer>
                        <Button type="submit" text={actionBtnText} disabled={isSubmittingInternalUser} />
                        <Button
                          secondary
                          color={colors.primary}
                          borderColor={colors.white}
                          onClick={closeModal}
                          text="Cancel"
                          disabled={false}
                        />
                      </BtnContainer>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </Content>
        </Container>
      )}
    </Modal>
  );
}

export default CreateInternalUserModal;
