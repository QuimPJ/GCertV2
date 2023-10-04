import React, { useEffect, useState } from 'react'
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

import {
    XYPlot,
    Hint,
    LineSeries,
    FlexibleXYPlot,
    VerticalBarSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    AreaSeries
  } from "react-vis";

import { Link, useParams } from 'react-router-dom';
import image from '../../assets/images/items/3.gif';
import image1 from '../../assets/images/avatar/1.jpg';
import image3 from '../../assets/images/items/2.gif';
import image4 from '../../assets/images/items/1.jpg';
import image5 from '../../assets/images/items/2.jpg';
import image6 from '../../assets/images/items/1.gif';
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Switcher from '../../components/switcher';

import Moralis  from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';

import { data } from '../../data/data';
import {IoMdClose,BsExclamationOctagon} from "../../assets/icons/vander"
import {        
    useGlobalState,
    setGlobalState,
    setLoadingMsg,
    setAlert,
  } from '../../store/indexStore'

  import { unListNFT, listNFT, buyNFTBL } from '../../Blockchain.Services'

  import money_icon from '../../assets/images/Investment.jpg';
  import investor_icon from '../../assets/images/investor.jpg';
  import leverage_icon from '../../assets/images/leverage.jpg';
  import erc20_icon from '../../assets/images/erc20.png';

export default function ItemDetail() {

    const params = useParams();
    const id = params.id
    const creater = data.find((creatorr) => creatorr.id === parseInt (id));
    const [nft] = useGlobalState('nft')
    const [nList] = useGlobalState('nList')
    
    const [collection] = useGlobalState('collection')
    const [connectedAccount] = useGlobalState('connectedAccount')
    const price = 0
    const priceFee = 0
    const totalPrice = 0
    console.log("nft")
    console.log(nft)
    console.log(collection)
    console.log(nList)
    const [activeIndex, setIndex] = useState(0);
    const [placeBid , setPlaceBid] = useState(false)
    const [buyNow, setBuyNow] =  useState(false)
    const [listItem, setListItemNow] =  useState(false)
    const [isChecked, setIsChecked] = useState(false);

    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState("");
    const [chainValue, setChainValue] = useState("");
    let address;
    
    const valueOptions = [
        { value: "eth", label: "Ethereum" },
        { value: "goerli", label: "Goerli" },
    ];

    const changeHandlerValue = (chainValue) => {
        setChainValue(chainValue);
    };

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };


    const handleSubmit = async () => {
        
      };

    const handleListItem = async () => {
        const cost = parseFloat(document.getElementById("number").value);

        console.log("List item")
        console.log(cost)

        console.log("List item")
        console.log(cost)
        
        try {
          
            const idCollection = parseInt(collection.idCollection);
            const nftContracts= collection.nftContracts
            const tokenId = parseInt(nft.tokenId);
            const nftList = { idCollection, tokenId, cost , nftContracts}
            if (!nList)await listNFT(nftList)
            if (nList)await unListNFT(nftList)
            window.location.reload()

        } catch (error) {
          console.log('Error uploading file: ', error)
          setAlert('Minting failed...', 'red')
        }

    }

    
    const handleBuyItem = async () => {
               
        
        try {
        
            const cost = totalPrice;  
            const collectionId = parseInt(collection.idCollection);
            const id = parseInt(nft.tokenId);

            const nftList = { collectionId ,id, cost  }
       
            await buyNFTBL(nftList)
            window.location.reload()

        } catch (error) {
          console.log('Error uploading file: ', error)
          setAlert('Minting failed...', 'red')
        }

    }
/*
address = document.querySelector("#contractAddress").value;
        const chain = EvmChain.ETHEREUM;
    
        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        });
      
        const response = await Moralis.EvmApi.token.getTokenPrice({
          address,
          chain,
        });
    
        setResult(`$ ${response.toJSON().usdPrice}`);
        setShowResult(true);
        setChainValue("");
        document.querySelector("#contractAddress").value = "";
*/
    const handlePrice = async () => {

          const address = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";
        
          const chain = EvmChain.ETHEREUM;
        
          const response = await Moralis.EvmApi.token.getTokenPrice({
            address,
            chain,
          });
        
          console.log(response.toJSON());
    }

    useEffect( () => {
       
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <>
            <Navbar />
            <section className="relative pt-28 md:pb-24 pb-16">
                <div className="container">
                    <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-[30px]">
                        <div className="lg:col-span-5">
                            <img src={nft?.tokenURI ? nft?.tokenURI : image} className="rounded-md shadow dark:shadow-gray-700" alt="" />

                            <div className="bg-gray-50 dark:bg-slate-800 rounded-md shadow dark:shadow-gray-800 mt-[30px] p-6">
                                <div>
                                    <span className="font-medium text-slate-400 block mb-1">Contract Address</span>
                                    <Link to="#" className="text-sm text-violet-600 underline block">{collection?.nftContracts}</Link>
                                </div>

                                <div className="mt-4">
                                    <span className="font-medium text-slate-400 block mb-1">Token ID</span>
                                    <span className="font-medium block">{nft?.tokenId.toString()}</span>
                                </div>

                                <div className="mt-4">
                                    <span className="font-medium text-slate-400 block mb-1">Blockchain</span>
                                    <span className="font-medium block">ETH</span>
                                </div>

                                <div className="mt-4">
                                    <span className="font-medium text-slate-400 block mb-1">Mp Owner</span>
                                    <span className="text-sm block">{nft?.owner.toString()}</span>
                                </div>
                            </div>

                            
                        </div>

                        <div className="lg:col-span-7 lg:ms-8">
                            <h5 className="md:text-2xl text-xl font-semibold">{nft?.name ? nft?.name  :"Probably A Label #3277"}</h5>

                            <span className="font-medium text-slate-400 block mt-2">Strategy type: <Link to="/creator-profile" className="text-violet-600">{collection?.name ? collection?.name : "@FunnyGuy"}</Link></span>

                            <p className="text-slate-400 mt-4">{nft?.description}</p>

                            <span className="text-slate-400 text-[16px] block mt-8">@LP investor</span>

                            <div className="col-span-12">
                                
                                <div className="grid grid-cols-2 gap-[30px]">
                                    <div className="md:flex p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700 mt-6">
                                        <div className="relative inline-block">
                                            <img src={money_icon} className="h-16 rounded-md" alt="" />
                                        </div>

                                        <div className="ms-3">
                                            <span className="text-slate-400 text-[16px] block mt-1">Total invested</span>
                                            <Link to="/creator-profile" className="text-sm font-semibold block hover:text-violet-600">19000 USDC</Link>
                                        </div>
                                        
                                    </div>


                                    <div className="md:flex p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700 mt-6">
                                        <div className="relative inline-block">
                                            <img src={investor_icon} className="h-16 rounded-md" alt="" />
                                        </div>
                                        <div className="ms-3">
                                            <span className="text-slate-400 text-[16px] block mt-1"># investors</span>
                                            <Link to="/creator-profile" className="text-sm font-semibold block hover:text-violet-600">13</Link>
                                        </div>
                                        
                                    </div>                                   
                                </div>
                            </div>

                            <span className="text-slate-400 text-[16px] block mt-8">@I investor</span>

                            <div className="col-span-12">
                                
                                <div className="grid grid-cols-2 gap-[30px]">
                                    <div className="md:flex p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700 mt-6">
                                        <div className="relative inline-block">
                                            <img src={money_icon} className="h-16 rounded-md" alt="" />
                                        </div>

                                        <div className="ms-3">
                                            <span className="text-slate-400 text-[16px] block mt-1">Total invested</span>
                                            <Link to="/creator-profile" className="text-sm font-semibold block hover:text-violet-600">150000 USDC</Link>
                                        </div>
                                        
                                    </div>


                                    <div className="md:flex p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700 mt-6">
                                        <div className="relative inline-block">
                                            <img src={investor_icon} className="h-16 rounded-md" alt="" />
                                        </div>
                                        <div className="ms-3">
                                            <span className="text-slate-400 text-[16px] block mt-1"># investors</span>
                                            <Link to="/creator-profile" className="text-sm font-semibold block hover:text-violet-600">3</Link>
                                        </div>
                                        
                                    </div>                                   
                                </div>
                            </div>

                            <span className="text-slate-400 text-[16px] block mt-8">Detalles estrategia</span>

                                <div className="grid grid-cols-3 gap-[30px]">

                                    <div className="md:flex p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700 mt-6">
                                        <div className="relative inline-block">
                                            <img src={leverage_icon} className="h-8 rounded-md" alt="" />
                                        </div>

                                        <div className="ms-3">
                                            <span className="text-slate-400 text-[12px] block mt-1">Leverage</span>
                                            <Link to="/creator-profile" className="text-sm font-semibold block hover:text-violet-600">x{nft?.leverage.toString()}</Link>
                                        </div>
                                        
                                    </div>

                                    <div className="md:flex p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700 mt-6">
                                        <div className="relative inline-block">
                                            <img src={erc20_icon} className="h-8 rounded-md" alt="" />
                                        </div>
                                        <div className="ms-3">
                                            <span className="text-slate-400 text-[12px] block mt-1">Asset</span>
                                            <Link to="/creator-profile" className="text-sm font-semibold block hover:text-violet-600">{nft?.assets}</Link>
                                        </div>
                                        
                                    </div>  

                                    <div className="md:flex p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700 mt-6">
                                        <div className="relative inline-block">
                                            <img src={investor_icon} className="h-8 rounded-md" alt="" />
                                        </div>
                                        <div className="ms-3">
                                            <span className="text-slate-400 text-[12px] block mt-1"># investors</span>
                                            <Link to="/creator-profile" className="text-sm font-semibold block hover:text-violet-600">16</Link>
                                        </div>
                                        
                                    </div>                                      
                                </div>
                                <div className="md:flex p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700 mt-6">
                                    <div className="relative inline-block">
                                        <img src={collection?.collectionURI ? collection?.collectionURI : image1} className="h-16 rounded-md" alt="" />
                                        <i className="mdi mdi-check-decagram text-emerald-600 text-lg absolute -top-2 -end-2"></i>
                                    </div>

                                    <div className="ms-3">
                                        <span className="text-slate-400 text-[16px] block mt-1">NFT owner</span>
                                        <Link to="/creator-profile" className="text-sm font-semibold block hover:text-violet-600">{nft?.owner}</Link>
                                    </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="grid grid-cols-2 gap-[30px]">
                        
                        <div className="md:flex p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700 mt-6">

                            <div className="grid grid-rows-3 gap-[30px]">
                                <span className="text-slate-400 text-[16px] block mt-1">Your participations</span>

                                <div className="grid grid-cols-2 gap-[32px]">
                                    <div className="md:flex p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700 mt-6">
                                        <div className="relative inline-block">
                                            <img src={money_icon} className="h-16 rounded-md" alt="" />
                                        </div>

                                        <div className="ms-3">
                                            <span className="text-slate-400 text-[16px] block mt-1">Your investment</span>
                                            <Link to="/creator-profile" className="text-sm font-semibold block hover:text-violet-600">8000 USDC</Link>
                                        </div>
                                        
                                    </div>


                                    <div className="md:flex p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700 mt-6">
                                        <div className="relative inline-block">
                                            <img src={investor_icon} className="h-16 rounded-md" alt="" />
                                        </div>
                                        <div className="ms-3">
                                            <span className="text-slate-400 text-[16px] block mt-1">Your performance</span>
                                            <Link to="/creator-profile" className="text-sm font-semibold block hover:text-violet-600">{nft?.investors.toString()}</Link>
                                        </div>
                                        
                                    </div>                                   
                                </div>

                                <button 
                                    type="button" 
                                    className="btn gap-[30px] h-10 content-end bg-violet-600 hover:bg-violet-700 
                                    border-violet-600 hover:border-violet-700 text-white rounded-full">Withdraw your Money
                                </button>
                            </div>
                        </div>

                        <div className="md:flex p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700 mt-6">
                            <div className="grid grid-rows-3 gap-[30px]">
                                <span className="text-slate-400 text-[16px] block mt-1">Invest</span>

                                <div className="grid grid-cols-2 gap-[30px]">
                                    <div className="col-span-12">

                                        <div className="grid grid-rows-2">
                                            <div className="mb-4">
                                                <label className="font-semibold" >Investment (in USDC):</label>
                                                    <input name="etherium" id="maxInvest" type="number"
                                                    step={1}
                                                    min={1000}
                                                    className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full o
                                                    utline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 
                                                    focus:ring-0 mt-3" 
                                                    placeholder="10000 USDC" 
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-[30px]">

                                                <div className="mb-4">
                                                    <label className="font-semibold" >Max number of operations:</label>
                                                        <input name="etherium" id="maxDrop" type="number"
                                                        step={1}
                                                        min={1}
                                                        max={1000}
                                                        className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full o
                                                        utline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 
                                                        focus:ring-0 mt-3" 
                                                        placeholder="100 op" 
                                                    />
                                                </div>
                                                
                                                <div className="mb-4">
                                                    <label className="font-semibold" >Max drop down (in %):</label>
                                                        <input name="etherium" id="maxDrop" type="float"
                                                        step={0.01}
                                                        min={1}
                                                        max={100}
                                                        className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full o
                                                        utline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 
                                                        focus:ring-0 mt-3" 
                                                        placeholder="10.25%" 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                                               
                                </div>
                                <button 
                                    type="button" 
                                    className="btn content-end bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full">Invest
                                </button>
                            </div>
                        </div>
                    </div>

                    {nft?.owner.toString().toLowerCase() === connectedAccount ? (

                        <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow dark:shadow-gray-700 mt-6 content-center">
                            <div className="grid grid-cols-2 gap-[30px]">


                                <div className="grid lg:grid-cols-1 gap-12 mt-6">
                                    <div className="xl:col-span-8 lg:col-span-1">
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="relative overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900 p-2">
                                            <AdvancedRealTimeChart
                                                    symbol={"ETHUSD"}
                                                    theme="dark"
                                                    width={500}
                                                    height={500}
                                                    details={false}
                                                    // hide_top_toolbar
                                                    // hide_side_toolbar
                                                    // eslint-disable-next-line react/style-prop-object
                                                    style="3"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="grid grid-rows-3 gap-[30px] content-center">
                                    <span className="text-slate-400 text-[16px] block mt-1">Trade with your strategy</span>

                                    <div className="grid grid-cols-2">
                                        <div className="col-span-12">

                                            <div className="grid grid-rows-2">
                                                <div className="mb-4">
                                                    <label className="font-semibold" >Asset units:</label>
                                                        <input name="etherium" id="maxInvest" type="float"
                                                        step={0.1}
                                                        min={0.01}
                                                        className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full o
                                                        utline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 
                                                        focus:ring-0 mt-3" 
                                                        placeholder= {nft?.assets}   
                                                    />
                                                </div>


                                                <div className="col-span-12">
                                                    <div className="mb-4">
                                                        <label className="inline-flex items-center gap-[30px]">
                                                            <input
                                                                type="checkbox"
                                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"                                                            checked={isChecked}
                                                                onChange={toggleCheckbox}
                                                            />
                                                            <span className="ml-2"> Long/Short</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                        
                                                <div className="mb-4">
                                                    <label className="font-semibold" >Leverage:</label>
                                                        <input name="etherium" id="maxDrop" type="number"
                                                        step={1}
                                                        min={1}
                                                        max={100}
                                                        className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full o
                                                        utline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 
                                                        focus:ring-0 mt-3" 
                                                        placeholder="x10" 
                                                    />
                                                </div>

                                            </div>
                                        </div>                                                               
                                    </div>

                                    <label className="font-semibold gap-[30px]" >Available Liquidity: 15000 USDC</label>

                                    <div className="grid grid-cols-2 gap-[30px]">
                                        <button 
                                            type="button" 
                                            onClick={()=> handlePrice()}
                                            className="btn content-end bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full">Buy
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn content-end bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full">Sell
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ) : null}
                        
                </div>
                








                <div className={`fixed z-50 overflow-hidden inset-0 m-auto justify-center items-center flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80 ${listItem ? "" : "hidden" }`}>
                <div className="relative w-full h-auto max-w-md p-4">
                    <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow dark:shadow-gray-800">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <h5 className="text-xl font-semibold">  {!nList ? 'List NFT' : 'Unlist NFT'}</h5>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg p-1.5 ms-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" >
                                <IoMdClose onClick={()=> setListItemNow(!listItem)}/>
                            </button>
                        </div>
                        <div className="p-6">
                            
                        {!nList ? (

                            <form className="text-start">
                                <div className="grid grid-cols-1">
                                    <div className="mb-4">
                                        <label className="font-semibold" >Your list Price:</label>
                                        <input name="etherium" id="number" type="number"
                                        step={0.01}
                                        min={0.01}
                                        className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-3" 
                                        placeholder="00.00 ETH" />
                                    </div>
                                </div>
                            </form>
                        ) : null}

                            <div className="pt-4 border-t dark:border-t-gray-800">
                                <div className="flex justify-between">
                                    <p className="font-semibold text-sm"> Last price:</p>
                                    <p className="text-sm text-violet-600 font-semibold"> {window.web3.utils.fromWei(price.toString(), 'ether')} ETH </p>
                                </div>
                                
                                
                            </div>

                            <div className="mt-4">  
                                <Link to="/index" data-modal-toggle="NftBid" onClick={() => handleListItem()}  className="btn rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white w-full">
                                    <i className="mdi mdi-gavel">   
                                    </i> {!nList ? 'List your item' : 'Unlist your item'} </Link>
                            </div>
                        </div>
                    </div>
                </div>
                </div>                   

                <div className={`fixed z-50 overflow-hidden inset-0 m-auto justify-center items-center flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80 ${placeBid ? "" : "hidden" }`}>
                <div className="relative w-full h-auto max-w-md p-4">
                    <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow dark:shadow-gray-800">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <h5 className="text-xl font-semibold">Place a Bid</h5>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg p-1.5 ms-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" >
                                <IoMdClose onClick={()=> setPlaceBid(!placeBid)}/>
                            </button>
                        </div>
                        <div className="p-6">
                            <form className="text-start">
                                <div className="grid grid-cols-1">
                                    <div className="mb-4">
                                        <label className="font-semibold" >Your Bid Price:</label>
                                        <input name="etherium" id="number" type="number" className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-3" placeholder="00.00 ETH" />
                                    </div>

                                    <div className="mb-4">
                                        <label className="font-semibold" >Enter Your QTY:</label>
                                        <input name="quantity" id="number2" type="number" className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-3" placeholder="0"/>
                                        <span className="text-slate-400 text-sm"><span className="text-slate-900 dark:text-white mt-1">Note:</span> Max. Qty 5</span>
                                    </div>
                                </div>
                            </form>

                            <div className="pt-4 border-t dark:border-t-gray-800">
                                <div className="flex justify-between">
                                    <p className="font-semibold text-sm"> You must bid at least:</p>
                                    <p className="text-sm text-violet-600 font-semibold"> 1.22 ETH </p>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <p className="font-semibold text-sm"> Service free:</p>
                                    <p className="text-sm text-violet-600 font-semibold"> 0.05 ETH </p>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <p className="font-semibold text-sm"> Total bid amount:</p>
                                    <p className="text-sm text-violet-600 font-semibold"> 1.27 ETH </p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Link to="#" data-modal-toggle="NftList" className="btn rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white w-full"><i className="mdi mdi-gavel"></i> Place a Bid</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div  className={`fixed z-50 overflow-hidden inset-0 m-auto justify-center items-center flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80 ${buyNow ? "" :"hidden"}`}>
                <div className="relative w-full h-auto max-w-md p-4">
                    <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow dark:shadow-gray-800">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <h5 className="text-xl font-semibold">Checkout</h5>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg p-1.5 ms-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" >
                                <IoMdClose  onClick={() => setBuyNow(!buyNow)}/>
                            </button>
                        </div>
                        <div className="p-6">
                            

                            <div className="pt-4 border-t dark:border-t-gray-800">
                                <div className="flex justify-between">
                                    <p className="font-semibold text-sm"> Nft:</p>
                                    <p className="text-sm text-violet-600 font-semibold"> {window.web3.utils.fromWei(price.toString(), 'ether')} ETH </p>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <p className="font-semibold text-sm"> Service free:</p>
                                    <p className="text-sm text-violet-600 font-semibold"> {window.web3.utils.fromWei(priceFee.toString(), 'ether')} ETH </p>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <p className="font-semibold text-sm"> Total bid amount:</p>
                                    <p className="text-sm text-violet-600 font-semibold"> {window.web3.utils.fromWei(totalPrice.toString(), 'ether')}ETH </p>
                                </div>
                            </div>

                            <div className="mt-4">  
                                <Link to="/index" data-modal-toggle="NftBid" onClick={() => handleBuyItem()}  className="btn rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white w-full">
                                <i className="mdi mdi-lightning-bolt"></i> Buy Now</Link>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </section>
            <Footer />
            <Switcher />
        </>
    )
}
