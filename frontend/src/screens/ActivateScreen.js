import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activate } from "../actions/userActions";
import { PRODUCT_TOP_REQUEST } from "../constants/productsConstants";

function ActivateScreen({ location, history }) {
  const { handleSubmit } = useForm();
  const params = useParams();

  const [confActivate, setConfActivate] = useState(false);

  const uid = params.uid;
  const token = params.token;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const onSubmit = () => {
    console.log("Działa aktywowanie użytkownika");
    setConfActivate(PRODUCT_TOP_REQUEST);

    //dispatch(registerUser(data.name, data.email, data.password));
    //dispatch(activate(uid, token));
  };

  useEffect(() => {
    if (confActivate) {
      history.push(redirect);
    }
  }, [confActivate]);

  return (
    <div className="margin-top-from-navbar">
      <div className="activate-title">
        <h2>Aktywowanie konta użytkownika</h2>
      </div>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)} className="form-center">
          <Button
            type="submit"
            variant="primary"
            className="my-3 bnt-block bg-brown rounded"
          >
            Aktywuj konto
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default ActivateScreen;
