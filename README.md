# Nitish — Portfolio

React (Vite) portfolio with motion modeled on razorpay.com/slash-docs, plus an Express + Nodemailer (SMTP) contact API.

## Run

```bash
npm install
cp .env.example .env     # fill in SMTP credentials
npm run dev              # site: http://localhost:5173  ·  API: http://localhost:5000
```

Production: `npm run build && npm start` (Express serves `dist/` and `/api`).

## Edit your content

- **All text / links / experience / projects / certifications / FAQs:** `src/data.js`
- **Resume:** replace `public/resume.pdf`
- **SMTP:** `.env` (Gmail: use an App Password, host `smtp.gmail.com`, port 465)
