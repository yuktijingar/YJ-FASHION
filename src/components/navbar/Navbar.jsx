import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('users'));
    const cartItems = useSelector((state) => state.cart);

    const logout = () => {
        localStorage.clear('users');
        navigate('/login');
    };

    const changePasswordLink = user ? (
        <li>
            <Link to={'/change-password'}>
                <i className="fa-solid fa-key mr-1"></i>Change Password
            </Link>
        </li>
    ) : null;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-pink-600 sticky top-0 rounded-b-lg">
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3">
                <div className="left py-3 lg:py-0 pl-15">
                    <Link to={'/'}>
                       <img src="https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/YJ-FASHION%20LOGO.png?alt=media&token=db1a0298-5bef-4164-bc8c-6de12b2f6bda" alt="logo" className='mx-auto' style={{width:'300px',height:'50px', filter:'brightness(0) invert(1)'}} />
                    </Link>
                </div>

                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-white p-2 focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>
                </div>

                <div className={`right lg:flex justify-center mb-4 lg:mb-0 ${isOpen ? 'block' : 'hidden'}`} style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    <ul className="lg:flex lg:space-x-3 text-white font-medium text-md px-10">
                        {/* Menu items */}
                        {/* Home */}
                        <li>
                            <Link to={'/'}>
                                <i className="fa-solid fa-house-chimney mr-1"></i>Home
                            </Link>
                        </li>

                        {/* All Product */}
                        <li>
                            <Link to={'/allproduct'}>
                                <i className="fa-solid fa-shirt mr-1"></i>All Product
                            </Link>
                        </li>

                        {/* Signup */}
                        {!user && (
                            <li>
                                <Link to={'/signup'}>
                                    <i className="fa-solid fa-arrow-right-to-bracket mr-1"></i>Signup
                                </Link>
                            </li>
                        )}

                        {/* Login */}
                        {!user && (
                            <li>
                                <Link to={'/login'}>
                                    <i className="fa-solid fa-arrow-right-to-bracket mr-1"></i>Login
                                </Link>
                            </li>
                        )}

                        {/* User */}
                        {user?.role === 'user' && (
                            <li>
                                <Link to={'/user-dashboard'}>
                                    <i className="fa-regular fa-circle-user mr-1"></i>
                                    {user?.name.charAt(0).toUpperCase() + user?.name.slice(1).toLowerCase()}
                                </Link>
                            </li>
                        )}

                        {/* Admin */}
                        {user?.role === 'admin' && (
                            <li>
                                <Link to={'/admin-dashboard'}>
                                    <i className="fa-solid fa-user-tie mr-1"></i>
                                    {user?.name.charAt(0).toUpperCase() + user?.name.slice(1).toLowerCase()}
                                </Link>
                            </li>
                        )}

                        {/* About Us */}
                        <li>
                            <Link to={'/aboutus'}>
                                <i className="fa-regular fa-building mr-1"></i> About Us
                            </Link>
                        </li>

                        {/* Cart */}
                        <li>
                            <Link to={'/cart'}>
                                <i className="fa-solid fa-cart-shopping mr-1"></i>Cart({cartItems.length})
                            </Link>
                        </li>

                        {/* Change Password */}
                        {changePasswordLink}

                        {/* logout */}
                        {user && (
                            <li className="cursor-pointer" onClick={logout}>
                                <i className="fa-solid fa-right-from-bracket mr-1"></i>Logout
                            </li>
                        )}
                    </ul>
                </div>

                <SearchBar />
            </div>
        </nav>
    );
};

export default Navbar;
