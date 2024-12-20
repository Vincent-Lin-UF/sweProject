import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TestConenction() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/test`)
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                console.error('error with connect :( ->', error);
                setMessage('did not connect with backend');
            });
    }, []);

    return (
        <div>
            <h1>Backend Connection Test</h1>
            <p>{message}</p>
        </div>
    );
}

export default TestConenction;