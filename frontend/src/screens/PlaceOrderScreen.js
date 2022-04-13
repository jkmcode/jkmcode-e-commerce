import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { useTranslation } from "react-i18next";

function PlaceOrderScreen({ history }) {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = (
    cart.itemsPrice > 100 || cart.itemsPrice == 0 ? 0 : 10
  ).toFixed(2);
  cart.taxPrice = Number(0.23 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, history]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{t("PlaceOrderScreen_title_shipping")}</h2>
              <p>
                <strong>{t("PlaceOrderScreen_shipping")}: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                {"  "}
                {cart.shippingAddress.postalCode},{"  "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{t("PlaceOrderScreen_title_payment_method")}</h2>
              <p>
                <strong>{t("PlaceOrderScreen_payment_method")}: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{t("PlaceOrderScreen_title_orders_items")}</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">
                  {t("PlaceOrderScreen_empty_cart")}
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={5}>
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{t("PlaceOrderScreen_table_title_order_summary")}</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{t("PlaceOrderScreen_table_items")}:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{t("PlaceOrderScreen_table_shipping")}:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{t("PlaceOrderScreen_table_tax")}:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{t("PlaceOrderScreen_table_total")}:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <div className="d-grid gap-2">
                  <Button
                    type="button"
                    className="btn-block bg-brown rounded"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrder}
                  >
                    Place Order
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <ListGroup.Item className="border-0">
            {error && <Message variant="danger">{error}</Message>}
          </ListGroup.Item>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
