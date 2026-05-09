import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    totalSeats: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetch('http://localhost:5000/api/events', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return [];
        }
        return res.json();
      })
      .then(data => setEvents(data))
      .catch(err => console.log(err));
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => {
        setEvents([...events, data]);
        setForm({ title: '', description: '', date: '', venue: '', totalSeats: '' });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Admin Panel</h2>
      <div className="bg-white border border-blue-200 rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Add New Event</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={form.venue}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="totalSeats"
            placeholder="Total Seats"
            value={form.totalSeats}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Add Event
          </button>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Existing Events</h3>
        <ul className="space-y-2">
          {events.map(event => (
            <li key={event._id} className="bg-gray-100 p-4 rounded">
              <h4 className="font-bold">{event.title}</h4>
              <p>{event.description}</p>
              <p>Venue: {event.venue}</p>
              <p>Seats: {event.remainingSeats}/{event.totalSeats}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;