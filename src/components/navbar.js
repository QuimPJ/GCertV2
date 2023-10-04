import React, { useEffect, useState } from 'react'
import { getAllCollectionsAndNFts } from '../Blockchain.Services'
import { setGlobalState, getGlobalState, setAlert } from '../store/indexStore'

import logo_icon_28 from '../assets/images/logo-icon-28.png';
import logo_dark from '../assets/images/GKA-black.png';
import logo_white from '../assets/images/GKA-white.png';
import image from '../assets/images/client/05.jpg';
import { Link } from "react-router-dom";
import {LuSearch, PiWalletBold, AiOutlineCopy, AiOutlineUser, LuSettings, LiaSignOutAltSolid} from "../assets/icons/vander"
import Web3 from 'web3';
const { ethereum } = window
window.web3 = new Web3(ethereum)
window.web3 = new Web3(window.web3.currentProvider)


export default function Navbar() {
    const [isDropdown, openDropdown] = useState(true);
    const [isOpen, setMenu] = useState(true);   

    useEffect(() => {
        activateMenu();
    });
    
    const handleSubmit = async () => {
        
        try {
            await getAllCollectionsAndNFts();     
        } catch (error) {
            console.log('Error loading NFTs: ', error)
            setAlert('Error loading NFTs...', 'red')
        }
    }

    const handleLoasCollArte = async () => {
        
        try {
            await getAllCollectionsAndNFts();     
        } catch (error) {
            console.log('Error loading NFTs: ', error)
            setAlert('Error loading NFTs...', 'red')
        }
    }

    window.addEventListener("scroll", windowScroll);
    function windowScroll() {
        const navbar = document.getElementById("topnav");
        if (
            document.body.scrollTop >= 50 ||
            document.documentElement.scrollTop >= 50
        ) {
            if (navbar !== null) {
                navbar?.classList.add("nav-sticky");
            }
        } else {
            if (navbar !== null) {
                navbar?.classList.remove("nav-sticky");
            }
        }

        const mybutton = document.getElementById("back-to-top");
        if (mybutton != null) {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                mybutton.classList.add("flex");
                mybutton.classList.remove("hidden");
            } else {
                mybutton.classList.add("hidden");
                mybutton.classList.remove("flex");
            }
        }
    }

    const toggleMenu = () => {
        setMenu(!isOpen)
        if (document.getElementById("navigation")) {
            const anchorArray = Array.from(document.getElementById("navigation").getElementsByTagName("a"));
            anchorArray.forEach(element => {
                element.addEventListener('click', (elem) => {
                    const target = elem.target.getAttribute("href")
                    if (target !== "") {
                        if (elem.target.nextElementSibling) {
                            var submenu = elem.target.nextElementSibling.nextElementSibling;
                            submenu.classList.toggle('open');
                        }
                    }
                })
            });
        }
    }

    const getClosest = (elem, selector) => {

        // Element.matches() polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function (s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) { }
                    return i > -1;
                };
        }

        // Get the closest matching element
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector)) return elem;
        }
        return null;

    };
    const activateMenu = () => {
        var menuItems = document.getElementsByClassName("sub-menu-item");
        if (menuItems) {

            var matchingMenuItem = null;
            for (var idx = 0; idx < menuItems.length; idx++) {
                if (menuItems[idx].href === window.location.href) {
                    matchingMenuItem = menuItems[idx];
                }
            }

            if (matchingMenuItem) {
                matchingMenuItem.classList.add('active');


                var immediateParent = getClosest(matchingMenuItem, 'li');

                if (immediateParent) {
                    immediateParent.classList.add('active');
                }

                var parent = getClosest(immediateParent, '.child-menu-item');
                if (parent) {
                    parent.classList.add('active');
                }

                var parent = getClosest(parent || immediateParent, '.parent-menu-item');

                if (parent) {
                    parent.classList.add('active');

                    var parentMenuitem = parent.querySelector('.menu-item');
                    if (parentMenuitem) {
                        parentMenuitem.classList.add('active');
                    }

                    var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
                    if (parentOfParent) {
                        parentOfParent.classList.add('active');
                    }
                } else {
                    var parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
                    if (parentOfParent) {
                        parentOfParent.classList.add('active');
                    }
                }
            }
        }
    }

    const metamask = async () => {
        try {
            //Basic Actions Section
            const onboardButton = document.getElementById('connectWallet')
            //   metamask modal
            const modal = document.getElementById('modal-metamask')
            const closeModalBtn = document.getElementById('close-modal')
            //   wallet address
            const myPublicAddress = document.getElementById('myPublicAddress')
            const myAddressBalance = document.getElementById('myAddressBalance')
            const myAddressToken = document.getElementById('myAddressToken')
            const myConnectedAccount = document.getElementById('myConnectedAccount')

            //Created check function to see if the MetaMask extension is installed
            const isMetaMaskInstalled = () => {
                //Have to check the ethereum binding on the window object to see if it's installed
                const { ethereum } = window
                return Boolean(ethereum && ethereum.isMetaMask)
            }



            const onClickConnect = async () => {
                if (!isMetaMaskInstalled()) {
                    //meta mask not installed
                    modal.classList.add('show')
                    modal.style.display = 'block'
                    return
                }
                try {
                    // eslint-disable-next-line no-undef
                    await ethereum.request({ method: 'eth_requestAccounts' })
                    // eslint-disable-next-line no-undef
                    const accounts = await ethereum.request({ method: 'eth_accounts' })

                    setGlobalState('connectedAccount', accounts[0])

                    const web3 = new Web3(window.ethereum);

                    // eslint-disable-next-line no-undef

                    const accountAddress = accounts[0]; // La primera cuenta conectada

                    const balance = await web3.eth.getBalance(accountAddress);
                    const balanceEther = web3.utils.fromWei(balance, 'ether');

                    console.log("balance");
                    console.log(balanceEther);
                    console.log("accountAddress");
                    console.log(accountAddress);

                    console.log("accounts[0]");
                    console.log(accounts[0]);

                    
                    
                    myAddressBalance.innerHTML = parseFloat(balanceEther).toFixed(6)

                    myAddressToken.innerHTML = 'ETH'
                    myPublicAddress.innerHTML =
                        accounts[0].split('').slice(0, 6).join('') +
                        '...' +
                        accounts[0]
                            .split('')
                            .slice(accounts[0].length - 7, accounts[0].length)
                            .join('')

                            
                } catch (error) {
                    console.error(error)
                }
            }

            const closeModal = () => {
                modal.classList.remove('show')
                modal.style.display = 'none'
            }

            if (isMetaMaskInstalled()) {
                // eslint-disable-next-line no-undef
                const accounts = await ethereum.request({ method: 'eth_accounts' })
                if (!!accounts[0]) {
                    myPublicAddress.innerHTML =
                        accounts[0].split('').slice(0, 6).join('') +
                        '...' +
                        accounts[0]
                            .split('')
                            .slice(accounts[0].length - 7, accounts[0].length)
                            .join('')
                }
            }

            onboardButton.addEventListener('click', onClickConnect)
            closeModalBtn.addEventListener('click', closeModal)
        } catch (error) { }
    }

    return (
        <>
            <nav id="topnav" className="defaultscroll is-sticky">
                <div className="container">
                    {/* <!-- Logo container--> */}
                    <Link className="logo ps-0" to="/">
                        <img src={logo_icon_28} className="inline-block sm:hidden" alt="" />
                        <div className="sm:block hidden">
                            <img src={logo_dark} className="inline-block dark:hidden h-7" alt="" />
                            <img src={logo_white} className="hidden dark:inline-block h-7" alt="" />
                        </div>
                    </Link>

                    <div className="menu-extras">
                        <div className="menu-item">
                            {/* <!-- Mobile menu toggle--> */}
                            <Link to="#" className="navbar-toggle" id="isToggle" onClick={toggleMenu}>
                                <div className="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* <!--Login button Start--> */}
                    <ul className="buy-button list-none mb-0">

                        <li className="inline-block ps-1 mb-0">
                            <Link to="#" onClick={metamask} id="connectWallet" className="btn btn-icon rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><PiWalletBold/></Link>
                        </li>

                        <li className="dropdown inline-block relative ps-1">
                            <button onClick={() => openDropdown(!isDropdown)} data-dropdown-toggle="dropdown" className="dropdown-toggle btn btn-icon rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white inline-flex" type="button">
                            <AiOutlineUser className="text-[16px] align-middle me-1"/>
                            </button>

                            <div className={`dropdown-menu absolute end-0 m-0 mt-4 z-4 w-48 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 ${isDropdown ? 'hidden' : 'block'}`} >
                                
                                <div className="relative">
                                    <div className="py-4 bg-gradient-to-tr from-violet-600 to-red-600"></div>
                                    <div className="absolute px-4 -bottom-4 start-0">
                                        <div className="flex items-end">
                                           
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 px-4">
                                    <h5 className="font-semibold text-[15px]">Wallet:</h5>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-slate-400"> <div id="myPublicAddress">    </div></span>
                                    </div>
                                </div>

                                <div className="mt-4 px-4">
                                    <h5 className="font-semibold text-[15px]">Balance:</h5>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-violet-400"> <div id="myAddressBalance">    </div></span>
                                        <span className="text-[13px] text-violet-400"> <div id="myAddressToken">    </div></span>
                                    </div>
                                </div>



                                <div className="mt-4 px-4">
                                </div>

                                <ul className="py-2 text-start">
                                    <li>
                                        <Link to="/creator-profile" className="inline-flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600"><AiOutlineUser className="text-[16px] align-middle me-1"/> Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/creator-profile-edit" className="inline-flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600"><LuSettings className="text-[16px] align-middle me-1"/> Settings</Link>
                                    </li>
                                    <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>
                                    <li>
                                        <Link to="/login" className="inline-flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600"><LiaSignOutAltSolid className="text-[16px] align-middle me-1"/> Logout</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>

                    <div id="navigation" className={`${isOpen === true ? 'hidden' : 'block'}`}>

                        <ul className="navigation-menu justify-end">

                            <li className="has-submenu parent-menu-item">
                                <Link to="/index" onClick={() => handleSubmit()}>Home</Link>
                            </li>

                            <li className="has-submenu parent-parent-menu-item">
                                <Link to="/buildings"> My strategies</Link>
                            </li>

                            <li className="has-submenu parent-parent-menu-item">
                                <Link to="/artesanos" onClick={() => handleLoasCollArte()}>My investments</Link>
                            </li>

                            <li className="has-submenu parent-parent-menu-item">
                                <Link to="/upload-work">Upload strategy</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
