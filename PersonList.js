import React, { useEffect, useState } from 'react';
import PersonForm from './PersonForm';
import Swal from 'sweetalert2';

export default function PersonList() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchPeople = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/person');
      let data = await res.json();
      console.log("API response:", data); // debug log

      // ensure it's always an array
      if (!Array.isArray(data)) {
        data = [];
      }

      setPeople(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setPeople([]); // fallback to empty array
    }
    setLoading(false);
  };

  useEffect(() => { fetchPeople(); }, []);

  const handleCreate = () => { setEditing(null); setShowForm(true); };

  const handleEdit = (p) => { setEditing(p); setShowForm(true); };

  const handleDelete = (p) => {
    Swal.fire({
      title: `Delete ${p.name}?`,
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch('/api/person/' + p._id, { method: 'DELETE' });
        Swal.fire('Deleted', '', 'success');
        fetchPeople();
      }
    });
  };

  const onSaved = () => { setShowForm(false); fetchPeople(); };

  return (
    <div className="card">
      <div className="top-actions">
        <button className="btn" onClick={handleCreate}>Create Person</button>
        <button className="btn secondary" onClick={fetchPeople}>Refresh</button>
      </div>

      {loading ? <p>Loading...</p> : (
        <>
          <table>
            <thead>
              <tr><th>Name</th><th>Age</th><th>Gender</th><th>Mobile</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {people.length === 0 && <tr><td colSpan="5">No records</td></tr>}
              {people.map(p => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{p.mobile}</td>
                  <td className="actions">
                    <a onClick={() => handleEdit(p)}>Edit</a>
                    <a onClick={() => handleDelete(p)}>Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showForm && (
            <PersonForm
              person={editing}
              onSaved={onSaved}
              onCancel={() => setShowForm(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
