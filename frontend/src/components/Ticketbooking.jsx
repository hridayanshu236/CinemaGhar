import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import screen from '../assets/screen.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookedSeatsContext } from '../context/BookedSeatsContext';
import ConfirmationModal from './ConfirmationModal'; // Import the modal component
import BookingSuccessfulModal from './BookingSuccessfulModal';

import axios from 'axios';

const Ticketbooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedMovie } = location.state || {};
    const [bookingSuccessful, setBookingSuccessful] = useState(false);
    const { bookedSeats,setBookedSeats, fetchBookedSeats} = useContext(BookedSeatsContext);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBooking = () => {
        if (validateSelection()) {
            setIsModalOpen(true);
        } else {
            alert('Please select a date, time, and at least one seat before booking.');
        }
    };
    const handleConfirm = async () => {
        try {
            const response = await axios.post('https://cinema-ghar-api.vercel.app/api/booking/create', {

                title: selectedMovie.title,
                date: selectedDate,
                time: selectedTime,
                seats: selectedSeats
            }, {
                withCredentials: true
            })
            console.log('Booking successful:', response.data);
            console.log('BookingSuccessfulModal isOpen:', bookingSuccessful);
            setBookingSuccessful(true); // Set bookingSuccessful to true
            console.log('BookingSuccessfulModal isOpen:', bookingSuccessful);
            setIsModalOpen(false); // Close the modal
            // Handle success (e.g., show a confirmation message, navigate to a different page, etc.)
        } catch (err) {
            console.error('Error during booking:', err.response?.data || err.message);
            // Handle error (e.g., show an error message to the user)
        }
    };
    const handleClose = () => {
        setBookingSuccessful(false);
        setBookedSeats([]); // Reset bookedSeats to empty array
        navigate('/');
    }

    useEffect(() => {
        if (selectedDate && selectedTime && selectedMovie) {
            fetchBookedSeats(selectedMovie.title, selectedDate, selectedTime);
        }
    }, [ selectedTime, selectedDate, selectedMovie]); 
    
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime(null); // Reset the selected time when a new date is selected
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleSeatSelect = (seat) => {
        setSelectedSeats(prevSelectedSeats => {
            if (!Array.isArray(prevSelectedSeats)) {
                console.error('selectedSeats is not an array:', prevSelectedSeats);
                return []; // Reset to empty array if not an array
            }
            if (prevSelectedSeats.includes(seat)) {
                return prevSelectedSeats.filter(selectedSeat => selectedSeat !== seat);
            } else {
                return [...prevSelectedSeats, seat];
            }
        });
    };

    // Dates for today, tomorrow, and the next few days
    const dates = [
        dayjs().format('YYYY-MM-DD'), // Today
        dayjs().add(1, 'day').format('YYYY-MM-DD'), // Tomorrow
        dayjs().add(2, 'day').format('YYYY-MM-DD'), // Day after tomorrow
        dayjs().add(3, 'day').format('YYYY-MM-DD'),
        dayjs().add(4, 'day').format('YYYY-MM-DD'),
    ];

    const timeStringToDayjs = (timeString) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        return dayjs().startOf('day').set('hour', hours).set('minute', minutes);
    };
    const validateSelection = () => {
        return selectedDate && selectedTime && selectedSeats.length > 0;
    };
    const timeslots = [
        "7:45",
        "11:45",
        "14:45",
        "18:45",
        "22:45",
    ];

    const now = dayjs(); // Get the current time

    return (
        selectedMovie && (
            <div className="flex flex-wrap p-2">
                <div className="flex flex-col basis-full sm:basis-1/3 min-w-[200px] p-6">
                    <div className="w-full inline-block p-2 border shadow-xl rounded-lg">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                            alt={`${selectedMovie.title} Poster`}
                            className='w-full h-auto object-cover rounded-lg shadow-lg'
                        />
                    </div>
                    <div className="inline-block justify-center text-center pt-1 text-xl">
                        <p className="font-semibold">{selectedMovie.title} ({dayjs(selectedMovie.release_date).year()})</p>
                    </div>
                    <div className="inline-block justify-center text-center pl-3 pt-3">
                        <p>{selectedMovie.overview}</p>
                    </div>
                </div>

                <div className="flex flex-col basis-full sm:basis-2/3 min-w-[200px]">
                    <div className=" flex flex-col">
                        <div className=" inline-block text-center w-full pt-4">
                            <h1 className="text-center font-semibold text-lg">
                                <span className='text-purple-500'>Select</span> Date
                            </h1>
                            <div className="flex flex-wrap justify-center space-x-4 p-4 text-center">
                                {dates.map((date) => (
                                    <button
                                        key={date}
                                        onClick={() => handleDateSelect(date)}
                                        className={`px-4 py-2 rounded-lg text-white ${selectedDate === date
                                            ? 'bg-purple-500'
                                            : 'bg-gray-500 hover:bg-gray-700'
                                            }`}
                                    >
                                        {dayjs(date).format('MMMM D')}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='inline-box text-center pt-4'>
                            <h1 className="text-center font-semibold text-lg">
                                <span className='text-purple-500'>Select</span> Time
                            </h1>
                            <div className="inline-block justify-center space-x-4 p-4 text-center">
                                {timeslots.map((time) => {
                                    const timeDayjs = timeStringToDayjs(time);

                                    // For today's date, only show times that are in the future
                                    if (selectedDate === dayjs().format('YYYY-MM-DD') && now.isBefore(timeDayjs)) {
                                        return (
                                            <button
                                                key={time}
                                                onClick={() => handleTimeSelect(time)}
                                                className={`px-4 py-2 rounded-lg text-white ${selectedTime === time
                                                    ? 'bg-purple-500'
                                                    : 'bg-gray-500 hover:bg-gray-700'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        );
                                    }

                                    // For other dates, show all times
                                    if (selectedDate !== dayjs().format('YYYY-MM-DD')) {
                                        return (
                                            <button
                                                key={time}
                                                onClick={() => handleTimeSelect(time)}
                                                className={`px-4 py-2 rounded-lg text-white ${selectedTime === time
                                                    ? 'bg-purple-500'
                                                    : 'bg-gray-500 hover:bg-gray-700'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        );
                                    }

                                    return null; // Don't render anything if the time doesn't match the criteria
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='inline-block'>
                        <div className='flex flex-col pb-5 '>
                            <div className='flex flex-col items-center'>
                                <h1 className="text-center font-semibold text-lg">
                                    <span className='text-purple-500'>Pick</span> Seats
                                </h1>
                            </div>
                            <div className='inline-block text-center w-1/3 m-auto'>
                                <img src={screen} className='pt-3' alt="Screen" />
                            </div>
                            <div className='inline-block text-center'>
                                <h1 className="text-center font-semibold text-lg">
                                    <span className='text-purple-500'>Scr</span>een
                                </h1>
                            </div>
                            {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(row => (
                                <div className='flex w-full pt-4 justify-center' key={row}>
                                    <span className='pr-1'>{row}</span>
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map(seatNumber => (
                                        <button
                                            key={`${row}${seatNumber}`}
                                            onClick={() => handleSeatSelect(`${row}${seatNumber}`)}
                                            disabled={bookedSeats.includes(`${row}${seatNumber}`)}
                                            className={`rounded-lg`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faChair}
                                                className={` w-6 h-6 ${selectedSeats.includes(`${row}${seatNumber}`)
                                                    ? 'text-purple-500 opacity-50 transform transition-transform duration-300 hover:scale-125'
                                                    : 'text-gray-500 '
                                                    }
                                                    ${bookedSeats.includes(`${row}${seatNumber}`)
                                                        ? 'text-red-500 opacity-50'
                                                        :'text-gray-500 transform transition-transform duration-300 hover:scale-125'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            ))}

                            <div className='flex w-full pt-4 justify-center'>
                                <div className='inline-block px-4 py-3'>
                                    <p className='font-semibold'>
                                        Date: {selectedDate ? dayjs(selectedDate).format('MMMM D') : 'N/A'}{' '}
                                        Time: {selectedTime || 'N/A'}{' '}
                                        Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                                    </p>
                                </div>
                                <div className='inline-block'>
                                    <button
                                        onClick={handleBooking} className='bg-purple-500 text-white text-lg px-4 py-1 rounded-lg mt-2 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500'>
                                        Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    selectedDate={selectedDate}
                    selectedMovie={selectedMovie}
                    selectedTime={selectedTime}
                    selectedSeats={selectedSeats}
                    onConfirm={handleConfirm}
                />

                <BookingSuccessfulModal
                    isOpen={bookingSuccessful}
                    onClose={handleClose}
                />
            </div>
        )
    )
};

export default Ticketbooking;
