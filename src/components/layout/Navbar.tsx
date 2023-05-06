import Link from "next/link";
import { LogOut, SlideOver, ThemeToggle } from "./NavbarComponents";
import { buttonVariants } from "../ui/button";
import { Home, Plus, LogIn } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Fragment } from "react";

export interface NavLink {
	id: number;
	name: string;
	href: string;
	nonAuth: boolean;
	needAuth: boolean;
	icon: JSX.Element;
}

const navLinks: NavLink[] = [
	{ id: 1, name: "Home", href: "/", icon: <Home />, nonAuth: false, needAuth: false },
	{ id: 2, name: "Add Post", href: "/add-post", icon: <Plus />, nonAuth: false, needAuth: true },
	{ id: 3, name: "Log in", href: "/login", icon: <LogIn />, nonAuth: true, needAuth: false },
];

const Navbar = async () => {

	const session = await getServerSession(authOptions);

    const isAuth = Boolean(session?.user.id);

	return (
		<nav className="py-4 fixed border-b w-full z-40 bg-background">
			<div className="flex items-center justify-between max-w-7xl mx-auto lg:px-10 md:px-8 sm:px-6 px-4">
				<div className="sm:flex hidden items-center gap-6">
					<Link className="text-lg font-semibold" href="/">
						Next Blog
					</Link>
					<ul className="flex items-center gap-4 text-sm">
						{navLinks.map((link) => {
							if ((link.nonAuth && isAuth) || (link.needAuth && !isAuth))
								return <Fragment key={link.id}></Fragment>;
							return (
								<Link
									className="font-semibold text-muted-foreground hover:text-foreground transition-all"
									key={link.id}
									href={link.href}
								>
									{link.name}
								</Link>
							);
						})}
                        {isAuth ? <LogOut /> : null}
					</ul>
				</div>
				<div className="sm:hidden block">
					<SlideOver isAuth={isAuth} navLinks={navLinks} />
				</div>
				<ul className="flex items-stretch gap-3">
					<Link
						target="_blank"
						href="https://github.com/mohammad-Gazali/next-blog"
						className={buttonVariants({
							variant: "ghost",
							size: "sm",
							className: "group w-auto",
						})}
					>
						<svg
							className="group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100 w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
						</svg>
					</Link>
					<ThemeToggle />
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
