Node + MongoDB (Express) backend + React frontend
-----------------------------------------------
How to run (locally):

1) Start MongoDB (local or set MONGODB_URI environment variable).

Server:
  cd server
  npm install
  # copy .env.example to .env and edit if needed
  npm run dev
(server runs on port 5000)

Client:
  cd client
  npm install
  npm start
(react dev server runs on port 3000 and proxies /api to backend)

Notes:
  - API base: http://localhost:5000/api/person
  - The ZIP contains a simple, interactive React UI with SweetAlert2 confirmations.
