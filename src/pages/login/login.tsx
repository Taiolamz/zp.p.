import * as yup from "yup";
import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Container, ContainerContent, Content, SwitchCard } from "./style";
import { Button, Input, Switch } from "../../components";
import { colors, spacing } from "../../utils";
import { H2 } from "../../styles";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { loginRequest } from "../../redux/slice";
import { routesPath } from "../../utils";
import Cookies from "js-cookie";

const { DASHBOARD, REMEMBERUSER, TOKEN } = routesPath;
function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [switchChecked, setSwitchChecked] = useState(false);
  const [rememberedUserEmail, setRememberedUserEmail] = useState("");
  const loginState = useAppSelector((state) => state.login);

  const { status } = loginState;

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  useLayoutEffect(() => {
    const cookiesEmail = Cookies.get(REMEMBERUSER);

    if (typeof cookiesEmail === "string" && cookiesEmail.length > 4) {
      setSwitchChecked(true);
      setRememberedUserEmail(cookiesEmail);
    } else {
      setSwitchChecked(false);
      setRememberedUserEmail("");
    }
  }, []);

  // using this or real api call
  useEffect(() => {
    const cookiesToken = Cookies.get(TOKEN);

    if (cookiesToken !== undefined) {
      navigate(DASHBOARD);
    }
  }, [loginState]);

  return (
    <Formik
      initialValues={{ email: rememberedUserEmail, password: "" }}
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
                  <Button
                    type='submit'
                    text='Login'
                    disabled={status === "loading" ? true : false}
                  />
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
