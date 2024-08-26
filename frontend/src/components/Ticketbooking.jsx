import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import deadpool from '../assets/deadpool.jpeg';
import screen from '../assets/screen.svg';
import seat from '../assets/seat.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

const Ticketbooking = () => {
    // const [movies, setMovies] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null); // Default to null
    const [selectedTime, setSelectedTime] = useState(null);// initialized in an empty array
    const [selectedSeats, setSelectedSeats] = useState([]); // Default to null

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
    }
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
        console.log(`Parsing time: ${timeString} -> hours: ${hours}, minutes: ${minutes}`);
        return dayjs().startOf('day').set('hour', hours).set('minute', minutes);
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
        <div className="flex flex-wrap p-2">
            <div className="flex flex-col basis-full sm:basis-1/3 min-w-[200px] p-6">
                <div className="w-full inline-block p-2 border shadow-xl rounded-lg">
                    <img src={deadpool} alt="Deadpool Poster" />
                </div>
                <div className="inline-block justify-center text-center pt-1 text-xl">
                    <p className="font-semibold">Deadpool & Wolverine (2024)</p>
                </div>
                <div className="inline-block justify-center text-center pl-3 pt-3">
                    <p>Deadpool's peaceful existence comes crashing down when the Time Variance Authority recruits him to help safeguard the multiverse. He soon unites with his would-be pal, Wolverine, to complete the mission and save his world from an existential threat.</p>
                </div>
            </div>

            <div className="flex flex-col basis-full sm:basis-2/3 min-w-[200px]">
                <div className="h-1/2 flex flex-col">
                    <div className="h-1/2 inline-block text-center w-full pt-4">
                        <h1 className="text-center font-semibold text-lg"><span className='text-purple-500'>Select</span> Date</h1>
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
                        <h1 className="text-center font-semibold text-lg"><span className='text-purple-500'>Select</span> Time</h1>
                        <div className="inline-block justify-center space-x-4 p-4 text-center">
                            {timeslots.map((time) => {
                                const timeDayjs = timeStringToDayjs(time);
                                console.log('Current Time:', now.format('YYYY-MM-DD HH:mm:ss'));
                                console.log('Time Slot:', timeDayjs.format('YYYY-MM-DD HH:mm:ss'));


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
                            <h1 className="text-center font-semibold text-lg"><span className='text-purple-500'>Pick</span> Seats</h1>

                        </div>
                        <div className='inline-block text-center w-1/3 m-auto'>
                            <img src={screen} className=' pt-3 ' />
                        </div>
                        <div className='inline-block text-center'>
                        <h1 className="text-center font-semibold text-lg"><span className='text-purple-500'>Scr</span>een</h1>
                        </div>
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(row => (
                            <div className='flex w-full pt-4 justify-center' key={row}>
                                <span className='pr-1'>{row}</span>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map(seatNumber => (
                                    <button
                                        key={`${row}${seatNumber}`}
                                        onClick={() => handleSeatSelect(`${row}${seatNumber}`)}
                                        className={`rounded-lg ${selectedSeats.includes(`${row}${seatNumber}`) ? '' : ''}`}
                                    >
                                        <FontAwesomeIcon
                                            icon={faChair}
                                            className={`transform transition-transform duration-300 hover:scale-125 w-6 h-6 ${selectedSeats.includes(`${row}${seatNumber}`) ? 'text-purple-500 opacity-50' : 'text-gray-500'}`}
                                        />
                                    </button>
                                ))}
                            </div>
                        ))}

                        <div className='flex w-full pt-4 justify-center'>
                            <div className='inline-block px-4 py-3'>
                                <p className='font-semibold'>Date: {dayjs(selectedDate).format('MMMM D')} Time: {selectedTime} Seats:  {selectedSeats}
                                </p>
                            </div>
                            <div className='inline-block'>
                                <button className='bg-purple-500 text-white text-lg px-4 py-1 rounded-lg mt-2  hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500'>
                                    Confirm
                                </button>
                            </div>

                        </div>
                        {/* <div className='flex w-2/3 justify-end'>
                            <button className='bg-purple-500 text-white text-lg px-6 py-1 rounded-xl mt-2  hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500'>
                                Confirm
                            </button>
                        </div> */}
                    </div>
                </div>

            </div>
        </div >

    );
}

export default Ticketbooking;
