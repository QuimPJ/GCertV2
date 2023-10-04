import React, { useEffect } from 'react'
import Navbar from '../../components/navbar'
import CollectionBuilds from '../../components/collection-builds'
import Footer from '../../components/footer';
import Switcher from '../../components/switcher';
import { Link } from 'react-router-dom';
import { getAllCollections, isWallectConnected,getAllNFTs } from '../../Blockchain.Services'
import {        
    useGlobalState,
    setGlobalState,
    setLoadingMsg,
    setAlert,
  } from '../../store/indexStore'
  
export default function CollectionsBuildings() {
 
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);
    return (
        <>
            <Navbar />
            <section className="relative table w-full py-36 bg-bottom bg-no-repeat">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="md:text-2xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">Discover a cutting-edge trading 
                        platform that leverages blockchain technology to automate trading strategies. Take advantage of seamless and secure trading as you explore 
                        the world of crypto assets. Join us in revolutionizing the way you trade on the blockchain.</h3>
                    </div>
                </div>

            </section>
            

            <section className="relative md:py-24 py-16">
                <CollectionBuilds pagination={true}/>
            </section>
            <Footer />
          
          <Switcher />
        </>
    )
}
