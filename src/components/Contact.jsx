import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

export default function Contact() {
  const { ref, visible } = useReveal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null); // { type: 'error' | 'success', text }
  const [sending, setSending] = useState(false);

  function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setResult({ type: 'error', text: 'Please fill in all fields before sending.' });
      return;
    }
    setSending(true);
    setTimeout(() => {
      const mailtoUrl = `mailto:arshinjoseph2004@gmail.com?subject=${encodeURIComponent(
        'Portfolio Contact: ' + name
      )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;
      setResult({ type: 'success', text: '✓ Opening mail client to send your message!' });
      setSending(false);
    }, 400);
  }

  return (
    <section className={`contact fade-in-section${visible ? ' visible' : ''}`} id="contact" ref={ref}>
      <div>
        <div className="section-label">
          <div className="label-line" />
          <span className="label-text">Get In Touch</span>
        </div>
        <h2 className="contact-heading">
          Let's create something <span className="accent">great</span> together.
        </h2>
        <p className="contact-text">
          I'm actively seeking my first full-time opportunity as a graphic designer. Whether it's a
          brand project, internship, or freelance gig — I'd love to hear from you.
        </p>
        <div className="contact-meta">
          <div className="contact-meta-row">
            <span className="icon">✉</span> arshinjoseph2004@gmail.com
          </div>
          <div className="contact-meta-row">
            <span className="icon">📍</span> Available for Remote & On-site Roles
          </div>
          <div className="contact-meta-row">
            <span className="icon">⚡</span> Open to Freelance Projects
          </div>
        </div>
      </div>

      <div className="contact-form reveal-stagger">
        <div className="form-group">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            placeholder="hello@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Message</label>
          <textarea
            className="form-textarea"
            placeholder="Tell me about your project..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button
          className="btn-primary"
          style={{ alignSelf: 'flex-start', fontSize: '0.85rem', padding: '1rem 2rem' }}
          onClick={handleSubmit}
        >
          {sending ? 'Preparing Mail...' : 'Send Message →'}
        </button>
        {result && <div className={`form-result ${result.type}`}>{result.text}</div>}
      </div>
    </section>
  );
}
