"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";



const CustomQuillStyles = () => {

    //? "useState" and "useEffect" in this component is for matching the server rendering in [postSlug] server page

	const { theme } = useTheme();

	const [styleText, setStyleText] = useState("");

	useEffect(() => {
		setStyleText(
			theme === "light"
				? `.ql-snow .ql-syntax {
              background: #F6F6F6 !important;
              color: hsl(var(--foreground)) !important;
              padding: 1rem !important;
              border-radius: var(--radius) !important;
            }

            .ql-snow a {
              color: hsl(var(--primary)) !important;
              display: inline-flex !important; 
              transition-property: background-color, border-color, color, fill, stroke !important; 
              font-size: 0.875rem !important;
              line-height: 1.25rem !important; 
              font-weight: 500 !important; 
              justify-content: center !important; 
              align-items: center !important; 
              border-radius: 0.375rem !important; 
              gap: 0.5rem !important; 
            }

            .ql-snow .ql-tooltip {
              background-color: hsl(var(--background)) !important;
              border: 1px solid hsl(var(--border)) !important;
              color: hsl(var(--foreground)) !important;
              box-shadow: none !important;
              padding: 5px 12px !important;
              white-space: nowrap !important;
            }
          `
				: `.ql-snow .ql-syntax {
              background: #333 !important;
              color: white !important;
              padding: 1rem !important;
              border-radius: var(--radius) !important;
            }

            .ql-snow a {
              display: inline-flex !important; 
              color: hsl(var(--primary)) !important;
              transition-property: background-color, border-color, color, fill, stroke !important; 
              font-size: 0.875rem !important;
              line-height: 1.25rem !important; 
              font-weight: 500 !important; 
              justify-content: center !important; 
              align-items: center !important; 
              border-radius: 0.375rem !important; 
              gap: 0.5rem !important;
            }

            .ql-snow .ql-tooltip {
              background-color: hsl(var(--background)) !important;
              border: 1px solid hsl(var(--border)) !important;
              color: hsl(var(--foreground)) !important;
              box-shadow: none !important;
              padding: 5px 12px !important;
              white-space: nowrap !important;
            }
`);
	}, [theme]);

	return <style>{styleText}</style>;
};

export default CustomQuillStyles;
