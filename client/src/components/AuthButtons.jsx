import React from "react";
import { Button } from "react-bootstrap";

const AuthButtons = () => {
  return (
    <div className="mt-3">
      <Button variant="outline-primary" className="mr-2">
        Prijava
      </Button>
      <Button variant="outline-secondary">Registracija</Button>
    </div>
  );
};

export default AuthButtons;
