📬 Bulk Mail Application

A full-stack bulk email sender built with React, Node.js, Express, and MongoDB Atlas.
Upload an Excel sheet of email addresses and send messages to all recipients instantly using Nodemailer.

🚀 Features
Upload .xlsx file with recipient emails
Compose custom message and send in bulk
Fetches Gmail credentials securely from MongoDB
Uses Nodemailer (Gmail SMTP) for delivery
Modern responsive UI built with Tailwind CSS

🧠 Tech Stack
Frontend: React, Tailwind CSS, Axios, XLSX
Backend: Node.js, Express, Nodemailer
Database: MongoDB Atlas

⚙️ Setup
Clone Repo
git clone https://github.com/<your-username>/bulkmail-app.git
cd bulkmail-app


Install Dependencies
cd backend && npm install
cd ../frontend && npm install


Configure MongoDB
Create DB: passkey, Collection: bulkmail

Insert:
{ "user": "your-email@gmail.com", "pass": "your-app-password" }

Run Backend
node server.js

Run Frontend
npm run dev
Then open in browser → http://localhost:5173

📸 Preview
✍️ Write your message
📤 Upload Excel file
🚀 Click “Send Emails” to deliver instantly

🧑‍💻 Author
Srivatsan A
Built with ❤️ using React, Node.js & MongoDB
