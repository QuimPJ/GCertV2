import React from 'react'
import { Link } from 'react-router-dom';
import { data } from '../data/data';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineArrowForward} from "../assets/icons/vander"
import {        
    useGlobalState,
    setGlobalState,
  } from '../store/indexStore'


export default function DiscoverItems({title,pagination, allData}) {
    const [nfts] = useGlobalState('nfts')
    const [collection] = useGlobalState('collection')
    const [owner] = useGlobalState('connectedAccount')
    const [mpOwner] = useGlobalState('owner')
    const [list] = useGlobalState('list')
    
    console.log("mpOwner")
    console.log(mpOwner)
    console.log("owner")
    console.log(owner)
    const handleSubmit = async (nft, list) => {
        setGlobalState('nft', nft)
        setGlobalState('nList', list)
    }

    return (
        <>
            <div className="container">
                
                
                <div className="grid grid-cols-1 text-center">
                    <h3 className="md:text-[30px] text-[26px] font-semibold">{title}</h3>
                </div>
                {allData ? <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-10 gap-[30px]">

                                  
                    <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                        <Link to={`/upload-nft`} className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white">Create a new strategy</Link>
                    </div>

                    {nfts.map((item, index) => (
                        <div key={index} className="group relative overflow-hidden p-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:shadow-md dark:shadow-md hover:dark:shadow-gray-700 transition-all duration-500 hover:-mt-2 h-fit">
                            <div className="relative overflow-hidden">
                                    <div className="relative overflow-hidden rounded-lg">
                                        <img
                                            className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt=""
                                            src={item.tokenURI}
                                        />
                                    </div>
                                
                                <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                    <Link to={`/item-detail`} 
                                    onClick={() => handleSubmit(item, list[index])} 
                                    className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i 
                                    className="mdi mdi-lightning-bolt"></i> {(item.owner.toString().toLowerCase() === owner.toString().toLowerCase()) ? "Edit item" : "Show details"}</Link>
                                </div>

                                <div className="absolute top-2 end-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <Link to="#" className="btn btn-icon btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-plus"></i></Link>
                                </div>
                            </div>

                            <div className="mt-3">
                                <div className="flex items-center">
                                    <img src={item.tokenURI} className="rounded-full h-8 w-8" alt="" />
                                    <Link to={`/creator-profile/${item.tokenId}`} className="ms-2 text-[15px] font-medium text-slate-400 hover:text-violet-600">{item.name}</Link>
                                
                                </div>

                                <div className="my-3">
                                    <span className="text-[16px] font-semibold block">Id {(item.tokenId).toString()}</span>

                                </div>

                                <div className="flex justify-between p-2 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700">
                                    <div>
                                        <span className="text-[16px] font-medium text-slate-400 block">Asset</span>
                                        <span className="text-[16px] font-semibold block">{item.assets}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between p-2 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700">
                                    <div>
                                        <span className="text-[16px] font-medium text-slate-400 block">Total invested</span>
                                        <span className="text-[16px] font-semibold block"> 15000</span>
                                    </div>
                                </div>
                                <div className="flex justify-between p-2 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700">
                                    <div>
                                        <span className="text-[16px] font-medium text-slate-400 block">Max dropdown permited</span>
                                        <span className="text-[16px] font-semibold block">{item.maxDropDown.toString()}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between p-2 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700">
                                    <div>
                                        <span className="text-[16px] font-medium text-slate-400 block">Total investors</span>
                                        <span className="text-[16px] font-semibold block"> {19}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> :
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-10 gap-[30px]">
                    
                    {nfts.map((item, index) => (
                        <div key={index} className="group relative overflow-hidden p-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:shadow-md dark:shadow-md hover:dark:shadow-gray-700 transition-all duration-500 hover:-mt-2 h-fit">
                            <div className="relative overflow-hidden">
                                <div className="relative overflow-hidden rounded-lg">
                                    <img
                                        className="rounded-lg shadow-md dark:shadow-gray-700 group-hover:scale-110 transition-all duration-500" alt=""
                                        src={item.tokenURI}
                                    />
                                    
                                </div>

                                <div className="absolute -bottom-20 group-hover:bottom-1/2 group-hover:translate-y-1/2 start-0 end-0 mx-auto text-center transition-all duration-500">
                                    <Link to={`/item-detail`} 
                                    onClick={() => handleSubmit(item, list[index])} 
                                    className="btn btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i 
                                    className="mdi mdi-lightning-bolt"></i> {(item.owner.toString().toLowerCase() === owner.toString().toLowerCase()) ? "Edit item" : "Show details"}</Link>
                                </div>

                                <div className="absolute top-2 end-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <Link to="#" className="btn btn-icon btn-sm rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="mdi mdi-plus"></i></Link>
                                </div>
                            </div>

                            <div className="mt-3">
                                <div className="flex items-center">
                                    <img src={item.tokenURI} className="rounded-full h-8 w-8" alt="" />
                                    <Link to={`/creator-profile/${item.tokenId}`} className="ms-2 text-[15px] font-medium text-slate-400 hover:text-violet-600">{item.name}</Link>
                                
                                </div>

                                <div className="my-3">
                                <span className="text-[16px] font-semibold block">Id item {(item.tokenId).toString()}</span>
                                <span className="text-[16px] font-semibold block">Collection name: {(collection.name).toString()}</span>

                                </div>

                                <div className="flex justify-between p-2 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700">
                                    <div>
                                        <span className="text-[16px] font-medium text-slate-400 block">Price</span>
                                        <span className="text-[16px] font-semibold block"><i className="mdi mdi-ethereum"></i> {window.web3.utils.fromWei(item.price.toString(), 'ether')}</span>
                                    </div>

                                    
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
                }

                {
                    pagination ? (
                        <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                            <div className="md:col-span-12 text-center">
                                <nav>
                                    <ul className="inline-flex items-center -space-x-px">
                                        <li>
                                            <Link to="/#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">
                                                <MdKeyboardArrowLeft className="text-[20px]"/>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">1</Link>
                                        </li>
                                        <li>
                                            <Link to="/#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">2</Link>
                                        </li>
                                        <li>
                                            <Link to="/#" aria-current="page" className="z-10 w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-white bg-violet-600 shadow-sm dark:shadow-gray-700">3</Link>
                                        </li>
                                        <li>
                                            <Link to="/#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">4</Link>
                                        </li>
                                        <li>
                                            <Link to="/#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-sm dark:shadow-gray-700 hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">
                                                <MdKeyboardArrowRight className="text-[20px]"/>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                    ) : ('')
                }

                {
                    title !== undefined ? (
                        <div className="grid grid-cols-1 mt-6">
                            <div className="text-center">
                                <Link to="/explore-one" className="btn btn-link text-[16px] font-medium hover:text-violet-600 after:bg-violet-600 duration-500 ease-in-out inline-flex items-center">Explore More <MdOutlineArrowForward className="ms-1 text-sm"/></Link>
                            </div>
                        </div>
                    ) : ('')
                }

            </div>
        </>
    )
}
