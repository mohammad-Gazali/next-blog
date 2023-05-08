"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";



const CodeBlockStyle = () => {

    //? "useState" and "useEffect" in this component is for matching the server rendering in [postSlug] server page

	const { theme } = useTheme();

	const [styleText, setStyleText] = useState("");

	useEffect(() => {
		setStyleText(
			theme === "light"
				? `.ql-syntax {
  background: #F6F6F6 !important;
  padding: 1rem !important;
  border-radius: var(--radius) !important;
}`
				: `
.ql-syntax {
  background: #333 !important;
  color: white !important;
  padding: 1rem !important;
  border-radius: var(--radius) !important;
}
`);
	}, [theme]);

	return <style>{styleText}</style>;
};

export default CodeBlockStyle;
