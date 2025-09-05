import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function PersonForm({ person, onSaved, onCancel }){
  const [form, setForm] = useState({
    name: person?.name || '',
    age: person?.age || '',
    gender: person?.gender || 'Other',
    mobile: person?.mobile || ''
  });
  const [saving, setSaving] = useState(false);

  const change = (e) => setForm({...form, [e.target.name]: e.target.value});

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = person ? 'PUT' : 'POST';
      const url = person ? '/api/person/' + person._id : '/api/person';
      const res = await fetch(url, {
        method,
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Save failed');
      Swal.fire('Saved', '', 'success');
      onSaved();
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    } finally { setSaving(false); }
  };

  return (
    <form onSubmit={save} style={{marginTop:12}} className="person-form">
      <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
        <div className="field">
          <label>Name</label>
          <input name="name" value={form.name} onChange={change} required />
        </div>
        <div className="field">
          <label>Age</label>
          <input name="age" type="number" value={form.age} onChange={change} />
        </div>
        <div className="field">
          <label>Gender</label>
          <select name="gender" value={form.gender} onChange={change}>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </div>
        <div className="field">
          <label>Mobile</label>
          <input name="mobile" value={form.mobile} onChange={change} />
        </div>
      </div>

      <div style={{marginTop:10}}>
        <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        <button className="btn secondary" type="button" onClick={onCancel} style={{marginLeft:8}}>Cancel</button>
      </div>
    </form>
  );
}
