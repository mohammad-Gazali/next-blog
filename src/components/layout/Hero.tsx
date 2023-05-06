import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

const Hero = () => {
	return (
		<div className="relative overflow-hidden]">
			<div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
				<div className="mt-5 max-w-2xl text-center mx-auto">
					<h1 className="block font-bold text-4xl md:text-5xl lg:text-6xl">
						Welcome To{" "}
						<span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
                            Next Blog
						</span>
					</h1>
				</div>
				<div className="mt-5 max-w-3xl text-center mx-auto">
					<p className="text-lg text-muted-foreground">
						Next Blog is a rich source with most helpful articles about
						many fields such as technology, health, medical and sportive.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Hero;
