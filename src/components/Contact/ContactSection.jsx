import { useState } from "react";
import toast from "react-hot-toast";
import { Check, Copy, Mail, Download } from "lucide-react";
import { GMAIL_COMPOSE, RESUME_PDF, SITE } from "../../data/site.js";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const copyEmail = async () => {
    const text = SITE.email;
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok) {
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      ok = document.execCommand("copy");
      document.body.removeChild(el);
    }
    if (ok) {
      setCopied(true);
      toast.success("Email copied");
      setTimeout(() => setCopied(false), 2200);
    } else {
      toast.error("Copy failed — use the email button");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.includes("@") || form.message.trim().length < 8) {
      toast.error("Name, a real email, and a short note — then we can talk.");
      return;
    }
    const subject = encodeURIComponent(`Portfolio note from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.open(`${GMAIL_COMPOSE}&su=${subject}&body=${body}`, "_blank", "noopener,noreferrer");
    setSent(true);
    toast.success("Opening Gmail compose");
  };

  return (
    <section id="contact" className="contact-band">
      <div className="wrap contact-inner">
        <div className="section-kicker light">Contact</div>
        <h2>Have a role, a product, or a hard problem?</h2>
        <p>Hiring, collaborating, or just curious — I read every note.</p>

        <div className="cta-row">
          <a className="btn btn-primary" href={GMAIL_COMPOSE} target="_blank" rel="noopener noreferrer">
            <Mail size={16} /> {SITE.email}
          </a>
          <button type="button" className="btn btn-ghost light" onClick={copyEmail}>
            {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copied" : "Copy email"}
          </button>
          <a className="btn btn-ghost light" href={SITE.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn btn-ghost light" href={SITE.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn btn-ghost light" href={RESUME_PDF} download="Mayank-August-2026-2.pdf">
            <Download size={16} /> Resume
          </a>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <label>
            Name
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              autoComplete="name"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
              required
            />
          </label>
          <label className="full">
            Message
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </label>
          <button type="submit" className="btn btn-primary">
            {sent ? "Send another" : "Send via Gmail"}
          </button>
        </form>
        <p className="muted">
          {SITE.location} · {SITE.phone}
        </p>
      </div>
    </section>
  );
}
