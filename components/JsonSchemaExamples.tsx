import React, { useState } from "react";
import { useTheme } from "./context/ThemeContext";

const Examples = [
  {
    "formTitle": "Project Requirements Survey",
    "formDescription": "Please fill out this survey about your project needs",
    "fields": [
    {
    "id": "name",
    "type": "text",
    "label": "Full Name",
    "required": true,
    "placeholder": "Enter your full name"
    },
    {
    "id": "email",
    "type": "email",
    "label": "Email Address",
    "required": true,
    "placeholder": "you@example.com",
    "validation": {
    "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    "message": "Please enter a valid email address"
    }
    },
    {
    "id": "companySize",
    "type": "select",
    "label": "Company Size",
    "required": true,
    "options": [
    { "value": "1-50", "label": "1-50 employees" },
    { "value": "51-200", "label": "51-200 employees" },
    { "value": "201-1000", "label": "201-1000 employees" },
    { "value": "1000+", "label": "1000+ employees" }
    ]
    },
    {
    "id": "industry",
    "type": "radio",
    "label": "Industry",
    "required": true,
    "options": [
    { "value": "tech", "label": "Technology" },
    { "value": "healthcare", "label": "Healthcare" },
    { "value": "finance", "label": "Finance" },
    { "value": "retail", "label": "Retail" },
    { "value": "other", "label": "Other" }
    ]
    },
    {
    "id": "timeline",
    "type": "select",
    "label": "Project Timeline",
    "required": true,
    "options": [
    { "value": "immediate", "label": "Immediate (within 1 month)" },
    { "value": "short", "label": "Short-term (1-3 months)" },
    { "value": "medium", "label": "Medium-term (3-6 months)" },
    { "value": "long", "label": "Long-term (6+ months)" }
    ]
    },
    {
    "id": "comments",
    "type": "textarea",
    "label": "Additional Comments",
    "required": false,
    "placeholder": "Any other details you'd like to share..."
    }
    ]
    }
    
]
    
const JsonSchemaExamples: React.FC = () => {
  const {isDarkMode } = useTheme();
  const [copiedIndex,setCopiedIndex] = useState<number | null>(null);

//function to copy the example to the clipboard
  const handleCopy = (example: object,index:number) => {
    navigator.clipboard.writeText(JSON.stringify(example, null, 2));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null),2000);
  };

  return (
    <div className="flex flex-row gap-3 overflow-auto custom-scrollbar">
      {Examples.map((example, idx) => (
        <div id={`example-card-${idx}`}
          key={idx}
          className={`relative bg-transparent min-w-[300px] h-[150px] p-2 rounded-lg overflow-hidden border border-gray-300 cursor-pointer hover:shadow-md
            ${isDarkMode?"text-white":"text-black"}`}
          onClick={() => handleCopy(example,idx)}
        > 
          {/* copied overlay */}
          {copiedIndex === idx && (
            <div id={`copied-${idx}`} className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm
            ${isDarkMode?"bg-white/50":"bg-black/50"}`}>
              <span className="text-white text-sm">Copied!</span>
            </div>
          )}
          {/* copied overlay */}
          <h3 id={`form-title-${idx}`} className="font-bold text-sm mb-2">{example.formTitle}</h3>
          <pre className="text-xs whitespace-pre-wrap">
            {JSON.stringify(example, null, 2).slice(0, 400)}
            {JSON.stringify(example, null, 2).length > 400 && "..."}
          </pre>
        </div>
      ))}
    </div>
  );
};
export default JsonSchemaExamples;
