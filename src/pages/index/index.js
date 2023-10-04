import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Creator from '../../components/creator';
import Collections from '../../components/collections';
import DiscoverItems from '../../components/discover-items';
import QA from '../../components/qa';
import GetTouch from '../../components/get-touch';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import Switcher from '../../components/switcher';
import TradingViewWidget from 'react-tradingview-widget';
import {        
    useGlobalState,
  } from '../../store/indexStore'

//pm i --save-dev @types/react-tradingview-widget
export default function Index() {
    const [owner] = useGlobalState('connectedAccount')


    //ADD read collections!
    
    useEffect(() => {
        document.documentElement.classList.add('dark');
        document.body.classList.add('font-urbanist', 'text-base', 'text-black', 'dark:text-white', 'dark:bg-slate-900');
       // getAllCollections(); 
    }, []);

    return (
        <>
            <span className="fixed blur-[200px] w-[600px] h-[600px] rounded-full top-1/2 start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 bg-gradient-to-tl from-red-600/20 to-violet-600/20 dark:from-red-600/40 dark:to-violet-600/40"></span>
            <Navbar />
            
            <section className="relative overflow-hidden mt-24">
                    <div className="container">
                        <div className="grid grid-cols-1 justify-center text-center mt-10">
                            <div className="relative">
                                <div className="relative mb-5">
                                    <h1 className="font-bold lg:leading-snug leading-snug text-3xl lg:text-2xl"><span className="bg-gradient-to-l from-red-600 to-violet-600 text-transparent bg-clip-text"> Discover the most modern and advanced trading platform </span></h1>
                                </div>                           
                            </div>
                        </div>
                    
                    <div className="md:flex justify-between items-center mt-12">
                        <div>
                            <h5 className="text-slate-400">Hey {owner.toString().toLowerCase()}!</h5>
                        </div>
                        <span className="text-slate-400">My balance: <span className="font-semibold text-emerald-600">$ 45,578.032</span></span>
                        
                    </div>
                
                    <div className="grid lg:grid-cols-1 gap-12 mt-6">
                        <div className="xl:col-span-8 lg:col-span-1">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="relative overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900 p-2">
                                    <div id="tradingview_123"></div>
                                        <TradingViewWidget
                                        theme="Dark"
                                        symbol="ETHUSDT"
                                        height={450}
                                        width={`100%`}
                                        />
                                </div>
                            </div>
                        </div>
                    </div>

                    
                            
                    <div className="relative animate-[spin_30s_linear_infinite] -z-1">
                        <span className="after:absolute after:start-0 after:bottom-1/2 after:translate-y-1/2 after:h-2 after:w-8 after:rounded-md after:bg-violet-600/20 relative after:z-10"></span>
                        <span className="after:absolute after:start-0 after:bottom-1/2 after:translate-y-1/2 after:rotate-90 after:h-2 after:w-8 after:rounded-md after:bg-violet-600/20 relative after:z-10"></span>
                    </div>
                </div>
                <Collections/>
            </section>
            <Footer />
            <Switcher />
        </>
    )
}
