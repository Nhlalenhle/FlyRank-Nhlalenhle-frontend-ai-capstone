import { useState, type FormEvent } from "react";

type FormValues = {
  name: string;
  email: string;
  notifications: boolean;
};

type FormErrors = Partial<Record<"name" | "email", string>>;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Enter your full name.";
  const email = values.email.trim();
  if (!email) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

export default function App() {
  const [values, setValues] = useState<FormValues>({
    name: "Boni Nxumalo",
    email: "boni@example.com",
    notifications: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSaved(false);
    if (Object.keys(nextErrors).length === 0) setSaved(true);
  }

  function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setSaved(false);
    if (field === "name" || field === "email") {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  return (
    <main className="page">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">S</span> StudyPilot</div>
        <p className="nav-label">WORKSPACE</p>
        <a className="nav-item" href="#settings" aria-current="page"><span aria-hidden="true">⚙</span><span>Account settings</span></a>
        <div className="sidebar-bottom"><span className="avatar">BN</span><span><strong>Boni Nxumalo</strong><small>Student account</small></span></div>
      </aside>
      <section className="content" id="settings" aria-labelledby="page-title">
        <div className="eyebrow">YOUR ACCOUNT</div>
        <h1 id="page-title">Account settings</h1>
        <p className="subtitle">Manage your profile and how StudyPilot keeps you in the loop.</p>
        <form className="settings-card" onSubmit={handleSubmit} noValidate>
          <div className="card-heading"><div><h2>Personal information</h2><p>Update the details associated with your account.</p></div><span className="profile-icon" aria-hidden="true">◎</span></div>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" autoComplete="name" value={values.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
            {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
          </div>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => updateField("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
            {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
          </div>
          <div className="preference">
            <div><label htmlFor="notifications">Study reminders</label><p>Receive reminders about your upcoming study tasks.</p></div>
            <input id="notifications" name="notifications" type="checkbox" checked={values.notifications} onChange={(event) => updateField("notifications", event.target.checked)} />
          </div>
          <div className="form-footer">
            <p className={saved ? "status success" : "status"} role="status" aria-live="polite">{saved ? "Your settings have been saved." : Object.keys(errors).length ? "Please review the highlighted fields." : ""}</p>
            <button type="submit">Save changes <span aria-hidden="true">→</span></button>
          </div>
        </form>
        <p className="footnote">Your learning journey, thoughtfully organised.</p>
      </section>
    </main>
  );
}
