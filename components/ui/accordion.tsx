"use client";
import React, { useState, useMemo, useCallback, memo } from "react";

interface AccordionItemData {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
}

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  isLast: boolean;
}

const AccordionItem = memo(function AccordionItem({
  question,
  answer,
  isOpen,
  onClick,
  isLast,
}: AccordionItemProps) {
  const uniqueId = useMemo(() => question.replace(/\s+/g, "-"), [question]);

  const containerClasses = useMemo(
    () =>
      `rounded-md w-full max-w-7xl transition-all duration-300 relative overflow-hidden ${
        !isLast ? "mb-8" : ""
      }`,
    [isLast]
  );

  const buttonClasses = useMemo(
    () =>
      "relative w-full flex justify-between items-center rounded-xl p-5 text-left text-lg font-medium text-gray-300 dark:text-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 transition-colors duration-300",
    []
  );

  const iconClasses = useMemo(
    () =>
      `w-5 h-5 text-gray-400 transition-transform duration-300 ${
        isOpen ? "rotate-45 text-indigo-400" : ""
      }`,
    [isOpen]
  );

  const contentClasses = useMemo(
    () =>
      `grid overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`,
    [isOpen]
  );

  return (
    <div
      style={{
        background:
          "radial-gradient(125% 125% at 50% 90%, #000000 40%, #2b092b 100%)",
      }}
      className={containerClasses}
    >
      <button
        type="button"
        className={buttonClasses}
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${uniqueId}`}
        id={`accordion-header-${uniqueId}`}
      >
        <span>{question}</span>

        <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
          <svg
            className={iconClasses}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>

        {/* Animated bottom border */}
        <span
          className={`absolute bottom-0 left-4 h-[1px] transition-all duration-600 ease-in-out ${
            isOpen
              ? "w-[95%]  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-100"
              : "w-0 opacity-0"
          }`}
        ></span>
      </button>

      <div
        id={`accordion-content-${uniqueId}`}
        role="region"
        aria-labelledby={`accordion-header-${uniqueId}`}
        className={contentClasses}
      >
        <div className="overflow-hidden">
          <div className="p-5 pt-2 text-gray-300 dark:text-slate-200">
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = useCallback((index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {items.map((item, index) => (
        <AccordionItem
          key={`${item.question}-${index}`}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}
