import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Container, ContainerContent, Content, SwitchCard } from "./style";
import { Button, Input, Switch } from "../../components";
import { colors, spacing } from "../../utils";
import { H2 } from "../../styles";

function Login() {
  const navigate = useNavigate();

  const [switchChecked, setSwitchChecked] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Paasword is required"),
  });
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
      }}>
      {(formikProps) => {
        const { handleChange, values, handleSubmit, errors } = formikProps;

        return (
          <Container>
            <ContainerContent>
              <Content>
                <H2
                  center
                  bold
                  color={colors.primary}
                  style={{ marginBottom: spacing.medium }}>
                  Login
                </H2>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: spacing.medium }}>
                    <Input
                      label='Email'
                      type='email'
                      name='email'
                      placeholder='Email'
                      value={values.email}
                      onChange={handleChange}
                      error={errors.email}
                      backgroundColor={colors.white}
                    />
                  </div>

                  <Input
                    label='Password'
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password}
                    backgroundColor={colors.white}
                  />
                  <SwitchCard>
                    <Switch
                      onChange={() => setSwitchChecked(!switchChecked)}
                      checked={switchChecked}
                      label='Remember me'
                    />
                  </SwitchCard>
                  <Button type='submit' text='Login' disabled={false} />
                </form>
              </Content>
            </ContainerContent>
          </Container>
        );
      }}
    </Formik>
  );
}

export default Login;
