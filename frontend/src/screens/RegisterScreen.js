import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { registerUser } from "../actions/userActions";
import { useTranslation } from "react-i18next";
import { USER_REGISTER_RESET } from "../constants/UserConstants";
import { scroller } from "react-scroll";

import {
  REQUEST_FAILED_WITH_STATUS_CODE_500,
  REQUEST_FAILED_WITH_STATUS_CODE_500_EN,
  REQUEST_FAIL_WITH_STATUS_CODE_404,
  REQUEST_FAIL_WITH_STATUS_CODE_404_EN,
  REQUEST_FAILED_WITH_STATUS_CODE_400,
  REQUEST_FAILED_WITH_STATUS_CODE_400_EN,
} from "../constants/EnvConstans";

function RegisterScreen({ location, history }) {
  const [msgEmail, setMsgEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo, success } = userRegister;

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    trigger,
  } = useForm();

  useEffect(() => {
    if (userInfo) {
      //history.push(redirect);
    }

    if (error === REQUEST_FAILED_WITH_STATUS_CODE_500) {
      setMsgEmail(REQUEST_FAILED_WITH_STATUS_CODE_500_EN);
    } else if (error === REQUEST_FAIL_WITH_STATUS_CODE_404) {
      setMsgEmail(REQUEST_FAIL_WITH_STATUS_CODE_404_EN);
    } else if (error === REQUEST_FAILED_WITH_STATUS_CODE_400) {
      setMsgEmail(REQUEST_FAILED_WITH_STATUS_CODE_400_EN);
    }
  }, [history, userInfo, redirect, error]);

  const onSubmit = (data) => {
    scroller.scrollTo("navbar", { smooth: true, offset: -200, duration: 10 });
    if (data.password != data.passwordConfirm) {
      setMessagePassword("Password do not match");
    } else {
      dispatch(registerUser(data.name, data.email, data.password));
      reset();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      //setMsgEmail("");
      setMessagePassword("");
      if (error) {
        dispatch({ type: USER_REGISTER_RESET });
        setMsgEmail("");
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [msgEmail, messagePassword, success, error]);

  return (
    <div className="margin-top-from-navbar">
      {!success ? (
        <FormContainer>
          {messagePassword && (
            <Message variant="danger">{t(messagePassword)}</Message>
          )}
          {msgEmail && <Message variant="danger">{msgEmail}</Message>}
          {loading && <Loader />}
          <h1>{t("RegisterScreen_title")}</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              <Form.Label>{t("RegisterScreen_form_name")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("RegisterScreen_form_name_placeholder")}
                {...register("name", {
                  required: t("RegisterScreen_required_error_msg_name"),
                  minLength: {
                    value: 2,
                    message: t("RegisterScreen_minlength_error_msg_name"),
                  },
                  pattern: {
                    value: /[A-Za-z -]/,
                    message: t("RegisterScreen_only_letters_error_msg_name"),
                  },
                })}
                onKeyUp={() => {
                  trigger("name");
                }}
                name="name"
              ></Form.Control>
              {errors.name && (
                <div className="form-msg-style">{errors.name.message}</div>
              )}
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("RegisterScreen_form_email_placeholder")}
                {...register("email", {
                  required: t("RegisterScreen_required_error_msg_email"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t("RegisterScreen_inproper_pattern_email"),
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
              <Form.Label>{t("RegisterScreen_form_password")}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t("RegisterScreen_form_password_placeholder")}
                {...register("password", {
                  required: t("RegisterScreen_required_error_msg_password"),
                  minLength: {
                    value: 8,
                    message: t("RegisterScreen_minlength_error_msg_password"),
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

            <Form.Group controlId="passwordConfirm">
              <Form.Label>
                {t("RegisterScreen_from_confirm_password")}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder={t("RegisterScreen_form_password_placeholder")}
                {...register("passwordConfirm", {
                  required: t("RegisterScreen_required_error_msg_password"),
                  minLength: {
                    value: 8,
                    message: t("RegisterScreen_minlength_error_msg_password"),
                  },
                })}
                onKeyUp={() => {
                  trigger("passwordConfirm");
                }}
                name="passwordConfirm"
              ></Form.Control>
              {errors.passwordConfirm && (
                <div className="form-msg-style">
                  {errors.passwordConfirm.message}
                </div>
              )}
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="my-3 bnt-block bg-brown rounded"
            >
              {t("RegisterScreen_btn_register")}
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              {t("RegisterScreen_have_an_account")}{" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                {t("RegisterScreen_sign_in")}
              </Link>
            </Col>
          </Row>
        </FormContainer>
      ) : (
        <div className="title">
          <h2>
            Email has been sent. Please click to the link in order to activate
            user account.
          </h2>
        </div>
      )}
    </div>
  );
}

export default RegisterScreen;
