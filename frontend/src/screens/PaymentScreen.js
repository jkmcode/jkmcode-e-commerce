import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import { useTranslation } from "react-i18next";

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [paymentMethod] = useState("PayPal");

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div className="margin-top-from-navbar">
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">{t("PaymentScreen_title")}</Form.Label>
            <Col>
              <Form.Check
                label="PayPal or Credit Card"
                id="paypal"
                name="paymentMethod"
                checked
                onChange={(e) => savePaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="bg-brown rounded my-3"
          >
            {t("PaymentScreen_btn_country")}
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default PaymentScreen;
