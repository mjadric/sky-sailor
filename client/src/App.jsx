import { Container, Row, Col } from "react-bootstrap";
import SearchForm from "./components/SearchForm";
import CompanyLogo from "./components/CompanyLogo";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPageButtons from "./components/LandingPageButtons";
import LoginForm from "./pages/Login";
import RegistrationForm from "./pages/Registration";
import ResultsPage from "./pages/Results/ResultsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Container>
              <Row className="justify-content-md-start mt-4 ml-2">
                <Col md={8}>
                  <LandingPageButtons />
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
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/results-container" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
