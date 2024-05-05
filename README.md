# SkySailor - Flight Ticket Reservation

## Project Description

This project was developed for the course *Introduction to Software Engineering* at the Faculty of Science, University of Split. This web application enables users to browse and reserve flight tickets. The project was developed using JavaScript, Node.js, and React.

## Features

- **Login and Registration:** Allows users to create accounts and log in to the system, and administrators to log in.
- **Flight Search:** Fast search of available flights according to various criteria such as departure, destination, and date.
- **Ticket Reservation:** Simple ticket reservation process after selecting the desired flight.
- **Administrative Functionalities:** Allows administrators to add and update flight information.

## Setting Up the Project

1. **Cloning the Code:**
   ```bash
   git clone https://github.com/ems78/sky-sailor.git
   cd sky-sailor
   ```

2. **Installing Dependencies:**
   ```bash
   npm install
   cd client/
   npm install
   ```

3. **Starting the Express Server:**
   
   While positioned in the root folder
   ```bash
   npm start
   ```

4. **Starting the React Application:**
    
    Open another terminal
    ```bash
    cd client/
    npm run dev
    ```

The application will be available at http://localhost:8800.

## Technologies Used

- JavaScript
- Express
- Node.js
- React
- MySQL

## Authors

- [Ema Andrea Drašković](https://github.com/ems78)
- [Nediljka Kujundžić](https://github.com/neda1010)
- [Mia Jadrić](https://github.com/mjadric)
- [Tomislav Jurič](https://github.com/tomisljuric)
- [Franko Cvrlje](https://github.com/FrankNOTSinatra)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Note

The project does not include a database creation script. We recommend adding a script for setting up the database manually before running the project.
