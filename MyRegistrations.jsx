import { useState } from 'react';

const MyRegistrations = () => {
  const [studentId, setStudentId] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!studentId) {
      setMessage('Please enter your student ID.');
      return;
    }

    setMessage('Loading registrations...');
    try {
      const response = await fetch(`http://localhost:5000/api/registrations/student/${studentId}`);
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || 'Could not get registrations.');
        setRegistrations([]);
        return;
      }
      setRegistrations(data);
      setMessage(data.length ? '' : 'No registrations found for this student ID.');
    } catch (error) {
      setMessage('Unable to fetch registrations. Please try again.');
      setRegistrations([]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white border border-blue-200 rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Registration Tracking</h2>
        <p className="text-gray-600 mb-4">Enter your student ID to see the events you registered for.</p>
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 transition duration-300">Search</button>
        </form>

        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}

        {registrations.length > 0 && (
          <div className="mt-6 space-y-4">
            {registrations.map((registration) => (
              <div key={registration._id} className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-blue-700">{registration.event?.title || 'Event'}</h3>
                <p className="text-gray-700">{registration.event?.description}</p>
                <p className="text-sm text-gray-500">Venue: {registration.event?.venue}</p>
                <p className="text-sm text-gray-500">Date: {registration.event ? new Date(registration.event.date).toLocaleString() : 'TBD'}</p>
                <p className="text-sm text-gray-500">Registered on: {new Date(registration.registrationDate).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRegistrations;
