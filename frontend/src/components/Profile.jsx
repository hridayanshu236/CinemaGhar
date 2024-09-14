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
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/booking/booking-details`, {
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
      <div className="flex flex-col  items-center w-full h-full min-h-[100vh]  text-black bg-gradient-to-r from-purple-100 to-slate-100">
        <div className="flex flex-row  mb-4 w-full justify-center border-b-2 border-black">
          <div className="inline-block p-5 text-2xl">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="inline-block p-5 text-2xl">
            <h1>Welcome, {userData.email}</h1>
          </div>
        </div>
        <div className="flex flex-col items-center  h-full w-full ">
          <div className="flex flex-row w-full items-center text-center justify-center  mr-1 ml-1 rounded-md">
            <ul>
              <li
                className={`p-4 text-lg cursor-pointer inline-block   ${
                  view === "active" ? "text-purple-500" : ""
                }`}
                onClick={() => setView("active")}
              >
                Active Tickets
              </li>
              <li
                className={`p-4 text-lg cursor-pointer  inline-block  ${
                  view === "history" ? "text-purple-500" : ""
                }`}
                onClick={() => setView("history")}
              >
                History
              </li>
            </ul>
          </div>
          <div className="flex  w-full overflow-x-auto p-5">
            <table className="w-full min-w-[800px] ">
              <thead>
                <tr className="border-2 border-black">
                  <th className="p-2 border-t-2 border-r-2 border-black">
                    Show Details
                  </th>
                  <th className="p-2 border-t-2 border-r-2 border-black">
                    Date
                  </th>
                  <th className="p-2 border-t-2 border-r-2 border-black">
                    Time
                  </th>
                  <th className="p-2 border border-black">Seats</th>
                </tr>
              </thead>
              <tbody>
                {(view === "active" ? activeTickets : pastTickets).length >
                0 ? (
                  (view === "active" ? activeTickets : pastTickets).map(
                    (booking, index) => (
                      <tr key={index} className="border-purple-500">
                        <td className="p-2 border-2 border-black">
                          {booking.title}
                        </td>
                        <td className="p-2 border-2 border-black">
                          {booking.screening?.date}
                        </td>
                        <td className="p-2 border-2 border-black">
                          {booking.screening?.times[0]}
                        </td>
                        <td className="p-2 border-2 border-black">
                          {booking.seats.join(", ")}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-2 border border-purple-500 text-center"
                    >
                      No {view === "active" ? "active" : "past"} tickets
                      available
                    </td>
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
