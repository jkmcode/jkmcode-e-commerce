import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activate } from "../actions/userActions";
import { PRODUCT_TOP_REQUEST } from "../constants/productsConstants";
import Message from "../components/Message";
import { ACTIVATE_RESET } from "../constants/UserConstants";
import Loader from "../components/Loader";

function ActivateScreen({ location, history }) {
  const { handleSubmit } = useForm();
  const params = useParams();

  const [confActivate, setConfActivate] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const userActivate = useSelector((state) => state.userActivate);
  const { error, loading, success, activationInfo } = userActivate;

  const uid = params.uid;
  const token = params.token;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const onSubmit = () => {
    setConfActivate(true);

    //dispatch(registerUser(data.name, data.email, data.password));
    dispatch(activate(uid, token));
  };

  useEffect(() => {
    if (success) {
      history.push(redirect);
    }

    if (error) {
      if (error === "Stale token for given user.") {
        setErrorMsg("Token dla użytkownika jest nieaktywny lub nieprawidłowy.");
      } else {
        setErrorMsg(
          "Błąd sieciowy. Konto nie zostało aktywowane. Spróbuj ponownie"
        );
      }
    }
  }, [success, error]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (error) {
        dispatch({ type: ACTIVATE_RESET });
        setErrorMsg("");
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className="margin-top-from-navbar">
      <div className="activate-title">
        {loading && <Loader />}
        {errorMsg && (
          <Message className="msg-center" variant="danger">
            {errorMsg}
          </Message>
        )}
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
