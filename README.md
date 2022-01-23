***
This repository contains the technical part of *Holoseum*, a physical product developed for the client [Tidvis](https://www.tidvis.no/) in the course PRO201 Agile Project at Kristiania University College, spring 2021.

The following brief was aimed at the examinator.
***

## Holoseum

### Hvordan kjøre
1. Sørg for å ha NodeJS installert
2. `npm install` for å installere dependencies
3. `npm run dev` for å starte applikasjonen

Applikasjonen vil deretter være tilgjengelig på http://localhost:3000, såfremt port 3000 er tilgjengelig.  
Ikke tilgjengelig? - Spesifisér en annen port i .env-filen, f. eks:

```
PORT = 1234
```

.env-filen må også inneholde tilkoblingsstrengen til MongoDB-databasen for at applikasjonen skal kjøre. Den er allerede lagt inn.

```
MONGO_URI = <mongodb connection string>
```

### Admin-bruker
For å få tilgang til admin-panelet på `/admin` kreves det autentisering.  
Dette er innloggingsdetaljene:

Brukernavn:  
Passord:

### Testdekning

| Måling     | %          
| -----------|--------
| Statements | 82.62 |
| Branch     | 65.08 |
| Functions  | 84.72 |
| Lines      | 82.43 |


Tester kjøres med `npm test`
