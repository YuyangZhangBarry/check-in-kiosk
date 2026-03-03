import { useState, useEffect } from "react";
import Display from "./components/Display";
import "./App.css";
import { ClipLoader } from "react-spinners";

function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/index");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!res.ok) {
        console.log("student fetch failed!");
        throw new Error("Failed to fetch!");
      }
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return loading ? (
    <ClipLoader color={"#123abc"} loading={loading} size={50} />
  ) : error ? (
    <h1>error</h1>
  ) : (
    <Display students={students} />
  );
}

export default App;
