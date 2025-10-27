import React, { useEffect, useState, useRef } from "react";
import { AiOutlinePlus, AiOutlineDelete, AiOutlineDownload } from "react-icons/ai";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./DailyPlanner.css";


export default function DailyPlanner() {
  const [date] = useState(new Date().toLocaleDateString());
  const [topGoals, setTopGoals] = useState(["", "", ""]);
  const [schedule, setSchedule] = useState([]); // {id, time, title, priority, done}
  const [tasks, setTasks] = useState([]); // {id, text, priority, done}
  const [finance, setFinance] = useState({ income: "", expenses: "", note: "" });
  const [reflection, setReflection] = useState({ wins: "", challenges: "", lessons: "", rating: "" });
  const [tomorrow, setTomorrow] = useState(["", "", ""]);
  const plannerRef = useRef(null);

  // load from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("dailyPlanner_v1")) || {};
    if (data.topGoals) setTopGoals(data.topGoals);
    if (data.schedule) setSchedule(data.schedule);
    if (data.tasks) setTasks(data.tasks);
    if (data.finance) setFinance(data.finance);
    if (data.reflection) setReflection(data.reflection);
    if (data.tomorrow) setTomorrow(data.tomorrow);
  }, []);

  // save to localStorage
  useEffect(() => {
    const payload = { topGoals, schedule, tasks, finance, reflection, tomorrow };
    localStorage.setItem("dailyPlanner_v1", JSON.stringify(payload));
  }, [topGoals, schedule, tasks, finance, reflection, tomorrow]);

  // helpers
  const addScheduleItem = (time = "09:00 - 10:00", title = "", priority = "High") => {
    setSchedule(prev => [...prev, { id: Date.now(), time, title, priority, done: false }]);
  };

  const addTask = (text = "", priority = "Medium") => {
    if (!text.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text, priority, done: false }]);
  };

  const toggleDone = (id, listName) => {
    if (listName === "tasks") {
      setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
    } else {
      setSchedule(prev => prev.map(s => (s.id === id ? { ...s, done: !s.done } : s)));
    }
  };

  const deleteItem = (id, listName) => {
    if (listName === "tasks") setTasks(prev => prev.filter(t => t.id !== id));
    else setSchedule(prev => prev.filter(s => s.id !== id));
  };

  const clearAll = () => {
    if (!window.confirm("Clear all planner data for today?")) return;
    setTopGoals(["", "", ""]);
    setSchedule([]);
    setTasks([]);
    setFinance({ income: "", expenses: "", note: "" });
    setReflection({ wins: "", challenges: "", lessons: "", rating: "" });
    setTomorrow(["", "", ""]);
  };

  const exportPDF = async () => {
    if (!plannerRef.current) return;
    const el = plannerRef.current;
    const scale = 2;
    const width = el.offsetWidth * scale;
    const height = el.offsetHeight * scale;

    const canvas = await html2canvas(el, {
      scale,
      useCORS: true,
      backgroundColor: "#f8fafc"
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: width > height ? "l" : "p",
      unit: "px",
      format: [width / scale, height / scale]
    });
    // draw image to pdf sized to page
    pdf.addImage(imgData, "PNG", 0, 0, width / scale, height / scale);
    pdf.save(`DailyPlanner-${new Date().toISOString().slice(0,10)}.pdf`);
  };

  return (
    <div className="daily-page" ref={plannerRef}>
      <div className="daily-header">
        <div>
           <h1 className="dashboard-header">Daily Business Planner</h1>
      <p className="page-description">
       The Daily Planner helps you organize your day effectively. Schedule tasks, set goals, and track progress to boost productivity. With dedicated sections for morning prep, schedule, tasks, and reflections, it ensures you stay focused and accountable throughout the day.
      </p>
          <p className="sub">Date: <strong>{date}</strong></p>
        </div>

        <div className="daily-cta">
          <button className="btn ghost" onClick={clearAll}>Clear</button>
          <button className="btn primary" onClick={exportPDF}>
            <AiOutlineDownload /> Export PDF
          </button>
        </div>
      </div>

      {/* TOP STATS / GOALS */}
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
                  const copy = [...topGoals]; copy[i] = e.target.value; setTopGoals(copy);
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
              onChange={(e) => setFinance({ ...finance, expenses: e.target.value })}
              placeholder="Expenses today"
            />
            <textarea
              value={finance.note}
              onChange={(e) => setFinance({ ...finance, note: e.target.value })}
              placeholder="Quick cashflow note..."
            />
          </div>
        </div>

        <div className="stat-card">
          <h4>Quick Metrics</h4>
          
          <div className="metrics">
            <div><small>Tasks</small><strong>{tasks.length}</strong></div>
            <div><small>Scheduled</small><strong>{schedule.length}</strong></div>
            <div><small>Completed</small><strong>{tasks.filter(t=>t.done).length + schedule.filter(s=>s.done).length}</strong></div>
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT: Scheduler (left) + Tasks & Reflection (right) */}
      <section className="daily-grid">
        <div className="left-col">
          <div className="card">
            <div className="card-head">
              <h3>Time-Block Schedule</h3>
              <button className="btn small" onClick={() => addScheduleItem() }><AiOutlinePlus /> Add</button>
            </div>

            <div className="schedule-list">
              {schedule.length === 0 && <p className="muted">No schedule yet. Click Add to create a time block.</p>}
              {schedule.map((s) => (
                <div key={s.id} className={`schedule-item ${s.done ? "done" : ""}`}>
                  <div className="left">
                    <div className="time">{s.time}</div>
                    <div className="title">
                      <input
                        value={s.title}
                        placeholder="Activity title"
                        onChange={(e) => setSchedule(prev => prev.map(it => it.id === s.id ? { ...it, title: e.target.value } : it))}
                      />
                    </div>
                  </div>

                  <div className="right">
                    <select value={s.priority} onChange={(e)=> setSchedule(prev => prev.map(it => it.id === s.id ? { ...it, priority: e.target.value } : it))}>
                      <option>High</option><option>Medium</option><option>Low</option>
                    </select>
                    <button className="icon" onClick={() => toggleDone(s.id, "schedule")}>{s.done ? "↺" : "✓"}</button>
                    <button className="icon danger" onClick={() => deleteItem(s.id, "schedule")}><AiOutlineDelete /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Tomorrow Prep</h3>
            <div className="tomorrow-grid">
              {tomorrow.map((t,i) => (
                <input key={i} value={t} placeholder={`Priority ${i+1}`} onChange={e => { const c=[...tomorrow]; c[i]=e.target.value; setTomorrow(c);}} />
              ))}
            </div>
          </div>
        </div>

        <div className="right-col">
          <div className="card">
            <div className="card-head">
              <h3>Tasks & Delegation</h3>
              <TaskAdder onAdd={addTask} />
            </div>

            <div className="task-list">
              {tasks.length === 0 && <p className="muted">No tasks yet — add high-priority items.</p>}
              {tasks.map(t => (
                <div key={t.id} className={`task-item ${t.done ? "done" : ""}`}>
                  <div className="task-left">
                    <input className="task-checkbox" type="checkbox" checked={t.done} onChange={() => toggleDone(t.id, "tasks")} />
                    <div className="task-text">
                      <input value={t.text} onChange={(e)=> setTasks(prev=> prev.map(it=> it.id===t.id? {...it, text: e.target.value}: it))} />
                      <small className="muted">{t.priority}</small>
                    </div>
                  </div>
                  <div className="task-actions">
                    <button className="icon danger" onClick={() => deleteItem(t.id, "tasks")}><AiOutlineDelete /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Evening Reflection</h3>
            <textarea value={reflection.wins} onChange={e=> setReflection({...reflection, wins: e.target.value})} placeholder="Wins today..." />
            <textarea value={reflection.challenges} onChange={e=> setReflection({...reflection, challenges: e.target.value})} placeholder="Challenges..." />
            <textarea value={reflection.lessons} onChange={e=> setReflection({...reflection, lessons: e.target.value})} placeholder="Lessons & improvements..." />
            <div className="rating-row">
              <label>End-of-day rating (1-10):</label>
              <input type="number" min="1" max="10" value={reflection.rating} onChange={e=> setReflection({...reflection, rating: e.target.value})} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* small sub-component for adding tasks inline */
function TaskAdder({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("High");

  const submit = (e) => {
    e?.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText(""); setPriority("High");
  };

  return (
    <form className="task-adder" onSubmit={submit}>
      <input placeholder="New task..." value={text} onChange={(e)=>setText(e.target.value)} />
      <select value={priority} onChange={e=>setPriority(e.target.value)}>
        <option>High</option><option>Medium</option><option>Low</option>
      </select>
      <button className="btn small" type="submit"><AiOutlinePlus /></button>
    </form>
  );
}
