import React from 'react'
import { Link } from 'react-router-dom';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "../assets/icons/vander"
import { getAllCollections, isWallectConnected,getAllNFTs } from '../Blockchain.Services'
import {        
    useGlobalState,
    setGlobalState,
    setLoadingMsg,
    setAlert,
  } from '../store/indexStore'
  

export default function CollectionBuilds(props) {
    const { title, description, pagination} = props;
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
            <div className={`container ${title !== undefined ? 'md:mt-24 mt-16' : ''}`}>
               
                <div className="grid grid-cols-1 text-center">
                    <h3 className="mb-4 md:text-3xl text-2xl md:leading-snug leading-snug font-semibold">{title}</h3>
                    <p className="text-slate-400 max-w-xl mx-auto">{description}</p>
                </div>
                  

                    {
                        collections.slice(0,8).map((item, index) => (
                            <div key={index} className="group relative overflow-hidden gap-40 bg-white dark:bg-slate-900 rounded-lg p-3 shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-800 hover:scale-105 ease-in-out duration-500">
                                <div className="grid grid-cols-2 gap-5 gap-x-5 gap-y-5">
                                <span className="text-slate-400 block text-[16px] mt-1">Name: {item.name.toString()}</span>


                                    <div className="lg:col-span-5"></div>
                                
                                        <img src={item.collectionURI} className="object-cover h-48 w-96 rounded-lg" alt="" />

                                        <div className="relative p-4 -mt-14">
                                            <div className="relative inline-block">
                                                <img src={item.avatar} className="h-16 rounded-md shadow-md dark:shadow-gray-800" alt="" />
                                                <i className="mdi mdi-check-decagram text-emerald-600 text-2xl absolute -bottom-3 -end-2"></i>
                                            </div>

                                            <div className="mt-3">
                                                <Link to="/explore-one" onClick={() => handleSubmit(item)} className="font-semibold block text-[18px] hover:text-violet-600">{item.name}</Link>
                                                <span className="text-slate-400 text-sm mt-1 "><span className="italic">by {item.owner}</span></span>
                                                <span className="text-slate-400 block text-[16px] mt-1">Build description: {item.description.toString()}</span>
                                            </div>
                                        </div>
                                </div>    
                            </div>
                        ))
                    }
                
            </div>

        </>
    )
}
