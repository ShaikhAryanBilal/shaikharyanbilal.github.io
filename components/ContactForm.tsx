"use client";

import { useState, type FormEvent } from "react";
import type { Contact } from "@/lib/types";

export default function ContactForm({ contact }: { contact: Contact }) {
  const [values, setValues] = useState<Record<string, string>>({});

  const set = (name: string) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [name]: e.target.value }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent("Message from your website");
    const body = encodeURIComponent(
      `Name: ${values.name || ""}\nEmail: ${values.email || ""}\n\n${values.message || ""}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      {contact.form.fields.map((f) => (
        <label className="field" key={f.name}>
          <span>{f.label}</span>
          {f.type === "textarea" ? (
            <textarea
              name={f.name}
              required={f.required}
              value={values[f.name] || ""}
              onChange={set(f.name)}
              rows={5}
            />
          ) : (
            <input
              type={f.type}
              name={f.name}
              required={f.required}
              value={values[f.name] || ""}
              onChange={set(f.name)}
            />
          )}
        </label>
      ))}
      <button className="cta" type="submit">
        {contact.form.submit}
      </button>
    </form>
  );
}
