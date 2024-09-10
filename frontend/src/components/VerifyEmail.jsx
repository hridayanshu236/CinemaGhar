import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const [verificationMessage, setVerificationMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verify-email/${token}`);
        setVerificationMessage(response.data.message);
      } catch (error) {
        setVerificationMessage('Verification failed. Please try again.');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{verificationMessage}</p>
    </div>
  );
};

export default VerifyEmail;
