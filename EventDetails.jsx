import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [studentId, setStudentId] = useState(''); // For simplicity, assume student ID is entered

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(err => console.log(err));
  }, [id]);

  const handleRegister = () => {
    if (!studentId) {
      alert('Please enter student ID');
      return;
    }
    fetch('http://localhost:5000/api/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, eventId: id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
        } else {
          setEvent({ ...event, remainingSeats: event.remainingSeats - 1 });
          setRegistered(true);
        }
      })
      .catch(err => console.log(err));
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white border border-blue-200 rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">{event.title}</h2>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <p className="text-sm text-gray-500 mb-2">Date: {new Date(event.date).toLocaleString()}</p>
        <p className="text-sm text-gray-500 mb-2">Venue: {event.venue}</p>
        <p className="text-sm text-gray-500 mb-4">Seats: {event.remainingSeats}/{event.totalSeats}</p>
        <CountdownTimer targetDate={event.date} />
        {!registered ? (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleRegister}
              disabled={event.remainingSeats === 0}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
            >
              {event.remainingSeats === 0 ? 'Full' : 'Register'}
            </button>
          </div>
        ) : (
          <p className="text-green-600 font-bold mt-4">Registered Successfully!</p>
        )}
      </div>
    </div>
  );
};

export default EventDetails;