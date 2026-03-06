import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A premium-styled custom dropdown filter component with animations.
 */
const DropdownFilter = ({ options, selected, onSelect, label, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        // Also listen for touch events for better mobile support
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    const handleSelect = (optionValue) => {
        onSelect(optionValue);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col w-full relative" ref={dropdownRef}>
            {label && (
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2 flex items-center gap-2 pl-1">
                    {Icon && <Icon className="w-3.5 h-3.5 text-gray-400" />} {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between w-full bg-white/40 backdrop-blur-xl border px-5 py-3.5 rounded-2xl outline-none transition-all duration-300 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:bg-white/60 ${isOpen ? "border-green-400 ring-[3px] ring-green-500/20 bg-white" : "border-white/60 hover:border-gray-300"
                    }`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-gray-700 truncate mr-4">
                    {selected}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-gray-400 shrink-0"
                >
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute z-50 top-[calc(100%+8px)] left-0 w-full min-w-[200px]"
                    >
                        <ul
                            className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 py-2 max-h-[60vh] overflow-y-auto overscroll-contain focus:outline-none"
                            role="listbox"
                        >
                            {options.map((option) => {
                                const optionValue = typeof option === "object" ? option.name : option;
                                const isSelected = selected === optionValue;

                                return (
                                    <li
                                        key={optionValue}
                                        onClick={() => handleSelect(optionValue)}
                                        role="option"
                                        aria-selected={isSelected}
                                        className={`flex items-center justify-between px-5 py-3 cursor-pointer transition-colors duration-200 ${isSelected
                                                ? "bg-green-50/50 text-green-700 font-bold"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                                            }`}
                                    >
                                        <span className="truncate">{optionValue}</span>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="shrink-0 text-green-500"
                                            >
                                                <Check className="w-4 h-4" />
                                            </motion.div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DropdownFilter;
