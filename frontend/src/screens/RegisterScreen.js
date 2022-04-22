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
  REQUEST_FAIL_WITH_STATUS_CODE_404,
  REQUEST_FAILED_WITH_STATUS_CODE_400,
} from "../constants/EnvConstans";

function RegisterScreen({ location, history }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  console.log("redirect", redirect);
  console.log("location", location);
  console.log("history", history);

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo, success } = userRegister;

  const [messagePassword, setMessagePassword] = useState(false);
  const [error500, setError500] = useState(false);
  const [error404, setError404] = useState(false);
  const [error400, setError400] = useState(false);
  const [errorOther, setErrorOther] = useState(false);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    trigger,
  } = useForm();

  useEffect(() => {
    if (success) {
      history.push(redirect);
    }
    if (error) {
      if (error === REQUEST_FAILED_WITH_STATUS_CODE_500) {
        setError500(true);
      } else if (error === REQUEST_FAIL_WITH_STATUS_CODE_404) {
        setError404(true);
      } else if (error === REQUEST_FAILED_WITH_STATUS_CODE_400) {
        setError400(true);
      } else {
        setErrorOther(true);
      }
    }
  }, [history, userInfo, redirect, error, success]);

  const onSubmit = (data) => {
    scroller.scrollTo("navbar", { smooth: true, offset: -200, duration: 10 });
    if (data.password !== data.passwordConfirm) {
      setMessagePassword(true);
    } else {
      dispatch(registerUser(data.name, data.email, data.password));
      reset();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessagePassword(false);
      if (error) {
        dispatch({ type: USER_REGISTER_RESET });
        setError500(false);
        setError404(false);
        setError400(false);
        setErrorOther(false);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [dispatch, messagePassword, success, error]);

  return (
    <div className="margin-top-from-navbar">
      <FormContainer>
        {messagePassword && (
          <Message variant="danger">
            {t("Error_password_does_not_match")}
          </Message>
        )}
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
        ) : error400 ? (
          <div>
            <Message variant="danger">{t("Error_400_MSG")}</Message>
          </div>
        ) : errorOther ? (
          <div>
            <Message variant="danger">{t("Error_Other_MSG")}</Message>
          </div>
        ) : null}
        {!error ? (
          <main>
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
                  <div className="form-msg-style">
                    {errors.password.message}
                  </div>
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
          </main>
        ) : null}
      </FormContainer>
    </div>
  );
}

export default RegisterScreen;
