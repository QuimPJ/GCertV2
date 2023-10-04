
import React, { useEffect, useState } from 'react'
import { getAllCollections, isWallectConnected,getAllNFTs } from '../Blockchain.Services'
import {        
    useGlobalState,
    setGlobalState,
    setLoadingMsg,
    setAlert,
  } from '../store/indexStore'
  
import TinySlider from "tiny-slider-react";
import '../../node_modules/tiny-slider/dist/tiny-slider.css';
import { Link } from 'react-router-dom';
import { data } from '../data/data';
import {MdOutlineArrowForward} from "../assets/icons/vander"

const settings = {
    lazyload: true,
    controls: true,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
    nav: false,
    speed: 400,
    gutter: 0,
    responsive: {
        1025: {
            items: 4
        },

        992: {
            items: 3
        },

        767: {
            items: 2
        },
        320: {
            items: 1
        },
    },
}

export default function Collections() {
    const [collections] = useGlobalState('collections')
    console.log("collections");
    console.log(collections);
    
    const handleSubmit = async (item) => {
        
        try {
            setGlobalState('collection', item)

            await getAllNFTs(item.idCollection)
        } catch (error) {
            console.log('Error loading NFTs: ', error)
            setAlert('Error loading NFTs...', 'red')
         }
    }
    

    return (
        <>
            <div className="container md:mt-36 mt-24">
                <div className="md:flex justify-between items-center">
                    <div className="md:w-10/12 md:text-start text-center">
                        <h3 className="md:text-[30px] text-[26px] font-semibold">Types of strategies</h3>
                    </div>
                    <div className="md:w-2/12 text-end md:block hidden">
                        <Link to="/collections" className="btn btn-link text-[16px] font-medium hover:text-violet-600 after:bg-violet-600 duration-500 ease-in-out inline-flex items-center">See More <MdOutlineArrowForward className="text-sm ms-1"/></Link>
                    </div>
                </div>

                <div className="grid relative grid-cols-1 mt-10">
                    <div className="tiny-four-icon-item">
                        <TinySlider settings={settings}>
                            {
                                collections.map((item, index) => (
                                    <div className="tiny-slide" key={index}>
                                        <div className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-lg p-3 shadow dark:shadow-gray-800 ease-in-out duration-500 m-2">
                                            <img
                                                className="rounded-lg" alt=""
                                                src={item.collectionURI}
                                            />
                                            <div className="relative p-4 -mt-14">
                                                {item.isCert ? (
                                                    <div className="relative inline-block">
                                                        <img src={item.avatar} className="h-16 rounded-md shadow-md dark:shadow-gray-800" alt="" />
                                                        <i className="mdi mdi-check-decagram text-emerald-600 text-2xl absolute -bottom-3 -end-2"></i>
                                                    </div>
                                                ) :
                                                    <div className="relative inline-block">
                                                        <img src={item.avatar} className="h-16 rounded-md shadow-md dark:shadow-gray-800" alt="" />
                                                        <i className="mdi mdi-alert-decagram text-red-600 text-2xl absolute -bottom-3 -end-2"></i>
                                                    </div>
                                                }
                                                <div className="mt-3">
                                                    <Link to="/explore-one" onClick={() => handleSubmit(item)} className="font-semibold block text-[18px] hover:text-violet-600">{item.name}</Link>
                                                    <span className="text-slate-400 mt-1 text-sm"><span className="italic">id {item.idCollection.toString()}</span></span>
                                                    <span className="text-slate-400 block text-[16px] mt-1">{item.nNft.toString()}/{item.maxNfts.toString()}  # strategies</span>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </TinySlider>

                    </div>
                </div>

                <div className="grid grid-cols-1 mt-6 md:hidden">
                    <div className="text-center">
                        <Link to="/collections" className="btn btn-link text-[16px] font-medium hover:text-violet-600 after:bg-violet-600 duration-500 ease-in-out inline-flex items-center">See More <MdOutlineArrowForward className="text-sm ms-1"/></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
