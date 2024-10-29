import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Head, Link, usePage} from '@inertiajs/react';
import { useState } from 'react';

export default function Layout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="bg-gray-100 text-gray-900">
            <Head title={header}/>
            <div className="min-h-screen bg-gray-100">
                {/* <!-- Navigation Bar --> */}
                <nav className="bg-white border-b-2 border-gray-200 py-1.5 flex gap-10 pl-16 font-bold bg-stone-200">
                    <div className="self-start flex flex-row bg-white px-4 rounded-full">
                        <img src="/favicon.ico" alt="Logo" className="h-10 my-auto"/>
                        <Link href={"/"}
                              className="py-2 pl-3 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 text-3xl font-black">
                            TalkNest
                        </Link>
                    </div>
                    <div className="grow flex justify-center items-center text-sky-900">
                        {/* <!-- Main Links --> */}
                        <div className="hidden md:flex gap-10 pl-10">
                            <NavLink style={{ fontFamily: "'Exo 2', sans-serif" }} href={route('posts.index')}>Posts</NavLink>
                        </div>
                    </div>
                    <div className="self-end flex flex-row-reverse pr-16 pb-1">
                        {user ? (
                            <div
                                className="h-11 animated-background bg-gradient-to-r from-red-400 to-yellow-400 p-0.5 flex justify-center rounded-full">
                                
                                <Link href={route('profile.show')}
                                      className="bg-gradient-to-r from-red-200 to-yellow-200 py-2 px-8 rounded-l-full border-yellow-200 hover:bg-yellow-200 duration-300 border-r-2 text-sky-900   ">
                                    Profile
                                </Link>
                                <Link href={route('logout')} method="post"
                                      className="bg-gradient-to-r from-yellow-200 to-red-400 py-2 px-8 rounded-r-full text-white hover:bg-yellow-200 duration-300 text-sky-900">
                                    Logout
                                </Link>
                            </div>
                        ) : (
                            <div
                                className="h-11 animated-background bg-gradient-to-r from-red-200 to-yellow-200 p-0.5 flex justify-center rounded-full">
                                <Link style={{ fontFamily: "'Exo 2', sans-serif" }} href={route('login')}
                                      className="bg-gradient-to-r from-red-200 to-yellow-200 py-2 px-8 rounded-l-full border-yellow-200 hover:bg-yellow-200 duration-300 border-r-2 text-sky-900">
                                    Login
                                </Link>
                                <Link style={{ fontFamily: "'Exo 2', sans-serif" }} href={route('register')}
                                      className="bg-gradient-to-r from-yellow-200 to-red-200 py-2 px-8 rounded-r-full text-white hover:bg-yellow-200 duration-300 text-sky-900">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
                {/* <!-- Page Content --> */}
                <main>{children}</main>
            </div>
        </div>
    );
}
