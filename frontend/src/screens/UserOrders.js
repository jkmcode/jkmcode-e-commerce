import React from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function UserOrders() {
  const { t } = useTranslation();

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  return (
    <div className="margin-top-from-navbar">
      <h2 className="font-size">{t("ProfileScreen_table_orders_title")}</h2>
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant="danger">{errorOrders}</Message>
      ) : (
        <Table striped responsive className="table=sm">
          <thead>
            <tr key={orderListMy._id}>
              <th>ID</th>
              <th>{t("ProfileScreen_table_data")}</th>
              <th>{t("ProfileScreen_table_total")}</th>
              <th>{t("ProfileScreen_table_paid")}</th>
              <th>{t("ProfileScreen_table_delivered")}</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer
                    to={`/order/${order._id}`}
                    className="bnt-block bg-brown rounded"
                  >
                    <Button classname="bg-brown">
                      {t("ProfileScreen_btn_table_delivered")}
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserOrders;
