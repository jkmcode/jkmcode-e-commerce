import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { reset_password, email_exist } from "../actions/userActions";
import { useTranslation } from "react-i18next";

import {
  REQUEST_FAILED_WITH_STATUS_CODE_500,
  REQUEST_FAILED_WITH_STATUS_CODE_500_EN,
  REQUEST_FAIL_WITH_STATUS_CODE_404,
  REQUEST_FAIL_WITH_STATUS_CODE_404_EN,
} from "../constants/EnvConstans";

function ResetPassword({ location, history }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const [requestSent, setRequestSent] = useState(false);
  const [msgEmail, setMsgEmail] = useState(false);

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

    // if(error){
    //     if(error===)
    // }
  }, [history, userInfo, redirect, error]);

  const onSubmit = (data) => {
    //dispatch(login(data.email, data.password))
    //reset();
    dispatch(reset_password(data.email));
    dispatch(email_exist(data.email));
    setRequestSent(true);
    setMsgEmail(true);
  };

  if (requestSent) {
    return <Redirect to="/" />;
  }

  // useEffect(() => {
  //     const timeout = setTimeout(() =>{
  //         setMsgEmail(false)
  //     }, 10000)

  //     return () => clearTimeout(timeout)
  // }, [msgEmail])

  return (
    <div className="margin-top-from-navbar">
      <FormContainer>
        <h2>Password Reset</h2>
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

          <Button
            type="submit"
            variant="primary"
            className="bnt-block bg-brown rounded my-3"
          >
            Reset Password
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default ResetPassword;
