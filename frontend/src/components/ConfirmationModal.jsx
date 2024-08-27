import react from 'react';
import dayjs from 'dayjs';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, selectedDate, selectedTime, selectedSeats, selectedMovie }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white justify-center  flex flex-col p-6 rounded-lg shadow-lg w-1/3" onClick={(e) => e.stopPropagation()}>
                <div className=''>
                    <h2 className="text-xl font-semibold mb-4">Confirm Booking</h2>
                    <p className="mb-4">Are you sure you want to book this movie?</p>
                </div>
                <div className="inline-block justify-center text-center  p-3 text-xl">
                    <p className="font-semibold">{selectedMovie.title}</p>
                </div>
                <div className='inline-block justify-center text-center  pb-5'>
                    <p className='font-semibold'>
                        Date: {selectedDate ? dayjs(selectedDate).format('MMMM D') : 'N/A'}{' '}
                        Time: {selectedTime || 'N/A'}{' '}
                        Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                    </p>
                </div>

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onConfirm}
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ConfirmationModal;