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

function LoginScreen({ history }) {
  const [msgEmail, setMsgEmail] = useState(false);
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

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onSubmit = (data) => {
    dispatch(login(data.email, data.password));
    reset();
    //setMsgEmail(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMsgEmail(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [msgEmail]);

  return (
    <div className="margin-top-from-navbar">
      <FormContainer>
        <h1>{t("LoginScreen_title")}</h1>
        {msgEmail && <Message variant="danger">{t(error)}</Message>}
        {loading && <Loader />}

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
              <div className="form-msg-style">{errors.password.message}</div>
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

        <Row>
          <Col>
            {t("LoginScreen_password_reset_forgot_password")}{" "}
            <Link
              to={
                // redirect
                //   ? `/forgotpassword?forgotpassword=${redirect}`
                //   : "/forgotpassword"
                "/reset-password"
              }
            >
              {t("LoginScreen_password_reset")}
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}

export default LoginScreen;
