import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A premium-styled custom dropdown filter component with animations.
 */
const DropdownFilter = ({ options, selected, onSelect, label, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const dropdownRef = useRef(null);
    const optionValues = options.map((option) => typeof option === "object" ? option.name : option);
    const listboxId = `${label || "filter"}-filter-listbox`.toLowerCase().replace(/\s+/g, "-");

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
        if (!optionValue) return;
        onSelect(optionValue);
        setIsOpen(false);
    };

    const openMenu = () => {
        if (optionValues.length === 0) return;
        const selectedIndex = optionValues.indexOf(selected);
        setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
        setIsOpen(true);
    };

    const handleTriggerKeyDown = (event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            if (optionValues.length === 0) return;
            if (!isOpen) {
                openMenu();
                return;
            }

            setActiveIndex((current) => {
                const direction = event.key === "ArrowDown" ? 1 : -1;
                return (current + direction + optionValues.length) % optionValues.length;
            });
        }

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (optionValues.length === 0) return;
            if (isOpen) {
                handleSelect(optionValues[activeIndex]);
            } else {
                openMenu();
            }
        }

        if (event.key === "Escape") {
            setIsOpen(false);
        }
    };

    return (
        <div className={`flex flex-col w-full relative ${isOpen ? "z-[90]" : "z-0"}`} ref={dropdownRef}>
            {label && (
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2 flex items-center gap-2 pl-1">
                    {Icon && <Icon className="w-3.5 h-3.5 text-gray-400" />} {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => isOpen ? setIsOpen(false) : openMenu()}
                onKeyDown={handleTriggerKeyDown}
                className={`flex items-center justify-between w-full bg-white border px-5 py-3.5 rounded-2xl outline-none transition duration-200 hover:bg-gray-50 ${isOpen ? "border-green-400 ring-[3px] ring-green-500/20" : "border-gray-200 hover:border-gray-300"
                    }`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={listboxId}
                aria-activedescendant={isOpen && optionValues.length > 0 ? `${listboxId}-option-${activeIndex}` : undefined}
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
                        className="absolute z-[90] top-[calc(100%+8px)] left-0 w-full min-w-[220px]"
                    >
                        <ul
                            id={listboxId}
                            className="bg-white rounded-2xl shadow-[0_16px_44px_rgba(0,0,0,0.16)] border border-gray-200 py-2 max-h-[18rem] overflow-y-auto overscroll-contain focus:outline-none"
                            role="listbox"
                        >
                            {optionValues.map((optionValue, index) => {
                                const isSelected = selected === optionValue;
                                const isActive = activeIndex === index;

                                return (
                                    <li
                                        key={optionValue}
                                        id={`${listboxId}-option-${index}`}
                                        role="option"
                                        aria-selected={isSelected}
                                        className="px-2"
                                    >
                                        <button
                                            type="button"
                                            onMouseEnter={() => setActiveIndex(index)}
                                            onClick={() => handleSelect(optionValue)}
                                            className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-colors duration-150 ${isSelected
                                                    ? "bg-green-50 text-green-700 font-bold"
                                                    : isActive
                                                        ? "bg-gray-50 text-gray-900 font-medium"
                                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                                                }`}
                                        >
                                            <span className="truncate">{optionValue}</span>
                                            {isSelected && (
                                                <motion.span
                                                    initial={{ scale: 0.95 }}
                                                    animate={{ scale: 1 }}
                                                    className="shrink-0 text-green-500"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </motion.span>
                                            )}
                                        </button>
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
