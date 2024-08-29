import React, { createContext, useState } from 'react';
import axios from 'axios';

export const BookedSeatsContext = createContext();

export const BookedSeatsProvider = ({ children }) => {
    const [bookedSeats, setBookedSeats] = useState([]);

    const fetchBookedSeats = async (title, date, time) => {
        try {
            const response = await axios.get('https://cinema-ghar-api.vercel.app/api/booking/booked-seats', {
                params: { title, date, time },
                withCredentials: true,
            });
            setBookedSeats(response.data.bookedSeats);
        } catch (error) {
            console.error('Error fetching booked seats:', error.message);
        }
    };

    return (
        <BookedSeatsContext.Provider value={{ bookedSeats,setBookedSeats, fetchBookedSeats }}>
            {children}
        </BookedSeatsContext.Provider>
    );
};