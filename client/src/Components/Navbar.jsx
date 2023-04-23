import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const navLinks = [
    {
        name: "Dashboard",
        link: "/dashboard",
    },
    {
        name: "Profile",
        link: "/profile",
    },
];

const NavLinkDesktop = ({ link }) => {
    return (
        <Link
            to={link.link}
            className="group relative block cursor-pointer py-1 font-medium opacity-80 hover:opacity-100"
        >
            {link.name}
        </Link>
    );
};

const NavLinkMobile = ({ link }) => {
    return (
        <Link to={link.link} className="group block py-1">
            <span
                className="relative flex flex-row items-center rounded py-2 pr-3 text-base font-medium text-zinc-900
                hover:text-zinc-800"
            >
                {link.name}
            </span>
        </Link>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser]= useState(null);

    const logout = () => {
        localStorage.removeItem("currentUser");
        window.location.href = "/";
    };

    useEffect(() => {
        var localData = JSON.parse(localStorage.getItem('currentUser'));
        setUser(localData);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav
            aria-label="Main Navigation"
            className="relative bg-white p-2 px-4 text-zinc-900 shadow"
        >
            <div className="flex w-full items-center justify-between">
                <Link
                    to="/"
                    className="flex-shrink-0 text-xl font-semibold tracking-wider"
                >
                    TimeTrackr
                </Link>
                {/* Desktop nav */}
                <div className="hidden w-full sm:flex sm:items-center">
                    <ul className="flex flex-1 justify-center gap-6">
                        {user && navLinks.map((link) => (
                            <li key={link.name}>
                                <NavLinkDesktop link={link} />
                            </li>
                        ))}
                    </ul>
                    <ul className="flex items-center gap-4">
                        {user ? (
                            <li key="Logout">
                                <button
                                    onClick={logout}
                                    className="inline-flex items-center rounded-md bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-1.5 text-center text-base font-medium text-white hover:bg-gradient-to-l"
                                >
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <>
                                <Link
                                    to="/"
                                    className="text-base font-medium opacity-80 hover:opacity-100"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center rounded-md bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-1.5 text-center text-base font-medium text-white hover:bg-gradient-to-l"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </ul>
                </div>

                <button
                    type="button"
                    onClick={toggleMenu}
                    className=" focus-ring-inset inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white sm:hidden"
                >
                    <span className="sr-only">
                        {isOpen ? "Close main menu" : "Open main menu"}
                    </span>
                    {isOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Nav */}
            <div
                className={`transition-max-h w-full overflow-hidden bg-white duration-[400ms] ease-in-out ${
                    isOpen ? "max-h-96" : "max-h-0"
                }`}
            >
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <NavLinkMobile link={link} />
                        </li>
                    ))}
                    {user ? (
                        <li key="Logout">
                            <button
                                onClick={logout}
                                className="inline-flex items-center rounded-md bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-1.5 text-center text-base font-medium text-white hover:bg-gradient-to-l"
                            >
                                <span className="relative">
                                    Logout
                                </span>
                            </button>
                        </li>
                    ) : (
                        <>
                            <li key="Login">
                                <NavLinkMobile
                                    link={{ name: "Login", link: "/login" }}
                                />
                            </li>
                            <li key="Signup">
                                <NavLinkMobile
                                    link={{ name: "Signup", link: "/signup" }}
                                />
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
