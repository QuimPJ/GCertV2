import React from 'react'
import logo_dark from '../../assets/images/logo-dark.png';
import logo_light from '../../assets/images/logo-light.png';
import { Link } from "react-router-dom";
import Switcher from '../../components/switcher';

export default function ResetPassword() {
    return (
        <>
            <section className="md:h-screen py-36 flex items-center bg-[url('../../assets/images/cta.jpg')] bg-no-repeat bg-center">
                <div className="absolute top-0 start-0 w-full h-full z-0 pointer-events-none overflow-hidden">
                    <iframe title="iframe" src="https://player.vimeo.com/video/502163294?background=1&autoplay=1&loop=1&byline=0&title=0" className="absolute top-1/2 start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-screen h-[56.25vw] min-h-screen min-w-[177.77vw]"></iframe>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                <div className="container">
                    <div className="flex justify-center">
                        <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
                            <Link to="#">
                                <img src={logo_dark} className="mx-auto h-7 block dark:hidden" alt="" />
                                <img src={logo_light} className="mx-auto h-7 dark:block hidden" alt="" />
                            </Link>
                            <h5 className="my-6 text-xl font-semibold">Reset Your Password</h5>
                            <div className="grid grid-cols-1">
                                <p className="text-slate-400 mb-6">Please enter your email address. You will receive a link to create a new password via email.</p>
                                <form className="text-start">
                                    <div className="grid grid-cols-1">
                                        <div className="mb-4">
                                            <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
                                            <input id="LoginEmail" type="email" className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-3" placeholder="name@example.com" />
                                        </div>

                                        <div className="mb-4">
                                            <input type="submit" className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full w-full" value="Send" />
                                        </div>

                                        <div className="text-center">
                                            <span className="text-slate-400 me-2">Remember your password ? </span><Link to="/login" className="text-black dark:text-white font-bold">Sign in</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Switcher />
        </>
    )
}