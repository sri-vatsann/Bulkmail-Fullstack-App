import { useState } from "react";
import "./App.css";
import axios from "axios";
import * as XLSX from "xlsx";

function App() {
  const [msg, setmsg] = useState("");
  const [status, setstatus] = useState(false);
  const [emaillist, setEmaillist] = useState([]);

  const handlemsg = (event) => {
    setmsg(event.target.value);
  };

  const send = () => {
    setstatus(true);
    axios
      .post("http://localhost:5000/sendemail", { msg: msg, emaillist:emaillist})
      .then((response) => {
        if (response.data == true) {
          alert("Email sent Succesfully !");
          setstatus(false);
        } else {
          alert("Sending email failed, Try after some time !");
        }
      });
  };

  const handlefile = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      console.log(worksheet);
      const emailList = XLSX.utils.sheet_to_json(worksheet, { header: "A" });

      //getting the email from the sheet and making it as an array 
      const totalemail = emailList.map((item) => {
        return item.A;
      });
      console.log(totalemail);

      setEmaillist(totalemail)
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-700 to-purple-500 text-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-purple-950 shadow-md py-4 text-center">
        <h1 className="text-3xl font-semibold tracking-wide">📨 Bulk Mail</h1>
      </header>

      {/* Sub-header */}
      <section className="w-full bg-purple-800 text-center py-3">
        <h2 className="text-lg font-medium">
          Send Multiple Emails in One Shot
        </h2>
      </section>

      {/* Content */}
      <main className="bg-white text-black mt-10 w-[90%] md:w-[60%] rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h3 className="text-xl font-semibold text-purple-800 mb-4">
          Compose Your Email
        </h3>

        {/* Text area */}
        <textarea
          className="w-full h-32 bg-purple-50 border border-purple-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter the email text..."
          onChange={handlemsg}
          value={msg}
        ></textarea>

        {/* File upload */}
        <div className="w-full mt-6 flex flex-col items-center">
          <label
            htmlFor="file-upload"
            className="bg-purple-100 border-2 border-dashed border-purple-400 text-purple-800 px-6 py-4 rounded-md w-full text-center cursor-pointer hover:bg-purple-200 transition-all duration-300"
          >
            Drag & Drop or Click to Upload File
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handlefile}
          />
          <p className="mt-3 text-sm text-purple-700 font-medium">
            Total emails in the file: <span className="font-semibold">{emaillist.length}</span>
          </p>
        </div>

        {/* Send button */}
        <button
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 mt-6 rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-300"
          onClick={send}
        >
          {status ? "Sending ..." : "Send Emails"}
        </button>
      </main>

      {/* Footer Gradient */}
      <footer className="mt-10 w-full text-center text-purple-200 text-sm py-4">
        <p>
          © 2025 Bulk Mail System — Built with ❤️ using React & Tailwind CSS
        </p>
      </footer>
    </div>
  );
}

export default App;
