import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResults,
        loading,
        resultData,
        setInput,
        input,
    } = useContext(Context);

    const [listening, setListening] = useState(false); // State to manage listening status

    // Function to handle voice input
    const handleVoiceInput = () => {
        const recognition = new window.webkitSpeechRecognition(); // Initialize SpeechRecognition object
        recognition.lang = "en-US"; // Set language (optional)

        recognition.onstart = () => {
            setListening(true); // Update state to indicate listening
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript; // Get the recognized text
            setInput(transcript); // Set the recognized text as input
        };

        recognition.onend = () => {
            setListening(false); // Update state to indicate listening has ended
        };

        recognition.start(); // Start listening
    };

    const handleCardClick = (promptText) => {
        setInput(promptText);
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSent(); // Call the onSent function when Enter key is pressed
        }
    };

    const greetingVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: (index) => ({
            opacity: 1,
            x: 0,
            transition: { delay: index * 0.2, duration: 0.7 },
        }),
    };

    return (
        <div className="main">
            {/* Include AnimatedBackground component */}
            <AnimatedBackground />

            <div className="nav">
                <p>TalkGenie</p>
                {/* Wrap the motion.img inside an <a> tag */}
                <a href="https://github.com/shihabmollah" target="_blank" rel="noopener noreferrer">
                    <motion.img
                        src={assets.user}
                        alt=""
                        whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                    />
                </a>
            </div>
            <div className="main-container">
                {!showResults ? (
                    <>
                        <motion.div
                            className="greet"
                            initial="hidden"
                            animate="visible"
                            variants={greetingVariants}
                        >
                            <p>
                                <span>Hello, Shihab</span>
                            </p>
                            <p>How Can I Help You Today?</p>
                        </motion.div>
                        <div className="cards">
                            {[
                                {
                                    text: "Suggest Some Place To Visit In Kerala",
                                    icon: assets.compass_icon,
                                },
                                {
                                    text:
                                        "Brainstorm team bonding activities for our work retreat",
                                    icon: assets.message_icon,
                                },
                                {
                                    text: "How to Create a Gyroscope using Disc?",
                                    icon: assets.bulb_icon,
                                },
                                {
                                    text:
                                        "Create a Script for the youtube video about coding",
                                    icon: assets.code_icon,
                                },
                            ].map((item, index) => (
                                <motion.div
                                    className="card"
                                    key={index}
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{
                                        scale: 1.05,
                                        rotate: 2,
                                    }}
                                    whileTap={{
                                        scale: 0.95,
                                        rotate: 2,
                                        background:
                                            "linear-gradient(45deg, #f3ec78, #af4261)",
                                        transition: { duration: 0.3 },
                                    }}
                                    variants={cardVariants}
                                    onClick={() => handleCardClick(item.text)}
                                >
                                    <p>{item.text}</p>
                                    <img src={item.icon} alt="" />
                                </motion.div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                            onKeyPress={handleInputKeyPress} // Handle Enter key press
                            value={input}
                            type="text"
                            placeholder="Enter the Prompt Here"
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img
                                src={assets.mic_icon}
                                alt=""
                                onClick={handleVoiceInput} // Trigger voice input
                                style={{ cursor: "pointer" }}
                            />
                            <img
                                src={assets.send_icon}
                                alt=""
                                onClick={() => {
                                    onSent();
                                }}
                            />
                        </div>
                    </div>
                    <div className="bottom-info">
                        <p>
                            Gemini may display inaccurate info, including about people, so
                            double-check its responses. Your privacy & Gemini Apps
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
