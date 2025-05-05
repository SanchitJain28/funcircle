"use client"
import { Info } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const SubscriptionPlan = () => {
  const [tabs, setTabs] = useState<string>("PRO");

  // Animation variants
  const containerVariants = {
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
      
    }
  };

 
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        
        type: "spring", 
        stiffness: 300, 
        damping: 24,
        when: "beforeChildren",
        staggerChildren: 0.05,
        
      }
    },
    exit: { 
      opacity: 0, 
      y: -30, 
      transition: { duration: 0.1 } 
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div 
        className="flex p-4 border-b"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.p 
          className="text-lg font-semibold mx-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          SUBSCRIPTION
        </motion.p>
      </motion.div>

      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
      >
        <motion.p 
          className="bg-pink-700 rounded-2xl text-sm px-4 py-1 text-white my-4 font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          1 month
        </motion.p>
      </motion.div>

      <motion.div 
        className="flex justify-center gap-6 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className={`flex flex-col items-center px-8 py-4 rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
            tabs === "PRO" ? "border-pink-600 border-2" : "border border-blue-600"
          }`}
          onClick={() => setTabs("PRO")}
          variants={itemVariants}
          animate={tabs === "PRO" ? "selected" : "unselected"}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
        >
          <p className="text-green-700 font-bold mb-1">PRO</p>
          <p className="text-2xl font-bold">1</p>
          <p className="text-lg">month</p>
          <p className="text-lg font-semibold">Rs599/mo</p>
          <motion.p 
            className="text-lg text-pink-700 font-bold"
            animate={{ 
              scale: [1, 1.05, 1],
              transition: { 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 1.5 
              }
            }}
          >
            SAVE 50%
          </motion.p>
          <p className="py-2 border-t border-pink-700 font-bold">Rs599</p>
        </motion.div>
        
        <motion.div
          className={`flex flex-col items-center px-8 py-4 rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
            tabs === "ELITE" ? "border-pink-600 border" : "border border-blue-600"
          }`}
          onClick={() => setTabs("ELITE")}
          variants={itemVariants}
          animate={tabs === "ELITE" ? "selected" : "unselected"}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
        >
          <p className="text-green-700 font-bold mb-1">ELITE</p>
          <p className="text-2xl font-bold">1</p>
          <p className="text-lg">month</p>
          <p className="text-lg font-semibold">Rs599/mo</p>
          <motion.p 
            className="text-lg text-pink-700 font-bold"
            animate={{ 
              scale: [1, 1.05, 1],
              transition: { 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 1.5 
              }
            }}
          >
            SAVE 50%
          </motion.p>
          <p className="py-2 border-t border-pink-700 font-bold">Rs599</p>
        </motion.div>
      </motion.div>

      <AnimatePresence >
        {tabs === "PRO" ? (
          <motion.div
            key="pro-content"
            className="mt-6"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div 
              className="flex flex-col items-center my-6"
              variants={itemVariants}
            >
              <motion.p className="my-1 font-medium" variants={itemVariants}>CURRENT SPORTS</motion.p>
              <motion.div 
                className="border p-3 flex flex-col items-center border-zinc-700 rounded-xl hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <img src="/badminton.svg" alt="Badminton" className="w-12 my-2" />
                <p className="font-medium">BADMINTON</p>
              </motion.div>
            </motion.div>
            
            <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
              <motion.p className="text-center font-semibold mb-2" variants={itemVariants}>PRO BENEFITS</motion.p>
              <motion.div 
                className="flex flex-col px-10 py-4 border border-black mx-8 rounded-lg shadow-sm"
                variants={itemVariants}
              >
                {[
                  { text: "Currently only badminton is live", badge: true },
                  { text: "8 entries per month", badge: true },
                  { text: "2 entries can be used by your friends", badge: false },
                  { text: "This will work on evening slots too", badge: false },
                  { text: "pre-book", badge: false },
                  { text: "4 Slots will be used in tournaments", badge: false }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center mb-2"
                    variants={itemVariants}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <Info size={20} className="mr-2 text-pink-700"/>
                    <p className="text-black text-sm flex-1">{item.text}</p>
                    {item.badge && (
                      <motion.button 
                        className="bg-gradient-to-r from-[#9D7116] via-[#FBEA35] to-[#986D13] text-sm px-2 py-0.5 rounded-xl ml-2 font-bold"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Top
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="elite-content"
            className="mt-6"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className="flex flex-col items-center my-6" variants={itemVariants}>
              <motion.p className="text-center font-semibold mb-2" variants={itemVariants}>ELITE BENEFITS</motion.p>
              <motion.div 
                className="flex flex-col px-10 py-4 border border-black mx-8 rounded-lg shadow-sm"
                variants={itemVariants}
              >
                {[
                  { text: "Currently only Box cricket is live", badge: true },
                  { text: "8 entries per month", badge: false },
                  { text: "You can create groups", badge: true },
                  { text: "This will work on evening slots too", badge: false },
                  { text: "pre-book", badge: false }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center mb-2"
                    variants={itemVariants}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <Info size={20} className="mr-2 text-pink-700"/>
                    <p className="text-black text-sm flex-1">{item.text}</p>
                    {item.badge && (
                      <motion.button 
                        className="bg-gradient-to-r from-[#9D7116] via-[#FBEA35] to-[#986D13] text-sm px-2 py-0.5 rounded-xl ml-2 font-bold"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Top
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        className="px-8 py-3 text-white bg-pink-700 rounded-xl mx-auto my-6 font-bold flex justify-center shadow-md"
        whileHover={{ scale: 1.05, backgroundColor: "#be185d" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        Continue Subscription
      </motion.button>
    </motion.div>
  );
};

export default SubscriptionPlan;