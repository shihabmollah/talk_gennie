import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPreviousPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    const sidebarVariants = {
        open: { width: "250px", transition: { duration: 0.5 } },
        closed: { width: "80px", transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            className="sidebar"
            initial="closed"
            animate={extended ? "open" : "closed"} // <-- Added closing curly brace
            variants={sidebarVariants}
        >
            <div className="top">
                <img
                    src={assets.menu_icon}
                    className="menu"
                    alt="menu-icon"
                    onClick={() => {
                        setExtended((prev) => !prev);
                    }}
                />
                <div className="new-chat">
                    <img src={assets.plus_icon} alt="" onClick={() => {
                        newChat();
                    }} />
                    {extended ? <p>New Chat</p> : null}
                </div>
                <AnimatePresence>
                    {extended && (
                        <motion.div
                            className="recent"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <p className="recent-title">Recent</p>
                            {prevPrompts.map((item, index) => (
                                <div key={index} onClick={() => {
                                    loadPreviousPrompt(item);
                                }} className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0, 18)}...</p>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </motion.div>
    );
};

export default Sidebar;