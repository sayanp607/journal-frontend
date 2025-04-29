import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import ScrollToTop from "../../pages/scroll/Scroll";
import Welcome from "../../pages/Welcome";

function DashboardPage() {
  const { token } = useContext(AuthContext);

  const [journals, setJournals] = useState([]);
  const [formData, setFormData] = useState({
    emotion: "",
    howWasYourDay: "",
    whatWentWell: "",
    whatCouldBeBetter: "",
    whatDidNotGoWell: "",
    otherComments: "",
  });

  const [editingJournalId, setEditingJournalId] = useState(null);

  const api = axios.create({
    baseURL: "https://journal-backend-8lmg.onrender.com/api/journals", 
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const res = await api.get("/");
      setJournals(res.data);
    } catch (error) {
      console.error("Error fetching journals:", error);
      toast.error("Authenticate first to check your journals.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingJournalId) {
        await api.put(`/${editingJournalId}`, formData);
        toast.success("Journal updated successfully!");
      } else {
        await api.post("/", formData);
        toast.success("Journal added successfully!");
      }
      fetchJournals();
      setFormData({
        emotion: "",
        howWasYourDay: "",
        whatWentWell: "",
        whatCouldBeBetter: "",
        whatDidNotGoWell: "",
        otherComments: "",
      });
      setEditingJournalId(null);
    } catch (error) {
      console.error("Error saving journal:", error);
      toast.error("Register first to save it.");
    }
  };

  const handleEdit = (journal) => {
    setFormData({
      emotion: journal.emotion,
      howWasYourDay: journal.howWasYourDay,
      whatWentWell: journal.whatWentWell,
      whatCouldBeBetter: journal.whatCouldBeBetter,
      whatDidNotGoWell: journal.whatDidNotGoWell,
      otherComments: journal.otherComments,
    });
    setEditingJournalId(journal._id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this journal?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/${id}`);
        fetchJournals();
        toast.success("Journal deleted successfully!");
      } catch (error) {
        console.error("Error deleting journal:", error);
        toast.error("Failed to delete journal.");
      }
    }
  };

  return (
    <>
      <div className="dashboard">
        <Welcome />
        <h2>Add Journal</h2>
        <form onSubmit={handleSubmit} className="journal-form">
          <div className="input-with-select">
            <select
              value={formData.emotion}
              onChange={(e) =>
                setFormData({ ...formData, emotion: e.target.value })
              }
            >
              <option value="">🙂</option>
              <option value="Happy 😊">😊</option>
              <option value="Sad 😢">😢</option>
              <option value="Angry 😡">😡</option>
              <option value="Excited 🤩">🤩</option>
              <option value="Tired 😴">😴</option>
            </select>

            <input
              type="text"
              name="emotion"
              placeholder="Describe your emotion"
              value={formData.emotion}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="howWasYourDay"
            placeholder="How was your day today?"
            value={formData.howWasYourDay}
            onChange={handleChange}
            required
          />
          <textarea
            name="whatWentWell"
            placeholder="What went well?"
            value={formData.whatWentWell}
            onChange={handleChange}
            required
          />
          <textarea
            name="whatCouldBeBetter"
            placeholder="What could have been better?"
            value={formData.whatCouldBeBetter}
            onChange={handleChange}
            required
          />
          <textarea
            name="whatDidNotGoWell"
            placeholder="What did not go well?"
            value={formData.whatDidNotGoWell}
            onChange={handleChange}
            required
          />
          <textarea
            name="otherComments"
            placeholder="Any other comments?"
            value={formData.otherComments}
            onChange={handleChange}
          />
          <button type="submit">
            {editingJournalId ? "Update Journal" : "Add Journal"}
          </button>
        </form>
       

       

        <div className="journal-list">
          <h1>Your Journals</h1>
          {journals.length > 0 ? (
            journals.map((journal) => (
              <div key={journal._id} className="journal-card">
                <h3>{journal.emotion}</h3>
                <p>
                  <strong>Summary:</strong> {journal.howWasYourDay}
                </p>
                <p>
                  <strong>Went Well:</strong> {journal.whatWentWell}
                </p>
                <p>
                  <strong>Could Be Better:</strong> {journal.whatCouldBeBetter}
                </p>
                <p>
                  <strong>Did Not Go Well:</strong> {journal.whatDidNotGoWell}
                </p>
                <p>
                  <strong>Comments:</strong> {journal.otherComments}
                </p>
                <div className="actions">
                  <button onClick={() => handleEdit(journal)}>Edit</button>
                  <button onClick={() => handleDelete(journal._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No journals found. Start writing!</p>
          )}
        </div>

        <ToastContainer />
      </div>
      <ScrollToTop />
    </>
  );
}

export default DashboardPage;
