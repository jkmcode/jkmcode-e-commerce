import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import { useTranslation } from "react-i18next";
import { USER_LOGIN_RESET } from "../constants/UserConstants";

import {
  REQUEST_FAILED_WITH_STATUS_CODE_500,
  REQUEST_FAIL_WITH_STATUS_CODE_404,
  ACCOUNT_NOT_FOUND,
} from "../constants/EnvConstans";

function LoginScreen({ history }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const redirect = history.location.search
    ? history.location.search.split("=")[1]
    : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  const [error500, setError500] = useState(false);
  const [error404, setError404] = useState(false);
  const [errorNotFound, setErrorNotFound] = useState(false);
  const [errorOther, setErrorOther] = useState(false);

  useEffect(() => {
    if (error) {
      if (error === REQUEST_FAILED_WITH_STATUS_CODE_500) {
        setError500(true);
      } else if (error === REQUEST_FAIL_WITH_STATUS_CODE_404) {
        setError404(true);
      } else if (error === ACCOUNT_NOT_FOUND) {
        setErrorNotFound(true);
      } else {
        setErrorOther(true);
      }
    }
  }, [error, error500, error404, errorNotFound, errorOther]);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onSubmit = (data) => {
    dispatch(login(data.email, data.password));
    reset();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: USER_LOGIN_RESET });
      setErrorNotFound(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [dispatch, errorNotFound]);

  return (
    <div className="margin-top-from-navbar">
      <FormContainer>
        {loading ? (
          <Loader />
        ) : error500 ? (
          <div>
            <Message variant="danger">{t("Error_500_MSG")}</Message>
          </div>
        ) : error404 ? (
          <div>
            <Message variant="danger">{t("Error_404_MSG")}</Message>
          </div>
        ) : errorNotFound ? (
          <div>
            <Message variant="danger">{t("Error_Account_Not_Found")}</Message>
          </div>
        ) : errorOther ? (
          <div>
            <Message variant="danger">{t("Error_Other_MSG")}</Message>
          </div>
        ) : null}

        {!error ? (
          <main>
            <h1>{t("LoginScreen_title")}</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("LoginScreen_form_email_placeholder")}
                  {...register("email", {
                    required: t("LoginScreen_required_error_msg_email"),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t("LoginScreen_inproper_pattern_email"),
                    },
                  })}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                  name="email"
                ></Form.Control>
                {errors.email && (
                  <div className="form-msg-style">{errors.email.message}</div>
                )}
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>{t("LoginScreen_form_password")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("LoginScreen_form_password_placeholder")}
                  {...register("password", {
                    required: t("LoginScreen_required_error_msg_password"),
                    minLength: {
                      value: 8,
                      message: t("LoginScreen_minlength_error_msg_password"),
                    },
                  })}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                  name="password"
                ></Form.Control>
                {errors.password && (
                  <div className="form-msg-style">
                    {errors.password.message}
                  </div>
                )}
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="bnt-block bg-brown rounded my-3"
              >
                {t("LoginScreen_btn_form")}
              </Button>
            </Form>

            <Row>
              <Col>
                {t("LoginScreen_new_customer")}{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  {t("LoginScreen_register")}
                </Link>
              </Col>
            </Row>
          </main>
        ) : null}
      </FormContainer>
    </div>
  );
}

export default LoginScreen;
