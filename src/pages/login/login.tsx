import * as yup from "yup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Container, ContainerContent, Content, SwitchCard } from "./style";
import { Button, Input, Switch } from "../../components";
import { colors, spacing, showMessage } from "../../utils";
import { H2 } from "../../styles";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { loginRequest, loginReset } from "../../redux/slice";
import { routesPath } from "../../utils";
import Cookies from "js-cookie";

const { DASHBOARD, TOKEN } = routesPath;
function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [switchChecked, setSwitchChecked] = useState(false);

  const loginState = useAppSelector((state) => state.login);

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  // using this or real api call
  // useEffect(() => {
  //   if (loginState.status === "failed") {
  //     showMessage({ type: "error", message: "Invalid username or password" });
  //   }
  //   if (loginState.status === "succeeded") {
  //     navigate(DASHBOARD);
  //   }
  // }, [loginState]);

  const handleToast = () => {
    showMessage({
      type: "error",
      message: "Login Success",
    });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        const { email, password } = values;
        const payload = {
          email: email.trim(),
          password: password.trim(),
          rememberUser: switchChecked,
        };
        await dispatch(loginRequest(payload));

        if (email === "test@test.com" && password === "P@ssword") {
          navigate(DASHBOARD);
        } else {
          showMessage({
            type: "error",
            message: "Invalid username or password",
          });
        }
        setSubmitting(false);
      }}>
      {(formikProps) => {
        const { handleChange, values, handleSubmit, errors } = formikProps;
        return (
          <Container>
            <ContainerContent>
              <Content>
                <H2
                  onClick={handleToast}
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
