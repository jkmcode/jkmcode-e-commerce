import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { resetPasswordConfirm } from "../actions/userActions";
import { PASSWORD_RESET_CONFIRM_RESET } from "../constants/UserConstants";

import {
  REQUEST_FAILED_WITH_STATUS_CODE_500,
  REQUEST_FAILED_WITH_STATUS_CODE_500_EN,
  REQUEST_FAILED_WITH_STATUS_CODE_400,
  REQUEST_FAILED_WITH_STATUS_CODE_400_TOKEN_USED,
  REQUEST_FAILED_REST_OF_STATUS_CODE,
  PASSWORD_DOES_NOT_MATCH,
} from "../constants/EnvConstans";

function ResetPasswordConfirmScreen({ location, history }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [messagePassword, setMessagePassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");

  const params = useParams();

  const userPasswordConfirmation = useSelector(
    (state) => state.userPasswordConfirmation
  );
  const { error, loading, success } = userPasswordConfirmation;

  const uid = params.uid;
  const token = params.token;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    if (data.confNewPassword !== data.newPassword) {
      setMessagePassword("Password do not match");
    } else {
      dispatch(
        resetPasswordConfirm(uid, token, data.newPassword, data.confNewPassword)
      );
    }
  };

  useEffect(() => {
    if (error) {
      if (error === REQUEST_FAILED_WITH_STATUS_CODE_500) {
        setMessageError(REQUEST_FAILED_WITH_STATUS_CODE_500_EN);
      } else if (error === REQUEST_FAILED_WITH_STATUS_CODE_400) {
        setMessageError(REQUEST_FAILED_WITH_STATUS_CODE_400_TOKEN_USED);
      } else {
        setMessageError(REQUEST_FAILED_REST_OF_STATUS_CODE);
      }
    }

    if (success) {
      setMessageSuccess(PASSWORD_DOES_NOT_MATCH);
    }
  }, [error, success]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (messagePassword) {
        setMessagePassword("");
      }

      if (messageError) {
        setMessageError("");
        dispatch({ type: PASSWORD_RESET_CONFIRM_RESET });
      }

      if (messageSuccess) {
        setMessageSuccess("");
        history.push(redirect);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [messagePassword, messageError, messageSuccess]);

  return (
    <div className="margin-top-from-navbar">
      <FormContainer>
        {messagePassword && (
          <Message variant="danger">{t(messagePassword)}</Message>
        )}
        {messageError && <Message variant="danger">{t(messageError)}</Message>}
        {messageSuccess && (
          <Message variant="success">{t(messageSuccess)}</Message>
        )}
        <h2>Reset password</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="newPassword">
            <Form.Label>New pasword</Form.Label>
            <Form.Control
              type="password"
              placeholder="New pasword"
              {...register("newPassword", {
                required: t("RegisterScreen_required_error_msg_password"),
                minLength: {
                  value: 8,
                  message: t("RegisterScreen_minlength_error_msg_password"),
                },
              })}
              onKeyUp={() => {
                trigger("newPassword");
              }}
              name="newPassword"
            ></Form.Control>
            {errors.newPassword && (
              <div className="form-msg-style">{errors.newPassword.message}</div>
            )}
          </Form.Group>
          <Form.Group controlId="confNewPassword">
            <Form.Label>Confirm new pasword</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new pasword"
              {...register("confNewPassword", {
                required: t("RegisterScreen_required_error_msg_password"),
                minLength: {
                  value: 8,
                  message: t("RegisterScreen_minlength_error_msg_password"),
                },
              })}
              onKeyUp={() => {
                trigger("confNewPassword");
              }}
              name="confNewPassword"
            ></Form.Control>
            {errors.confNewPassword && (
              <div className="form-msg-style">
                {errors.confNewPassword.message}
              </div>
            )}
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="my-3 bnt-block bg-brown rounded"
          >
            Potwierdź
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default ResetPasswordConfirmScreen;
