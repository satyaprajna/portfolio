import { useCallback, useEffect, useState } from 'react';
import './contract.css';

const countryCodes = [
  { value: '+91', label: 'India (+91)' },
  { value: '+1', label: 'USA (+1)' },
  { value: '+44', label: 'UK (+44)' },
  { value: '+61', label: 'Australia (+61)' },
  { value: '+81', label: 'Japan (+81)' },
  { value: '+49', label: 'Germany (+49)' },
  { value: '+33', label: 'France (+33)' },
  { value: '+55', label: 'Brazil (+55)' },
  { value: '+86', label: 'China (+86)' },
  { value: '+7', label: 'Russia (+7)' },
  { value: '+34', label: 'Spain (+34)' },
  { value: '+39', label: 'Italy (+39)' },
  { value: '+27', label: 'South Africa (+27)' },
  { value: '+82', label: 'South Korea (+82)' },
  { value: '+971', label: 'UAE (+971)' },
  { value: '+52', label: 'Mexico (+52)' },
  { value: '+64', label: 'New Zealand (+64)' },
  { value: '+65', label: 'Singapore (+65)' },
  { value: '+46', label: 'Sweden (+46)' },
  { value: '+98', label: 'Iran (+98)' },
  { value: '+20', label: 'Egypt (+20)' },
  { value: '+47', label: 'Norway (+47)' },
  { value: '+380', label: 'Ukraine (+380)' },
  { value: '+351', label: 'Portugal (+351)' },
  { value: '+972', label: 'Israel (+972)' },
];

function Contact() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://portfolio-f8mi.onrender.com';

  const [form, setForm] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [storedContacts, setStoredContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const fetchContacts = useCallback(async () => {
    try {
      setLoadingContacts(true);
      const response = await fetch(`${API_BASE}/api/contacts/all`);
      const data = await response.json();

      if (response.ok && data.success) {
        setStoredContacts(data.data);
      } else {
        setSubmitMessage('Unable to load saved contacts.');
      }
    } catch {
      setSubmitMessage('Unable to reach the database server.');
    } finally {
      setLoadingContacts(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    if (isAdmin) {
      const timerId = setTimeout(() => {
        fetchContacts();
      }, 0);

      return () => clearTimeout(timerId);
    }
  }, [fetchContacts, isAdmin]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Name is required.';

    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[0-9]{7,15}$/.test(form.phone)) {
      newErrors.phone = 'Enter a valid phone number (7-15 digits).';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (form.message.trim().length < 3) {
      newErrors.message = 'Message must be at least 3 characters.';
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }

    setSubmitMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/api/contacts/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      let result = null;
      let responseText = '';

      try {
        responseText = await response.text();
        result = responseText ? JSON.parse(responseText) : null;
      } catch {
        result = null;
      }

      if (!response.ok || result?.success === false) {
        const errorMessage = result?.message || responseText || 'Unable to save data';
        throw new Error(errorMessage);
      }

      const emailSent = result?.emailSent !== false;
      const emailDetails = result?.emailError ? ` (${result.emailError})` : '';
      const message = result?.message || 'Contact submitted successfully!';

      setSubmitMessage(`${emailSent ? '✓' : '✗'} ${message}${emailDetails}`);
      setSubmitted(emailSent);
      setForm({ name: '', email: '', countryCode: '+91', phone: '', message: '' });

      setTimeout(() => {
        setSubmitMessage('');
        setSubmitted(false);
      }, 4000);
    } catch (error) {
      setSubmitMessage('✗ ' + (error.message || 'Submit failed'));
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === '123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      setAdminPassword('');
    } else {
      setSubmitMessage('✗ Invalid password!');
      setTimeout(() => setSubmitMessage(''), 3000);
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    setShowAdminPanel(false);
    setAdminPassword('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;

    try {
      const response = await fetch(`${API_BASE}/api/contacts/delete/${id}`, { method: 'DELETE' });

      if (response.ok) {
        setSubmitMessage('✓ Contact deleted successfully!');
        fetchContacts();
      } else {
        setSubmitMessage('✗ Failed to delete contact.');
      }

      setTimeout(() => setSubmitMessage(''), 3000);
    } catch {
      setSubmitMessage('✗ Error deleting contact.');
      setTimeout(() => setSubmitMessage(''), 3000);
    }
  };

  const handleStartEdit = (contact) => {
    setEditingId(contact._id);
    setEditForm({
      ...contact,
      message: contact.message || contact.password || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleSaveEdit = async () => {
    if (!editForm?.name?.trim() || !editForm?.email?.trim() || !editForm?.phone?.trim() || !editForm?.message?.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/contacts/update/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        setSubmitMessage('✓ Contact updated successfully!');
        setEditingId(null);
        setEditForm(null);
        fetchContacts();
      } else {
        setSubmitMessage('✗ Failed to update contact.');
      }

      setTimeout(() => setSubmitMessage(''), 3000);
    } catch {
      setSubmitMessage('✗ Error updating contact.');
      setTimeout(() => setSubmitMessage(''), 3000);
    }
  };

  return (
    <div className="contact-container">
      {!isAdmin ? (
        <div className="admin-login-card">
          <h2>👨‍💼 Admin Access</h2>
          <form onSubmit={handleAdminLogin} className="admin-login-form">
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <button type="submit" className="admin-login-btn">
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="admin-header">
          <h2>🔐 Admin Panel - Manage Contacts</h2>
          <button onClick={handleAdminLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}

      {!isAdmin && (
        <div className="contact-card">
          <h1>📧 Contact Us</h1>
          <p>Fill in your details and submit to get in touch.</p>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>
                Name <span className="required">*</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </label>
            </div>

            <div className="form-group">
              <label>
                Email <span className="required">*</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </label>
            </div>

            <div className="form-group">
              <label>
                Phone Number <span className="required">*</span>
                <div className="phone-row">
                  <select name="countryCode" value={form.countryCode} onChange={handleChange}>
                    {countryCodes.map((code) => (
                      <option key={code.value} value={code.value}>
                        {code.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="1234567890"
                    maxLength={15}
                  />
                </div>
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </label>
            </div>

            <div className="form-group">
              <label>
                Message <span className="required">*</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me why you want to connect"
                  rows={5}
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </label>
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>

            {submitMessage && (
              <div className={`success-message ${submitted ? 'success' : 'error'}`}>{submitMessage}</div>
            )}
          </form>
        </div>
      )}

      {isAdmin && (
        <div className="admin-panel">
          <div className="admin-controls">
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="toggle-btn"
            >
              {showAdminPanel ? '▼ Hide Contacts' : '▶ Show All Contacts'}
            </button>
            <span className="contact-count">Total: {storedContacts.length} contacts</span>
          </div>

          {submitMessage && (
            <div className={`success-message ${submitted ? 'success' : 'error'}`}>{submitMessage}</div>
          )}

          {showAdminPanel && (
            <div className="admin-contacts-wrapper">
              {loadingContacts ? (
                <p className="loading">Loading contacts...</p>
              ) : storedContacts.length > 0 ? (
                <div className="admin-table-wrapper">
                  <table className="admin-contacts-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {storedContacts.map((contact) => (
                        <tr key={contact._id} className={editingId === contact._id ? 'editing-row' : ''}>
                          {editingId === contact._id ? (
                            <>
                              <td>
                                <input type="text" name="name" value={editForm.name} onChange={handleEditChange} />
                              </td>
                              <td>
                                <input type="email" name="email" value={editForm.email} onChange={handleEditChange} />
                              </td>
                              <td>
                                <div className="edit-phone">
                                  <select
                                    name="countryCode"
                                    value={editForm.countryCode}
                                    onChange={handleEditChange}
                                  >
                                    {countryCodes.map((code) => (
                                      <option key={code.value} value={code.value}>
                                        {code.label}
                                      </option>
                                    ))}
                                  </select>
                                  <input type="tel" name="phone" value={editForm.phone} onChange={handleEditChange} />
                                </div>
                              </td>
                              <td>
                                <textarea
                                  name="message"
                                  value={editForm.message}
                                  onChange={handleEditChange}
                                  rows={3}
                                />
                              </td>
                              <td>{editForm.createdAt ? new Date(editForm.createdAt).toLocaleString() : ''}</td>
                              <td>
                                <div className="action-buttons">
                                  <button onClick={handleSaveEdit} className="save-btn">✓ Save</button>
                                  <button onClick={handleCancelEdit} className="cancel-btn">✕ Cancel</button>
                                </div>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{contact.name}</td>
                              <td>{contact.email}</td>
                              <td>{`${contact.countryCode} ${contact.phone}`}</td>
                              <td>{contact.message || contact.password}</td>
                              <td>{contact.createdAt ? new Date(contact.createdAt).toLocaleString() : ''}</td>
                              <td>
                                <div className="action-buttons">
                                  <button onClick={() => handleStartEdit(contact)} className="edit-btn">✎ Edit</button>
                                  <button onClick={() => handleDelete(contact._id)} className="delete-btn">🗑 Delete</button>
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-contacts">No contacts found in the database.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Contact;
