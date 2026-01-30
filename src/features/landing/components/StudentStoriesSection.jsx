import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './StudentStoriesSection.css';
import avneetCard from '../../../assets/story_card_avneet.png';
import manishCard from '../../../assets/story_card_manish.jpg';
import manishaCard from '../../../assets/story_card_manisha.jpg';
import sanjuktaCard from '../../../assets/story_card_sanjukta.jpg';

const StudentStoriesSection = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [flippedCards, setFlippedCards] = React.useState({});

    const handleCardClick = (index) => {
        setFlippedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleStartJourney = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    const stories = [
        {
            name: "Avneet Kaur",
            uni: "Arizona State University",
            country: "USA",
            image: avneetCard,
            review: "EAOverseas made my dream of studying in the USA a reality! From university shortlisting to visa interviews, their support was incredible."
        },
        {
            name: "Sanjukta Koli",
            uni: "Durham College",
            country: "CANADA",
            image: sanjuktaCard,
            review: "The counselors were so helpful in finding the right course for me in Canada. The process was smooth and hassle-free."
        },
        {
            name: "Manish Gupta",
            uni: "University of Winnipeg",
            country: "CANADA",
            image: manishCard,
            review: "I was confused about my options, but the team guided me perfectly. Now I'm happily studying at my dream university in Winnipeg!"
        },
        {
            name: "Manisha Rani",
            uni: "Arizona State University",
            country: "USA",
            image: manishaCard,
            review: "Excellent service! They helped me with every step, especially the scholarship application which saved me a lot of money."
        },
        // Duplicate/New Data for Marquee Variety
        {
            name: "Rohan Verma",
            uni: "TU Munich",
            country: "GERMANY",
            image: manishCard, // Reusing placeholder for demo
            review: "Getting into a German university seemed impossible, but EAOverseas made the paperwork so simple. Highly recommended!"
        },
        {
            name: "Priya Sharma",
            uni: "Trinity College Dublin",
            country: "IRELAND",
            image: sanjuktaCard, // Reusing placeholder for demo
            review: "The visa guidance was top-notch. I got my visa approved in just 2 weeks thanks to their mock interview preparation."
        },
        {
            name: "Aditya Kumar",
            uni: "University of Melbourne",
            country: "AUSTRALIA",
            image: avneetCard, // Reusing placeholder for demo
            review: "Friendly consultants who genuinely care. They helped me find a course that perfectly matches my career goals."
        },
        {
            name: "Sneha Patel",
            uni: "University of Leeds",
            country: "UK",
            image: manishaCard, // Reusing placeholder for demo
            review: "From IELTS coaching to finding accommodation, they helped with everything. Best consultancy in the city!"
        }
    ];

    const colorCycle = ['card-violet', 'card-orange', 'card-green', 'card-blue'];

    return (
        <section className="stories-section" id="student-stories">
            <div className="stories-header">
                <div className="success-tag">Success stories</div>
                <h2 className="stories-title">Hear from Our Students</h2>
                <p className="stories-subtitle">
                    Real stories from students who have successfully achieved their international education goals with our guidance.
                </p>
            </div>

            <div className="stories-marquee-container">
                <div className="stories-marquee-track">
                    {/* Render Double for Seamless Loop */}
                    {[...stories, ...stories].map((story, index) => {
                        // Determine color based on original index (mod 4)
                        // Use index % stories.length to map correctly across duplicated array
                        const colorClass = colorCycle[(index % stories.length) % 4];

                        return (
                            <div
                                key={index}
                                className="story-card"
                                onClick={() => handleCardClick(index)}
                            >
                                <div className={`story-card-inner ${flippedCards[index] ? 'is-flipped' : ''}`}>
                                    <div className="story-card-front">
                                        <img src={story.image} alt={story.name} className="story-card-img" />
                                    </div>
                                    <div className={`story-card-back ${colorClass}`}>
                                        <p className="story-review">"{story.review}"</p>
                                        <div className="story-meta">
                                            <h4 className="story-name">{story.name}</h4>
                                            <span className="story-uni">{story.uni}, {story.country}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <button
                className="btn-start-journey"
                onClick={handleStartJourney}
            >
                Start Your Journey
            </button>
        </section>
    );
};

export default StudentStoriesSection;
