import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminLandingPage.css';
import { Link } from "react-router-dom";

const AdminLandingPage = () => {
    const squareButtonStyle = {
        width: '150px',
        height: '100px',
    };

    return (
        <div className="background-container container-fluid d-flex flex-column align-items-center justify-content-center text-center">
            <div>
                <h1 className="mb-4 fw-bold text-white">Kontrola letova</h1>
                <h3 className="mb-4 text-white">Dodavajte, mijenjajte ili brišite letove.</h3>
            </div>
            
            <div className="row mt-5">
                <div className="col">
                    {/*PrvaStranica i DrugaStranica su samo tu testno, zapravo će voditi na Tomislavove stranice.*/}
                    <Link to="/PrvaStranica" className="btn btn-primary btn-lg d-flex align-items-center justify-content-center" style={squareButtonStyle}><strong>Dodaj <br />letove</strong></Link>
                </div>
                <div className="col">
                    <Link to="/DrugaStranica" className="btn btn-primary btn-lg d-flex align-items-center justify-content-center" style={squareButtonStyle}><strong>Promijeni<br /> letove</strong></Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLandingPage;




