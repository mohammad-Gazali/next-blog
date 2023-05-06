"use client";

import { FC, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { NavLink } from "../Navbar";
import Link from "next/link";
import LogOut from "./LogOut";




interface SlideOverProps {
    navLinks: NavLink[];
	isAuth: boolean;
}

const SlideOver: FC<SlideOverProps> = ({ navLinks, isAuth }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="z-50">
			<Button className="group" variant="ghost" onClick={() => setOpen(true)}>
				<Menu className="group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100" />
			</Button>
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={setOpen}>
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-900/50 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-700"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500 sm:duration-700"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full"
								>
									<Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
										<div className="flex h-full flex-col overflow-y-hidden bg-background py-6 shadow-xl">
											<div className="px-4 sm:px-6 flex items-center justify-between">
												<Dialog.Title className="text-lg font-semibold leading-6">
													Next Store
												</Dialog.Title>
												<Button
													variant="ghost"
													className="border-2 p-2 group"
													onClick={() => setOpen(false)}
												>
													<span className="sr-only">Close panel</span>
													<X className="group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100 h-6 w-6" aria-hidden="true" />
												</Button>
											</div>
											<ScrollArea className="relative mt-6 flex-1 px-4 sm:px-6 h-full flex flex-col border-t-2">
                                                <div className="pt-6" />
												{navLinks.map((link, index) => {
													if (isAuth && link.nonAuth) return <Fragment key={link.id}></Fragment>
													return (
														<Link onClick={() => setOpen(false)} className={`${index !== 0 ? "border-t" : ""} flex gap-2 items-center w-full max-w-xs hover:bg-muted py-3 px-2 divide-y`} key={link.id} href={link.href}>
															{link.icon} {link.name}
														</Link>
                                                )})}
												{isAuth ? (
													<LogOut smallScreen/>
												) : null}
											</ScrollArea>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</div>
	);
}


export default SlideOver