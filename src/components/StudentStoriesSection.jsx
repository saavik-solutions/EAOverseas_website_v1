import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './StudentStoriesSection.css';
import story1 from '../assets/story_placeholder_1.jpg'; // Placeholder
import story2 from '../assets/story_placeholder_2.jpg'; // Placeholder
import story3 from '../assets/story_placeholder_3.jpg'; // Placeholder
import story4 from '../assets/story_placeholder_4.jpg'; // Placeholder

const StudentStoriesSection = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleStartJourney = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    const stories = [
        { image: story1, alt: "Happy Student 1" },
        { image: story2, alt: "Graduation Day" },
        { image: story3, alt: "Group Friends" },
        { image: story4, alt: "Campus Life" },
    ];

    return (
        <section className="student-stories-section">
            <h2 className="stories-title">Hear from Our Students</h2>
            <p className="stories-subtitle">
                Real stories of success, growth, and global adventures from our alumni
            </p>

            <div className="stories-grid">
                {stories.map((story, index) => (
                    <div key={index} className="story-card">
                        <img src={story.image} alt={story.alt} />
                    </div>
                ))}
            </div>

            <button
                className="btn-start-journey"
                onClick={handleStartJourney}
            >
                Start Your Journey Today
            </button>
        </section>
    );
};

export default StudentStoriesSection;
