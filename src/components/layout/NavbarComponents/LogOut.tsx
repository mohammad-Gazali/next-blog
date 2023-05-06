"use client";

import { Loader2, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { FC, useState } from "react";
import { useToast } from "@/components/ui/use-toast";



interface LogOutProps {
	smallScreen?: boolean;
}

const LogOut: FC<LogOutProps> = ({ smallScreen }) => {

	const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();

	const handleSignOut = async () => {

        setIsLoading(true);

        try {
            
            await signOut();

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Log out Error",
                description: "There was a problem with your request.",
            })
        } finally {
            setIsLoading(false)
        }

    };

	return (
		<div
			onClick={handleSignOut}
			className={
				smallScreen
					? "cursor-pointer border-t flex gap-2 items-center w-full max-w-xs hover:bg-muted py-3 px-2 divide-y"
					: "cursor-pointer font-semibold text-muted-foreground hover:text-foreground transition-all"
			}
		>
			{smallScreen && !isLoading ? <LogOutIcon /> : null}
			{isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log out"}
		</div>
	);
};

export default LogOut;
