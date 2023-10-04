import React from 'react'
import logo_white from '../assets/images/logo-white.png';
import app from '../assets/images/app.png';
import playstore from '../assets/images/playstore.png';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'react-feather';
import {AiOutlineShoppingCart, MdKeyboardArrowRight, FaRegEnvelope, BsPencil, FiDribbble, BiLogoBehance, FaLinkedin, LiaFacebookF, AiOutlineInstagram, AiOutlineTwitter } from "../assets/icons/vander"

export default function Footer() {
    return (
        <footer className="footer bg-dark-footer relative text-gray-200 dark:text-gray-200 mt-24">
            <div className="container">
                <div className="grid grid-cols-1">
                    <div className="relative py-16">
                        <div className="relative w-full">
                            
                            <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px] -mt-24">
                                <div className="lg:col-span-4 md:col-span-12">
                                    <Link to="#" className="text-[22px] focus:outline-none">
                                        <img src={logo_white} alt="" />
                                    </Link>
                                    <p className="mt-6 text-gray-300">Buy, sell and discover exclusive digital assets by the top artists of NFTs world.</p>

                                </div>

                                <div className="lg:col-span-2 md:col-span-4">
                                    <ul className="list-none footer-list mt-6">
                                        <li><Link to="/explore-one" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Explore Item</Link></li>
                                        <li className="mt-[10px]"><Link to="/auction" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Live Auction</Link></li>
                                        <li className="mt-[10px]"><Link to="/activity" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Activities</Link></li>
                                        <li className="mt-[10px]"><Link to="/wallet" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Wallets</Link></li>
                                        <li className="mt-[10px]"><Link to="/creators" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Creators</Link></li>
                                    </ul>
                                </div>

                                <div className="lg:col-span-3 md:col-span-4">
                                    <ul className="list-none footer-list mt-6">
                                        <li><Link to="/aboutus" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> About Us</Link></li>
                                        <li className="mt-[10px]"><Link to="/blogs" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Blog & News</Link></li>
                                        <li className="mt-[10px]"><Link to="/terms" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Terms & Condition</Link></li>
                                        <li className="mt-[10px]"><Link to="/privacy" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Privacy policy</Link></li>
                                        <li className="mt-[10px]"><Link to="/login" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Login</Link></li>
                                        <li className="mt-[10px]"><Link to="/contact" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out inline-flex items-center"><MdKeyboardArrowRight className="me-1 text-lg"/> Contact Us</Link></li>
                                    </ul>
                                </div>

                                <div className="lg:col-span-3 md:col-span-4">
                                    <div className="mt-6">

                                        <div className="flex mt-6">
                                            <Mail className="w-5 h-5 text-violet-600 me-3 mt-1"></Mail>
                                            <div className="">
                                                <Link to="mailto:contact@example.com" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out">contact@example.com</Link>
                                            </div>
                                        </div>

                                        <div className="flex mt-6">
                                            <Phone className="w-5 h-5 text-violet-600 me-3 mt-1"></Phone>
                                            <div className="">
                                                <Link to="tel:+152534-468-854" className="text-[16px] text-gray-300 hover:text-gray-400 duration-500 ease-in-out">+152 534-468-854</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
        </footer>
    )
}
