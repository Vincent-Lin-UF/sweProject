import React from 'react';
import Hero from '../components/Hero';

function Home() {
    return (
        <div>
            <Hero />
            <div style={{ padding: '20px' }}>
                <h2>Welcome to Siege!</h2>
                <p>Track your fitness goals, stay motivated, and achieve more.</p>
            </div>
        </div>
    );
}

export default Home;
