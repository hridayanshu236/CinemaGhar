import react from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const BookingSuccessfulModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={onClose}>
           <div className="bg-white justify-center  flex flex-col p-6 rounded-lg shadow-lg " onClick={(e) => e.stopPropagation()}>
           <h1 className="text-2xl font-semibold text-green-500">Booking Successful!</h1>
                <p className="text-lg mt-4">Thank you for booking with us. Your reservation is confirmed.</p>
                <button
                    onClick={onClose} // Redirect to home or any other page
                    className='bg-purple-500 text-white text-lg px-4 py-1 rounded-lg mt-2 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500'>
                    Go to Home
                </button>
           </div>
        </div>
    )
}
export default BookingSuccessfulModal;