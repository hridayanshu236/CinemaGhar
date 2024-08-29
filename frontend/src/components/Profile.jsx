import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTickets, setActiveTickets] = useState([]);
    const [pastTickets, setPastTickets] = useState([]);
    const [view, setView] = useState('active'); // 'active' or 'history'

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('cinema-ghar-api.vercel.app/api/booking/booking-details', {
                    withCredentials: true
                });
                setUserData(response.data);

                // Get today's date, set time to 00:00:00 for accurate comparison
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // Filter active and past tickets based on screening dates
                const active = [];
                const past = [];

                response.data.bookings.forEach(booking => {
                    booking.screenings.forEach(screening => {
                        const screeningDate = new Date(screening.date);
                        screeningDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

                        if (screeningDate >= today) {
                            active.push({ ...booking, screening });
                        } else {
                            past.push({ ...booking, screening });
                        }
                    });
                });

                setActiveTickets(active);
                setPastTickets(past);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to fetch user data');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col justify-center items-center w-full h-full p-5 text-black bg-white">
            <div className="flex flex-row border-2 border-purple-500 mb-4 w-full justify-center">
                <div className="inline-block p-5 text-2xl">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="inline-block p-5 text-2xl">
                    <h1>Welcome, {userData.email}</h1>
                </div>
            </div>
            <div className="flex flex-row border-l-2  border-purple-500 h-full w-full">
                <div className="flex flex-col w-1/4 border-b-2 border-purple-500">
                    <ul>
                        <li className={`p-4 text-lg cursor-pointer border-t-2 border-purple-500 ${view === 'active' ? 'text-purple-500' : ''}`}
                            onClick={() => setView('active')}
                        >Active Tickets</li>
                        <li className={`p-4 text-lg cursor-pointer ${view === 'history' ? 'text-purple-500' : ''}`}
                            onClick={() => setView('history')}
                        >
                            History</li>
                    </ul>
                </div>
                <div className="flex-grow overflow-x-auto">
                    <table className="w-full min-w-[600px] ">
                        <thead>
                            <tr className="border-2 border-purple-500">
                                <th className="p-2 border-t-2 border-r-2 border-purple-500">Show Details</th>
                                <th className="p-2 border-t-2 border-r-2 border-purple-500">Date</th>
                                <th className="p-2 border-t-2 border-r-2 border-purple-500">Time</th>
                                <th className="p-2 border border-purple-500">Seats</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(view === 'active' ? activeTickets : pastTickets).length > 0 ? (
                                (view === 'active' ? activeTickets : pastTickets).map((booking, index) => (
                                    <tr key={index} className="border-purple-500">
                                        <td className="p-2 border-2 border-purple-500">{booking.title}</td>
                                        <td className="p-2 border-2 border-purple-500">{booking.screening?.date}</td>
                                        <td className="p-2 border-2 border-purple-500">{booking.screening?.times[0]}</td>
                                        <td className="p-2 border-2 border-purple-500">{booking.seats.join(', ')}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-2 border border-purple-500 text-center">No {view === 'active' ? 'active' : 'past'} tickets available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Profile;
