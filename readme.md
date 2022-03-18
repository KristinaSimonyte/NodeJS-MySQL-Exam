###
# NodeJS - MySQL Exam

Sukurta sistema, kurioje prisijungę vartotojai gali susikurti išlaidų grupes ir įvesti sąskaitų duomenis. Vartotojai gali jungtis į grupes ir dalintis sąskaitomis. 

### Naudotos kalbos
- HTML,
- CSS,
- JavaScript.
## Sistemos paleidimas

1. Repozitorijos klonavimas

- Naudojantis atsiųsta nuoroda, klonuoti repozitoriją. 

2. npm paketų paruošimas

- reikalingi npm paketai:
  - bcryptjs,
  - cors,
  - dotenv,
  - express,
  - joi,
  - jsonwebtoken,
  - morgan,
  - mysql2.
- paketus įrašome naudodami komandą
```bash
npm install
```

3. Dokumento .env paruošimas

- naudojantis .env example dokumentu, sukurti aplanke dokumentą .env (prisijungimo prie duomenų bazės duomenys persiųsti teams platformoje kartu su nuoroda į github). 
Esant sutrikimams online duomenų bazėje (gauti laiškai iš freesqldatabase.com support leidžia suprasti, kad po savaitės duomenų bazė gali būti ištrinta) aplanke įtrauktas duomenų bazės importavimo dokumentas. 

4. Serverio paleidimas
- serverį paleidžiame naudodami komandą
```bash
npm start
```

5. Puslapio paleidimas
- norint registruoti vartotoją prie sistemos, reikia paleisti dokumentą register.html
- norint prijungti esamą vartotoją prie sistemos, reikia pasirinkti dokumentą index.html

## Sistemos veikimo principai

1. Register: vartotojas įrašo vardą, emailą ir slaptažodį (du kartus) Sistema patikrina ar slaptažodžiai sutampa ir nukreipia į login puslapį. 
2. Login: vartotojas įrašo emailą, slaptažodį. Sistema patikrina, ar vartotojas registruotas, jei taip - nukreipia į vartotojo account puslapį. 
3. Accounts: vartotojas mato visas savo grupes. Vartotojas gali susikurti naują grupę arba prisijungti prie kitų vartotojų sukurtos grupės (būtina žinoti kito vartotojo sukurtos grupės ID). Vartotojas negali prisijunti prie neegzistuojančios grupės ar prisijungti prie grupės antrą kartą.
4. Bills: parodo konkrečios grupės sąskaitas. Vartotojas gali pridėti naują sąskaitą. 

## Sistemos testavimas

1. Sistemą galima testuoti rest.rest dokumente
- reikia prijungti vartotoją POST http://localhost:3000/auth/login ir gauti vartotojo token norint atlikti testavimq.

2. Patogesniam testavimui online yra sukurti vartotojai ir grupės
- Jane Dou email: dou@jane.com password: secret123, vartotojas prisijungęs prie grupių, kurių ID 1, 4, 5.
- John Dou email: john@dou.com password: verysecret5, vartotojas prisijungęs prie grupių, kurių ID 2, 3.
- Jill Jillson email: jillson@jill.com password: secret526, vartotojas prisijungęs prie grupių, kurių ID 3, 5.
- Zarley Reid email: reid@zarley.com password: verysecret, vartotojas prisijungęs prie grupių, kurių ID 1, 2, 3, 4.