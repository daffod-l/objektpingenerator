import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState<"rainbow" | "gradient" | "single">("rainbow");
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [pinCount, setPinCount] = useState<string>("9");
  const [allowDuplicateMembers, setAllowDuplicateMembers] = useState<boolean>(true);
  const [allowDuplicateObjekts, setAllowDuplicateObjekts] = useState<boolean>(true);

  const styleOptions = [
    { label: "rainbow", value: "rainbow" },
    { label: "gradient", value: "gradient" },
    { label: "single colour", value: "single" },
  ];

  const memberNumbers = Array.from({ length: 24 }, (_, i) => i + 1); // S1-S24

  const toggleMember = (num: number) => {
    if (selectedMembers.includes(num)) {
      setSelectedMembers(selectedMembers.filter((n) => n !== num));
    } else {
      setSelectedMembers([...selectedMembers, num]);
    }
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen flex flex-col items-center justify-center bg-white text-black px-6 sm:px-20`}
    >
      {/* Title */}
      <h1 className="text-4xl font-bold mb-10">objekt pin generator</h1>

      {/* Cosmo ID Input */}
      <input
        type="text"
        placeholder="enter your cosmo ID here..."
        className="w-full max-w-md px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400 text-black mb-8 text-center"
      />

      {/* Style selection buttons */}
      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        {styleOptions.map((option) => {
          const isSelected = selectedStyle === option.value;
          return (
            <button
              key={option.value}
              onClick={() => setSelectedStyle(option.value as any)}
              className={`px-6 py-3 rounded-lg font-medium transition min-w-[120px] text-center ${
                isSelected
                  ? "bg-black text-white border-2 border-black"
                  : "border-2 border-black text-black hover:bg-black hover:text-white"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Member circle buttons */}
      <div className="mb-6 flex flex-col items-center">
        <label className="mb-2 font-medium text-center">members (none selected: all)</label>
        <div className="flex gap-2 flex-wrap justify-center">
          {memberNumbers.map((num) => {
            const isSelected = selectedMembers.includes(num);
            return (
              <button
                key={num}
                onClick={() => toggleMember(num)}
                className={`w-10 h-10 rounded-full border-2 transition flex items-center justify-center text-sm ${
                  isSelected
                    ? "bg-black border-black text-white"
                    : "border-black bg-white hover:bg-gray-200 text-black"
                }`}
              >
                S{num} {/* placeholder, can replace with image */}
              </button>
            );
          })}
        </div>
      </div>

      {/* Duplicate toggles */}
      <div className="flex gap-6 mb-6 flex-wrap justify-center">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={allowDuplicateMembers}
            onChange={(e) => setAllowDuplicateMembers(e.target.checked)}
            className="w-5 h-5"
          />
          allow duplicate members
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={allowDuplicateObjekts}
            onChange={(e) => setAllowDuplicateObjekts(e.target.checked)}
            className="w-5 h-5"
          />
          allow duplicate objekts
        </label>
      </div>

      {/* Pin count input */}
      <div className="mb-10 w-full max-w-md flex flex-col items-center">
        <label className="mb-2 font-medium text-center">no. of pins</label>
        <input
          type="number"
          min={1}
          max={9}
          value={pinCount}
          onChange={(e) => setPinCount(e.target.value)}
          placeholder="9"
          className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-center"
        />
      </div>

      {/* Placeholder for future board display */}
      <div className="text-gray-500 italic">pins will appear here...</div>
    </div>
  );
}
