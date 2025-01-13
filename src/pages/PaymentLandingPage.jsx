import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentLandingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const sendDataToBackend = async () => {
      const queryParams = new URLSearchParams(location.search);
      const status = queryParams.get('Status');
      const authority = queryParams.get('Authority');

      if (status && authority) {
        try {
          const response = await axios.post('/api/order/verify_payment/', {
            status,
            authority,
          });

          if (response.data.success) {
            setPaymentStatus('success');
            setMessage('Your payment has been verified successfully.');
          } else {
            setPaymentStatus('failed');
            setMessage('Payment verification failed or was cancelled.');
          }
        } catch (error) {
          setPaymentStatus('error');
          setMessage('An error occurred while verifying your payment. Please try again.');
          console.error('Error sending data to backend:', error);
        }
      }
    };

    sendDataToBackend();
  }, [location]);

  const handleReturn = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Payment Status</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        {paymentStatus === 'success' && (
          <button
            onClick={handleReturn}
            className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600"
          >
            Return to Home
          </button>
        )}
        {paymentStatus !== 'success' && (
          <button
            onClick={handleReturn}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Return to Home
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentLandingPage;
