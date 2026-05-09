import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 animate-bounce">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event._id} className="bg-white border border-blue-200 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 transform hover:scale-105">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <p className="text-sm text-gray-500 mb-2">Venue: {event.venue}</p>
            <p className="text-sm text-gray-500 mb-4">Seats: {event.remainingSeats}/{event.totalSeats}</p>
            <CountdownTimer targetDate={event.date} />
            <Link to={`/event/${event._id}`} className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;