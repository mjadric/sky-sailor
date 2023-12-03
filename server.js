//importamo sve dependecyje
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express(); //kreiramo instancu express poslužitelja
app.use(cors());
app.use(express.json()); //middleware

//povezivanje na bazu
const bazaPodataka = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'Informatika1409',
    database: 'aviokompanija'
})

//GET i POST zahtjevi
app.get('/', (re, res) => {
    return res.json("Backend dio aplikacije");
})

app.get('/countries', (req, res) => {
    const sqlUpit = "SELECT * FROM COUNTRY";
    bazaPodataka.query(sqlUpit, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/countries', (req, res) => {
    const countries = req.body;

    const sqlUpit = "INSERT INTO COUNTRY (name) VALUES ?";
    
    //izvlačenje potrebnih podataka iz svakog objekta u nizu countries
    const values = countries.map(country => [country.name]);

    //izvođenje SQL upita s parametrima
    bazaPodataka.query(sqlUpit, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: `Greška prilikom unosa država.` });
        }

        console.log('Uspješno dodane države.');
        return res.json({ message: 'Podaci su uspješno uneseni.' });
    });
});

//Ostalo je sve na istu shemu kao i prije
app.get('/towns', (req, res) => {
    const sqlUpit = "SELECT * FROM TOWN";
    bazaPodataka.query(sqlUpit, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/towns', (req, res) => {
    const towns = req.body;

    const sqlUpit = "INSERT INTO TOWN (name, country_ID) VALUES ?";
    
    const values = towns.map(town => [town.name, town.country_ID]);

    bazaPodataka.query(sqlUpit, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: `Greška prilikom unosa gradova.` });
        }

        console.log('Uspješno dodani gradovi.');
        return res.json({ message: 'Podaci su uspješno uneseni.' });
    });
});

app.get('/airports', (req, res) => {
    const sqlUpit = "SELECT * FROM AIRPORT";
    bazaPodataka.query(sqlUpit, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/airports', (req, res) => {
    const airports = req.body;

    const sqlUpit = "INSERT INTO AIRPORT (town_ID) VALUES ?";
    
    const values = airports.map(airport => [airport.town_ID]);

    bazaPodataka.query(sqlUpit, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: `Greška prilikom unosa zračnih luka.` });
        }

        console.log('Uspješno dodane zračne luke.');
        return res.json({ message: 'Podaci su uspješno uneseni.' });
    });
});

app.get('/planes', (req, res) => {
    const sqlUpit = "SELECT * FROM PLANE";
    bazaPodataka.query(sqlUpit, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/planes', (req, res) => {
    const planes = req.body;

    const sqlUpit = "INSERT INTO PLANE (numberOfSeats) VALUES ?";
    
    const values = planes.map(plane => [plane.numberOfSeats]);

    bazaPodataka.query(sqlUpit, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: `Greška prilikom unosa aviona.` });
        }

        console.log('Uspješno dodani avioni.');
        return res.json({ message: 'Podaci su uspješno uneseni.' });
    });
});

app.get('/travelClasses', (req, res) => {
    const sqlUpit = "SELECT * FROM TRAVELCLASS";
    bazaPodataka.query(sqlUpit, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/travelClasses', (req, res) => {
    const travelClasses = req.body;

    const sqlUpit = "INSERT INTO TRAVELCLASS (name) VALUES ?";
    
    const values = travelClasses.map(travelClass => [travelClass.name]);

    bazaPodataka.query(sqlUpit, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: `Greška prilikom unosa putničkih klasa.` });
        }

        console.log('Uspješno dodane putničke klase.');
        return res.json({ message: 'Podaci su uspješno uneseni.' });
    });
});

app.get('/seats', (req, res) => {
    const sqlUpit = "SELECT * FROM SEAT";
    bazaPodataka.query(sqlUpit, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/accounts', (req, res) => {
    const sqlUpit = "SELECT * FROM ACCOUNT";
    bazaPodataka.query(sqlUpit, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/reservations', (req, res) => {
    const sqlUpit = "SELECT * FROM RESERVATION";
    bazaPodataka.query(sqlUpit, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/timezones', (req, res) => {
    const sqlUpit = "SELECT * FROM TIMEZONE";
    bazaPodataka.query(sqlUpit, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/timezones', (req, res) => {
    const timezones = req.body;

    const sqlUpit = "INSERT INTO TIMEZONE (name, hour_diff) VALUES ?";
    
    const values = timezones.map(timezone => [timezone.name, timezone.hour_diff]);

    bazaPodataka.query(sqlUpit, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: `Greška prilikom unosa vremenskih zona.` });
        }

        console.log('Uspješno dodane vremenske zone.');
        return res.json({ message: 'Podaci su uspješno uneseni.' });
    });
});

app.get('/flights', (req, res) => {
    const sqlUpit = "SELECT * FROM FLIGHT";
    bazaPodataka.query(sqlUpit, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/flights_travelClasses', (req, res) => {
    const sqlUpit = "SELECT * FROM FLIGHT_TRAVELCLASS";
    bazaPodataka.query(sqlUpit, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/adminAccounts', (req, res) => {
    const sqlUpit = "SELECT * FROM ADMINACCOUNT";
    bazaPodataka.query(sqlUpit, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/roles', (req, res) => {
    const sqlUpit = "SELECT * FROM ROLE";
    bazaPodataka.query(sqlUpit, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/roles', (req, res) => {
    const roles = req.body;

    const sqlUpit = "INSERT INTO ROLE (name) VALUES ?";
    
    const values = roles.map(role => [role.name]);

    bazaPodataka.query(sqlUpit, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: `Greška prilikom unosa uloga.` });
        }

        console.log('Uspješno dodane uloge.');
        return res.json({ message: 'Podaci su uspješno uneseni.' });
    });
});

app.get('/admins_roles', (req, res) => {
    const sqlUpit = "SELECT * FROM ADMIN_ROLE";
    bazaPodataka.query(sqlUpit, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

//osluškujemo port
const PORT = 8800;
app.listen(PORT, () => {
    console.log(`Server sluša port ${PORT}!`);
})