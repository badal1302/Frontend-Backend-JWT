import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = ({ token }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        if (token) fetchProfile();
    }, [token]);

    return (
        <div>
            <h2>Profile</h2>
            {profile ? (
    <>
        <p>{profile.message}</p> {/* Display the message from the server */}
        <p>Welcome, user {profile.userId}</p>
    </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
