# SkySailor - Rezervacija Aviokarti

## Opis Projekta

Projekt je rađen za kolegij *Uvod u programsko inženjerstvo* na Prirodoslovno-matematičkom fakultetu. Ova web aplikacija omogućava korisnicima pregled i rezervaciju aviokarata. Projekt je razvijen koristeći JavaScript, Node.js i React.

## Funkcionalnosti

- **Prijava i Registracija:** Omogućava korisnicima stvaranje računa i prijavu na sustav, te administratorima prijavu.
- **Pretraga Letova:** Brza pretraga dostupnih letova prema različitim kriterijima poput polazišta, destinacije i datuma.
- **Rezervacija Karata:** Jednostavan proces rezervacije karata nakon odabira željenog leta.
- **Administrativne Funkcionalnosti:** Omogućuje administratorima dodavanje i ažuriranje informacija o letovima.

## Postavljanje Projekta

1. **Preuzimanje Koda:**
   ```bash
   git clone https://github.com/ems78/sky-sailor.git
   cd sky-sailor
   ```

2. **Instalacija Zavisnosti:**
   ```bash
   npm install
   cd client/
   npm install
   ```

3. **Pokretanje Express Servera:**
   
   Dok ste pozicionirani u root folderu
   ```bash
   npm start
   ```

4. **Pokretanje React Aplikacije:**
    
    Otvorite drugi terminal
    ```bash
    cd client/
    npm run dev
    ```

Aplikacija će biti dostupna na http://localhost:8800.

## Tehnologije Korištene

- JavaScript
- Express
- Node.js
- React
- MySQL

## Autori

- [Ema Andrea Drašković](https://github.com/ems78)
- [Nediljka Kujundžić](https://github.com/neda1010)
- [Mia Jadrić](https://github.com/mjadric)
- [Tomislav Jurič](https://github.com/tomisljuric)
- [Franko Cvrlje](https://github.com/FrankNOTSinatra)

## Licenca

Ovaj projekt je licenciran pod MIT licencom - pogledajte [LICENSE.md](LICENSE.md) za detalje.

## Napomena

Projekt ne sadrži skriptu za stvaranje baze podataka. Preporučujemo dodavanje skripte ručno postavljanje baze podataka prije pokretanja projekta.