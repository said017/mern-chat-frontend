import React, { useContext, useState } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import { useLoginUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";
import { AppContext } from "../context/appContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { socket } = useContext(AppContext);
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  function handleLogin(e) {
    e.preventDefault();
    // login logic
    loginUser({ email, password }).then(({ data }) => {
      if (data) {
        // socket work
        socket.emit("new-user");
        // navigate to the chat
        navigate("/chat");
      }
    });
  }

  return (
    <>
      <section className="login">
        <Container>
          <Row className="align-items-center">
            {/* <Col md={5} className="login__bg"></Col> */}
            <Col
              // md={7}
              className="d-flex align-items-center justify-content-center flex-direction-column"
            >
              <Form
                style={{ width: "80%", maxWidth: 500 }}
                onSubmit={handleLogin}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  {error && <p className="alert alert-danger">{error.data}</p>}
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <Form.Text className="text-muted">
                    <p style={{ color: "#fff", opacity: "70%" }}>
                      We'll never share your email with anyone else.
                    </p>
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </Form.Group>
                <button type="submit" className="vvd">
                  {isLoading ? <Spinner animation="grow" /> : "Login"}
                </button>
                <div className="py-4">
                  <p className="text-center">
                    <span style={{ color: "#fff", opacity: "80%" }}>
                      Don't have an account ?{" "}
                    </span>
                    <Link
                      style={{
                        color: "#fff",
                        textDecorationColor: "#fff",
                        textDecoration: "none",
                      }}
                      to="/signup"
                    >
                      Signup
                    </Link>
                  </p>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Login;
