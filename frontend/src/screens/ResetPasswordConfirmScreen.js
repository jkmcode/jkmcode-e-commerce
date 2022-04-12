import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { resetPasswordConfirm } from "../actions/userActions";

function ResetPasswordConfirmScreen({ location }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [messagePassword, setMessagePassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");

  const params = useParams();

  const userPassword = useSelector((state) => state.userPassword);
  const { error, loading, success } = userPassword;

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
    } else if (error) {
      setMessageError("Błąd sieciowy");
    } else if (success) {
      setMessageSuccess("Hasło zmienione pomyślnie");
    } else {
      dispatch(
        resetPasswordConfirm(uid, token, data.newPassword, data.confNewPassword)
      );
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (messagePassword) {
        setMessagePassword("");
      }

      if (messageError) {
        setMessageError("");
      }

      if (messageSuccess) {
        setMessageSuccess("");
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
