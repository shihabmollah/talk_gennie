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

    const toggleSidebar = () => {
        setExtended((prev) => !prev);
    };

    const sidebarVariants = {
        open: { width: "250px", transition: { duration: 0.5 } },
        closed: { width: "80px", transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            className="sidebar"
            initial="closed"
            animate={extended ? "open" : "closed"}
            variants={sidebarVariants}
        >
            <div className="top">
                <img
                    src={assets.menu_icon}
                    className="menu"
                    alt="menu-icon"
                    onClick={toggleSidebar} // Toggle sidebar on menu icon click
                />
                {extended && (
                    <>
                        <div className="new-chat" onClick={newChat}>
                            <img src={assets.plus_icon} alt="" />
                            <p>New Chat</p>
                        </div>
                        <AnimatePresence>
                            <motion.div
                                className="recent"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <p className="recent-title">Recent</p>
                                {prevPrompts.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => loadPreviousPrompt(item)}
                                        className="recent-entry"
                                    >
                                        <img src={assets.message_icon} alt="" />
                                        <p>{item.slice(0, 18)}...</p>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </>
                )}
            </div>
            {extended && (
                <div className="bottom">
                    <div className="bottom-item recent-entry">
                        <img src={assets.question_icon} alt="" />
                        <p>Help</p>
                    </div>
                    <div className="bottom-item recent-entry">
                        <img src={assets.history_icon} alt="" />
                        <p>Activity</p>
                    </div>
                    <div className="bottom-item recent-entry">
                        <img src={assets.setting_icon} alt="" />
                        <p>Settings</p>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Sidebar;
