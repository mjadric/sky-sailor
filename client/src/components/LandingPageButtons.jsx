import { Link } from "react-router-dom";

const LandingPageButtons = () => {
  return (
    <div>
      <Link to="/login">
        <button className="btn btn-primary mr-2">Prijava</button>
      </Link>
      <Link to="/registration">
        <button className="btn btn-success">Registracija</button>
      </Link>
    </div>
  );
};

export default LandingPageButtons;
