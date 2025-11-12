import React from "react";
import Accordion from "@/components/ui/accordion";
import Heading1 from "../Headings/Heading1";

const faqData = [
  {
    question: "What is the purpose of this To-Do List app?",
    answer:
      "This To-Do List app helps you organize daily tasks, set priorities, track progress, and stay productive. Whether for personal use or team collaboration, it ensures you never miss an important task.",
  },
  {
    question: "Can I use it on mobile devices?",
    answer:
      "Yes! Our To-Do List app is fully responsive and optimized for mobile, tablet, and desktop, allowing you to manage your tasks anytime, anywhere.",
  },
  {
    question: "Does it support reminders and notifications?",
    answer:
      "Absolutely. You can set task reminders, get deadline alerts, and even enable push notifications to stay on top of your to-dos.",
  },
  {
    question: "Can I share my tasks with team members?",
    answer:
      "Yes, you can create shared lists, assign tasks, and track progress collaboratively in real time. It’s great for teams and project management.",
  },
  {
    question: "How do you ensure my data is secure?",
    answer:
      "We use industry-standard encryption, secure authentication, and cloud-based storage to keep your data safe and private at all times.",
  },
  {
    question: "Is there a premium version with more features?",
    answer:
      "Yes! Our premium plan includes advanced analytics, recurring tasks, integrations with tools like Google Calendar, and more customization options.",
  },
];


// --- The Page Component ---
export default function FaqPage() {
  return (
    <div id="faqs" className='flex w-full  h-auto py-14 flex-col bg-gradient-to-b from-white to-blue-50 items-center justify-center font-sans  duration-500'>
        <div className="">
          <Heading1 text="Frequently Asked Questions"/>
        </div>
        <p className='text-gray-600 dark:text-slate-400 text-center mb-10'>
          A production-ready, accessible, and stylish accordion component.
        </p>
        
        {/* Here we use the reusable component with our data */}
        
        <Accordion items={faqData} />

    </div>
  );
}