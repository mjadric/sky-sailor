import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchForm from "./components/SearchForm";
import AuthButtons from "./components/AuthButtons";
import CompanyLogo from "./components/CompanyLogo";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Container>
              <Row className="mt-2">
                <Col className="text-right">
                  <AuthButtons />
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <CompanyLogo />
                </Col>
              </Row>
              <Row className="justify-content-md-center mt-4">
                <Col md={8}>
                  <SearchForm />
                </Col>
              </Row>
            </Container>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
