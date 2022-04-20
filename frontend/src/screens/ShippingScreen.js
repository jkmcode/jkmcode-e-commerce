import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";
import { useTranslation } from "react-i18next";

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setpostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <div className="margin-top-from-navbar">
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1 className="btn-font-size">{t("ShippingScreen_title")}</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address" className="form-margin">
            <Form.Label className="font-bold">
              {t("ShippingScreen_btn_address")}
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter address"
              className="form-bg rounded"
              value={address ? address : ""}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="city" className="form-margin">
            <Form.Label className="font-bold">
              {t("ShippingScreen_btn_city")}
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter city"
              className="form-bg rounded"
              value={city ? city : ""}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="postalCode" className="form-margin">
            <Form.Label className="font-bold">
              {t("ShippingScreen_postal_code")}
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter postal code"
              className="form-bg rounded"
              value={postalCode ? postalCode : ""}
              onChange={(e) => setpostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Label className="font-bold">
              {t("ShippingScreen_country")}
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter postal code"
              className="form-bg rounded"
              value={country ? country : ""}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="bg-brown rounded my-3"
          >
            {t("ShippingScreen_btn_country")}
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default ShippingScreen;
