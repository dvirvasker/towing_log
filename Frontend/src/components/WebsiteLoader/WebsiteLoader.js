/* eslint-disable import/no-unresolved */
/* eslint-disable react/style-prop-object */
/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import TneLogo from "assets/images/projectLogoImages/towinglog.odd";
// import CasualtiesLogo from "assets/images/projectLogoImages/CasualtiesLogo.png";
import { motion } from "framer-motion";
import React from "react";

import "./WebsiteLoader.css";
// const svgVariants = {
//   start: {
//     opacity: 0,
//     pathLength: 0,
//   },
//   finished: {
//     opacity: 1,
//     pathLength: 1,
//     transition: {
//       duration: 3,
//       ease: "easeOut",
//     },
//   },
// };

const WebsiteLoader = () => {
  return (
    <div className="app__Loader">
      <motion.div
        className="box"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
      <img className="ProjectLogoSVGimage" src={TneLogo} alt="ProjectLogoSVGimage" />
    </div>
  );
};

export default WebsiteLoader;
