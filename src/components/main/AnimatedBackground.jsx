import React from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
    const backgroundVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 1 } },
    };

    return (
        <motion.div
            className="animated-background"
            initial="initial"
            animate="animate"
            variants={backgroundVariants}
        />
    );
};

export default AnimatedBackground;
