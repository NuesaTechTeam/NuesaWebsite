import React from "react";
import { ChevronDown } from "lucide-react";

/**
 * A premium-styled dropdown filter component.
 */
const DropdownFilter = ({ options, selected, onSelect, label, icon: Icon }) => {
    return (
        <div className="flex flex-col w-full max-w-[240px]">
            {label && (
                <label className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    {Icon && <Icon className="w-3 h-3" />} {label}
                </label>
            )}
            <div className="relative group">
                <select
                    value={selected}
                    onChange={(e) => onSelect(e.target.value)}
                    className="w-full bg-white border-2 border-green-50 px-5 py-3.5 rounded-2xl appearance-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-bold text-gray-700 shadow-sm cursor-pointer hover:border-green-200"
                >
                    {options.map((option) => (
                        <option key={typeof option === "object" ? option.name : option} value={typeof option === "object" ? option.name : option}>
                            {typeof option === "object" ? option.name : option}
                        </option>
                    ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-green-600 group-hover:translate-y-[-40%] transition-transform duration-300">
                    <ChevronDown className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
};

export default DropdownFilter;
