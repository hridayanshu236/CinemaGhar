import React, { useState } from 'react';
import dayjs from 'dayjs';
import deadpool from '../assets/deadpool.jpeg';

const Ticketbooking = () => {
    const [selectedDate, setSelectedDate] = useState(null); // Default to null
    const [selectedTime, setSelectedTime] = useState(null); // Default to null

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime(null); // Reset the selected time when a new date is selected
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
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
        <div className="flex p-2">
            <div className="flex flex-col w-1/3 min-h-screen">
                <div className="w-full flex p-2 border shadow-xl rounded-lg">
                    <img src={deadpool} alt="Deadpool Poster" />
                </div>
                <div className="flex justify-center pt-1 text-xl">
                    <p className="font-semibold">Deadpool & Wolverine (2024)</p>
                </div>
                <div className="flex pl-3 pt-3">
                    <p>Deadpool's peaceful existence comes crashing down when the Time Variance Authority recruits him to help safeguard the multiverse. He soon unites with his would-be pal, Wolverine, to complete the mission and save his world from an existential threat.</p>
                </div>
            </div>

            <div className="flex flex-col p-2 w-2/3 rounded-lg">
                <div className="h-1/2 flex flex-col">
                    <div className="h-1/2">
                        <h1 className="text-center font-semibold text-lg">Select Date</h1>
                        <div className="flex justify-center space-x-4 p-4">
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
                    <div>
                        <h1 className="text-center font-semibold text-lg">Select Time</h1>
                        <div className="flex justify-center space-x-4 p-4">
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
                <div>
                    <h1 className="text-center font-semibold text-lg">Pick Seats</h1>
                </div>
            </div>
        </div>
        
    );
}

export default Ticketbooking;
