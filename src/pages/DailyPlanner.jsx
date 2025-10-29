import React, { useEffect, useState, useRef } from "react";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./DailyPlanner.css";

export default function DailyPlanner() {
  const [date] = useState(new Date().toLocaleDateString());
  const [topGoals, setTopGoals] = useState(["", "", ""]);
  const [tasks, setTasks] = useState([]);
  const [finance, setFinance] = useState({ income: "", expenses: "", note: "" });
  const [reflection, setReflection] = useState({ wins: "", challenges: "", lessons: "", rating: "" });
  const [tomorrow, setTomorrow] = useState(["", "", ""]);
  const plannerRef = useRef(null);

  // Load saved data
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("dailyPlanner_v2")) || {};
    if (data.topGoals) setTopGoals(data.topGoals);
    if (data.tasks) setTasks(data.tasks);
    if (data.finance) setFinance(data.finance);
    if (data.reflection) setReflection(data.reflection);
    if (data.tomorrow) setTomorrow(data.tomorrow);
  }, []);

  // Save data automatically
  useEffect(() => {
    const payload = { topGoals, tasks, finance, reflection, tomorrow };
    localStorage.setItem("dailyPlanner_v2", JSON.stringify(payload));
  }, [topGoals, tasks, finance, reflection, tomorrow]);

  // === Helpers ===
  const addTask = (text = "", priority = "Medium") => {
    if (!text.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now(), text, priority, done: false }]);
  };

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteItem = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // === Clear all data ===
  const clearPlanner = () => {
    if (window.confirm("Are you sure you want to clear everything?")) {
      setTopGoals(["", "", ""]);
      setTasks([]);
      setFinance({ income: "", expenses: "", note: "" });
      setReflection({ wins: "", challenges: "", lessons: "", rating: "" });
      setTomorrow(["", "", ""]);
      localStorage.removeItem("dailyPlanner_v2");
    }
  };

  // === Export to PDF ===
  const exportPDF = async () => {
    const input = plannerRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`DailyPlanner_${date.replace(/\//g, "-")}.pdf`);
  };

  return (
    <div className="daily-page" ref={plannerRef}>
      {/* HEADER */}
      <div className="daily-header">
        <h1 className="dashboard-header">Daily Business Planner</h1>
        <p className="page-description">
          Stay organized, focused, and productive with your daily business
          planner. Track goals, manage key tasks, handle finances, and reflect
          on progress — all in one professional layout.
        </p>
        <p className="sub">
          Date: <strong>{date}</strong>
        </p>

        {/* TOP ACTION BUTTONS */}
        <div className="planner-actions">
          <button className="btn clear-btn" onClick={clearPlanner}>
            Clear All
          </button>
          <button className="btn export-btn" onClick={exportPDF}>
            Export as PDF
          </button>
        </div>
      </div>

      {/* TOP GOALS & FINANCE */}
      <section className="top-stats daily-stats">
        <div className="stat-card">
          <h4>Top Goals</h4>
          <div className="goals">
            {topGoals.map((g, i) => (
              <input
                key={i}
                value={g}
                placeholder={`Goal ${i + 1}`}
                onChange={(e) => {
                  const copy = [...topGoals];
                  copy[i] = e.target.value;
                  setTopGoals(copy);
                }}
              />
            ))}
          </div>
        </div>

        <div className="stat-card">
          <h4>Financial Snapshot</h4>
          <div className="finance-grid">
            <input
              value={finance.income}
              onChange={(e) => setFinance({ ...finance, income: e.target.value })}
              placeholder="Income today"
            />
            <input
              value={finance.expenses}
              onChange={(e) =>
                setFinance({ ...finance, expenses: e.target.value })
              }
              placeholder="Expenses today"
            />
            <textarea
              value={finance.note}
              onChange={(e) => setFinance({ ...finance, note: e.target.value })}
              placeholder="Notes on cash flow or spending..."
            />
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="daily-grid">
        {/* LEFT COLUMN */}
        <div className="left-col">
          <div className="card">
            <div className="card-head">
              <h3>Tasks & Delegation</h3>
              <TaskAdder onAdd={addTask} />
            </div>

            <div className="task-list">
              {tasks.length === 0 && (
                <p className="muted">No tasks yet — start by adding key items.</p>
              )}
              {tasks.map((t) => (
                <div key={t.id} className={`task-item ${t.done ? "done" : ""}`}>
                  <div className="task-left">
                    <input
                      className="task-checkbox"
                      type="checkbox"
                      checked={t.done}
                      onChange={() => toggleDone(t.id)}
                    />
                    <input
                      className="task-input"
                      value={t.text}
                      placeholder="Task description..."
                      onChange={(e) =>
                        setTasks((prev) =>
                          prev.map((it) =>
                            it.id === t.id ? { ...it, text: e.target.value } : it
                          )
                        )
                      }
                    />
                    <small className="muted">{t.priority}</small>
                  </div>
                  <button
                    className="icon-btn"
                    title="Delete task"
                    onClick={() => deleteItem(t.id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginTop: "20px" }}>
            <h3>Tomorrow’s Priorities</h3>
            <div className="tomorrow-grid">
              {tomorrow.map((t, i) => (
                <input
                  key={i}
                  value={t}
                  placeholder={`Priority ${i + 1}`}
                  onChange={(e) => {
                    const copy = [...tomorrow];
                    copy[i] = e.target.value;
                    setTomorrow(copy);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-col">
          <div className="card reflection-card">
            <h3>Evening Reflection</h3>

            <div className="reflection-group">
              <label>🌟 Wins Today</label>
              <textarea
                className="reflection-input"
                value={reflection.wins}
                onChange={(e) =>
                  setReflection({ ...reflection, wins: e.target.value })
                }
                placeholder="What went well today?"
              />
            </div>

            <div className="reflection-group">
              <label>⚡ Challenges Faced</label>
              <textarea
                className="reflection-input"
                value={reflection.challenges}
                onChange={(e) =>
                  setReflection({ ...reflection, challenges: e.target.value })
                }
                placeholder="What obstacles did you encounter?"
              />
            </div>

            <div className="reflection-group">
              <label>💡 Lessons & Improvements</label>
              <textarea
                className="reflection-input"
                value={reflection.lessons}
                onChange={(e) =>
                  setReflection({ ...reflection, lessons: e.target.value })
                }
                placeholder="What did you learn, and what will you improve tomorrow?"
              />
            </div>

            <div className="rating-row">
              <label>End-of-day Rating (1–10)</label>
              <input
                className="rating-input"
                type="number"
                min="1"
                max="10"
                value={reflection.rating}
                onChange={(e) =>
                  setReflection({ ...reflection, rating: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* === Inline Component for Adding Tasks === */
function TaskAdder({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("High");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText("");
    setPriority("High");
  };

  return (
    <form className="task-adder" onSubmit={submit}>
      <input
        placeholder="Add new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button className="btn small" type="submit">
        <AiOutlinePlus />
      </button>
    </form>
  );
}
