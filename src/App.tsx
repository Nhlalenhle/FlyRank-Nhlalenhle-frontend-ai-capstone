import { useState } from "react";

export default function App() {
  const [name, setName] = useState("Boni Nxumalo");
  const [email, setEmail] = useState("boni@example.com");
  const [notifications, setNotifications] = useState(true);
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.includes("@")) {
      setMessage("Please enter a name and a valid email address.");
      return;
    }
    setMessage("Your settings have been saved.");
  }

  return (
    <main className="page">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">S</span> StudyPilot</div>
        <p className="nav-label">WORKSPACE</p>
        <a className="nav-item" href="#settings">⚙ <span>Account settings</span></a>
        <div className="sidebar-bottom"><span className="avatar">BN</span><span><strong>Boni Nxumalo</strong><small>Student account</small></span></div>
      </aside>
      <section className="content" id="settings">
        <div className="eyebrow">YOUR ACCOUNT</div>
        <h1>Account settings</h1>
        <p className="subtitle">Manage your profile and how StudyPilot keeps you in the loop.</p>
        <form className="settings-card" onSubmit={handleSubmit}>
          <div className="card-heading"><div><h2>Personal information</h2><p>Update the details associated with your account.</p></div><span className="profile-icon">◎</span></div>
          <label htmlFor="name">Full name</label>
          <input id="name" value={name} onChange={(event) => setName(event.target.value)} />
          <label htmlFor="email">Email address</label>
          <input id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <div className="preference">
            <div><strong>Study reminders</strong><p>Receive reminders about your upcoming study tasks.</p></div>
            <input aria-label="Study reminders" type="checkbox" checked={notifications} onChange={(event) => setNotifications(event.target.checked)} />
          </div>
          <div className="form-footer"><span>{message}</span><button type="submit">Save changes <span aria-hidden="true">→</span></button></div>
        </form>
        <p className="footnote">Your learning journey, thoughtfully organised.</p>
      </section>
    </main>
  );
}
