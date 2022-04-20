import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/UserConstants";
import { listMyOrders } from "../actions/orderActions";
import { useTranslation } from "react-i18next";

function ProfileScreen({ history }) {
  const [messagePassword, setMessagePassword] = useState("");
  const [errorUserUpdate, setErrorUserUpdate] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, error: errorUserUpdateProfile } = userUpdateProfile;

  const preloadedValues = {
    name: "name",
    email: "email",
  };

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    trigger,
  } = useForm({ defaultValues: preloadedValues });

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        reset({ name: user.name, email: user.email });
      }
    }
  }, [dispatch, reset, history, userInfo, user, success]);

  const submitHandler = (data) => {
    if (data.password !== data.passwordConfirm) {
      setMessagePassword("Password do not match");
      reset({ password: "", passwordConfirm: "" });
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: data.name,
          email: data.email,
          password: data.password,
        })
      );
      history.push("/");
      setMessagePassword("");
      setErrorUserUpdate(true);
      reset({ password: "", passwordConfirm: "" });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessagePassword("");
      setErrorUserUpdate(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [messagePassword, errorUserUpdate]);

  return (
    <div className="margin-top-from-navbar">
      <FormContainer>
        <h1 className="font-size">{t("ProfileScreen_update_form_title")}</h1>
        {messagePassword && (
          <Message variant="danger">{t(messagePassword)}</Message>
        )}
        {errorUserUpdate && (
          <Message variant="danger">{t(errorUserUpdateProfile)}</Message>
        )}
        {loading && <Loader />}

        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group controlId="name">
            <Form.Label>{t("ProfileScreen_update_form_name")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("ProfileScreen_update_form_name_placeholder")}
              {...register("name", {
                required: t("ProfileScreen_required_error_msg_name"),
                pattern: {
                  value: /[A-Za-z -]/,
                  message: t("ProfileScreen_only_letters_error_msg_name"),
                },
                minLength: {
                  value: 2,
                  message: t("ProfileScreen_minlength_error_msg_name"),
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
              placeholder={t("ProfileScreen_update_form_email_placeholder")}
              {...register("email", {
                required: t("ProfileScreen_required_error_msg_email"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("ProfileScreen_inproper_pattern_email"),
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
            <Form.Label>{t("ProfileScreen_update_form_password")}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t("ProfileScreen_update_form_password_placeholder")}
              {...register("password", {
                required: t("ProfileScreen_required_error_msg_password"),
                minLength: {
                  value: 8,
                  message: t("ProfileScreen_minlength_error_msg_password"),
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
              {t("ProfileScreen_update_form_confirm_password")}
            </Form.Label>
            <Form.Control
              type="password"
              placeholder={t(
                "ProfileScreen_update_form_confirm_password_placeholder"
              )}
              {...register("passwordConfirm", {
                required: t("ProfileScreen_required_error_msg_password"),
                minLength: {
                  value: 8,
                  message: t("ProfileScreen_minlength_error_msg_password"),
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
            {t("ProfileScreen_btn_update")}
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default ProfileScreen;
