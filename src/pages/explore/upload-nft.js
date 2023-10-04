import React, { useEffect, useState } from 'react'
import image from '../../assets/images/avatar/1.jpg';
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Switcher from '../../components/switcher';
import { Link } from 'react-router-dom';
import {AiOutlineDashboard, PiBrowsers, AiOutlineSetting, IoMdLogOut} from "../../assets/icons/vander"
import { create } from 'ipfs-http-client'
import { Buffer } from "buffer";
import { CreateCollection, mintNFT } from '../../Blockchain.Services'

import {        
    useGlobalState,
    setGlobalState,
    setLoadingMsg,
    setAlert,
  } from '../../store/indexStore'
  
const auth =
  'Basic ' +
  Buffer.from(
    '2G2YNSsX4rLnoL3SVmM3qpy8SdU' + ':' + '4f7135fa4e9d6524ddc317ad7fbebd12',
).toString('base64')

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  },
})

export default function UploadNft() {
    const [collectionTitle, setCollectionTitle] = useState('');
    const [collectionDescription, setCollectionDescription] = useState('');
    const [collectionAditionalDescription, setCollectionAditionalDescription] = useState('');
    const [collection] = useGlobalState('collection')
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = async (e) => {
        const maxInvestors = parseFloat(document.getElementById("maxInvestors").value);
        const maxInvest = parseFloat(document.getElementById("maxInvest").value);
        const maxDrop = parseFloat(document.getElementById("maxDrop").value);
        const leverage = parseFloat(document.getElementById("leverage").value);
        const assets = (document.getElementById("assets").value);
        
        e.preventDefault()
        const isPhProduct = isChecked?1:0;
       
        const fileUploader = document.querySelector('#input-file');
        const getFile = fileUploader.files
        
        if (getFile.length == 0) return
        if (!maxInvestors || !maxInvest || !maxDrop || !leverage || !assets) return
   
        try {
          const created = await client.add(getFile[0])
          const metadataURI = `https://testquim.infura-ipfs.io/ipfs/${created.path}`
            
          const nft = { collectionTitle, collectionDescription, maxInvestors, metadataURI, maxInvest, maxDrop, leverage, assets}
          
          console.log(collection)

          await mintNFT(collection.idCollection,nft)
    
          window.location.reload()
        } catch (error) {
          console.log('Error uploading file: ', error)
          setAlert('Minting failed...', 'red')
        }
    }

    
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);


    const handleChange = () => {
        const fileUploader = document.querySelector('#input-file');
        const getFile = fileUploader.files
        if (getFile.length !== 0) {
            const uploadedFile = getFile[0];
            readFile(uploadedFile);
        }
    }
    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };
    const readFile = (uploadedFile) => {
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const parent = document.querySelector('.preview-box');
                parent.innerHTML = `<img class="preview-content" src=${reader.result} />`;
            };

            reader.readAsDataURL(uploadedFile);
        }
    };
    return (
        <>
            <Navbar />

            <section className="relative table w-full py-36 bg-bottom bg-no-repeat">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">Create a new {collection.name} strategy</h3>
                    </div>
                </div>

                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/index">Y</Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white" aria-current="page">Create Strategy</li>
                    </ul>
                </div>
            </section>
            <div className="relative">
                <div className="shape absolute start-0 end-0 sm:-bottom-px -bottom-[2px] overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg className="w-full h-auto" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            
            <section className="relative md:py-24 py-16">
                <div className="container">
                    <div className="grid md:grid-cols-12 gap-[30px]">
                        <div className="lg:col-span-3 md:col-span-4">
                            <div className="overflow-hidden rounded-md shadow dark:shadow-gray-800 sticky top-20">
                                
                            </div>
                        </div>

                        <div className="lg:col-span-9 md:col-span-8">
                            <div className="lg:flex p-6 bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800">
                               

                                <div className="lg:w-2/3 md:w-full mt-8 lg:mt-0 lg:ms-6">
                                    <form>
                                        <div className="grid grid-cols-12 gap-6">

                                            <div className="col-span-12">
                                                <p className="font-semibold mb-6">Upload a new {collection.name} strategy.</p>
                                                <div className="preview-box flex justify-center rounded-md shadow dark:shadow-gray-800 overflow-hidden bg-gray-50 dark:bg-slate-800 text-slate-400 p-2 text-center small">Supports JPG, PNG and MP4 videos. Max file size : 10MB.</div>
                                                <input type="file" id="input-file" name="input-file" accept="image/*" hidden onChange={handleChange} />
                                                <label className="btn-upload btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full w-full mt-6 cursor-pointer" htmlFor="input-file">Upload Image</label>
                                            </div>


                                            <div className="col-span-12">
                                                <label className="font-semibold">Name <span className="text-red-600">*</span></label>
                                                <input name="collectionTitle" 
                                                    id="collectionTitle" 
                                                    type="text" 
                                                    className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-2" 
                                                    placeholder="Title :"   
                                                    onChange={(event) => {
                                                        setCollectionTitle(event.target.value);
                                                    }}
                                                    />
                                            </div>

                                            <div className="col-span-12">
                                                <label className="font-semibold"> Description : </label>
                                                <textarea 
                                                    name="collectionDescription" 
                                                    id="collectionDescription" 
                                                    onChange={(event) => {
                                                        setCollectionDescription(event.target.value);
                                                    }} 
                                                    className="form-input w-full text-[15px] py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-2xl outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-2" 
                                                    placeholder="Description :">

                                                </textarea>
                                            </div>

                                            <div className="col-span-12">

                                                <div className="grid grid-cols-1">
                                                    <div className="mb-4">
                                                        <label className="font-semibold" >Max investors number:</label>
                                                            <input name="etherium" id="maxInvestors" type="number"
                                                            step={1}
                                                            min={5}
                                                            className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full o
                                                            utline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 
                                                            focus:ring-0 mt-3" 
                                                            placeholder="5 @I" 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">

                                                <div className="grid grid-cols-2">
                                                    <div className="mb-4">
                                                        <label className="font-semibold" >Max. investment (in USDC):</label>
                                                            <input name="etherium" id="maxInvest" type="number"
                                                            step={1}
                                                            min={1000}
                                                            className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full o
                                                            utline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 
                                                            focus:ring-0 mt-3" 
                                                            placeholder="10000 USDC" 
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

                                            <div className="col-span-12">

                                                <div className="grid grid-cols-2">
                                                    <div className="mb-4">
                                                        <label className="font-semibold" >Leverage:</label>
                                                            <input name="etherium" id="leverage" type="number"
                                                            step={1}
                                                            min={1}
                                                            className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full o
                                                            utline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 
                                                            focus:ring-0 mt-3" 
                                                            placeholder="100x" 
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="font-semibold -webkit-inner-spin-button" >Assets to trade:</label>
                                                            
                                                            <select id="assets" class="minimal form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full o
                                                            utline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 
                                                            focus:ring-0 mt-3">
                                                                <option value="ETH/USDC">ETH/USDC</option>
                                                                <option value="BTC/USDC">BTC/USDC</option>
                                                                <option value="TSLA/USDC">TSLA/USDC</option>
                                                                
                                                            </select>
                                                    </div>                                                   
                                                </div>
                                            </div>                                            
                                                
                                               
                                            <div className="col-span-12">
                                                <button 
                                                    type="button" 
                                                    onClick={handleSubmit} 
                                                    className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full">Create NFT
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Switcher />
        </>
    )
}
