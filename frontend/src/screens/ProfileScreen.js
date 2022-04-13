import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [errorUserUpdate, setErrorUserUpdate] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, error: errorUserUpdateProfile } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

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
    if (data.password != data.passwordConfirm) {
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
        {/* {error && <Message variant='danger'>{error}</Message>} */}
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
              //value ={name}
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
              // value ={email}
              {...register("email", {
                required: t("ProfileScreen_required_error_msg_email"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("ProfileScreen_inproper_pattern_email"),
                },
              })}
              // onChange={(e) => setEmail(e.target.value)}
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

        {/* <Col className='margin-top' md={9}> */}
        {/* <h2 className='font-size'>{t('ProfileScreen_table_orders_title')}</h2>
                    {loadingOrders ? (
                        <Loader/>

                    ) : errorOrders ?(
                        <Message variant='danger'>{errorOrders}</Message>
                    ) : (
                        <Table striped responsive className='table=sm'>
                            <thead>
                                <tr key={orderListMy._id}>
                                    <th>ID</th>
                                    <th>{t('ProfileScreen_table_data')}</th>
                                    <th>{t('ProfileScreen_table_total')}</th>
                                    <th>{t('ProfileScreen_table_paid')}</th>
                                    <th>{t('ProfileScreen_table_delivered')}</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => (
                                    <tr>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0,10)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}</td>
                                        <td>
                                            <LinkContainer to ={`/order/${order._id}`} className='bnt-block bg-brown rounded'>
                                                <Button classname='bg-brown'>{t('ProfileScreen_btn_table_delivered')}</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>    
                    )} */}
        {/* </Col> */}
      </FormContainer>
    </div>
  );
}

export default ProfileScreen;
