import React, { useState, useEffect } from 'react';
import '../css/header.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [furnitureNav, setFurnitureNav] = useState([]);
    const [showImage, setShowImage] = useState(false);
    const [animateNavList, setAnimateNavList] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [hoverElement1, setHoverElement1] = useState(false);
    const [transformElement1, setTransformElement1] = useState(false);

    const { VITE_API, VITE_MONGO_ENDPOINT, VITE_ENDPOINT_HEADER_IMAGE } = import.meta.env;

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await fetch(`${VITE_API}${VITE_MONGO_ENDPOINT}${VITE_ENDPOINT_HEADER_IMAGE}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (response.ok) {
                setFurnitureNav(data);
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Error al obtener el producto", error);
        }
    };

    const toggleMenu = () => {
        if (isOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsOpen(false);
                setAnimateNavList(false);
                setShowSubMenu(false);
                setShowImage(false);
                setIsClosing(false);
                setTransformElement1(false);
            }, 500);
        } else {
            setIsOpen(true);
        }
    };

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setAnimateNavList(true);
            }, 500);
        }
    }, [isOpen]);

    const handleClickElement1 = () => {
        setShowSubMenu(prev => !prev);
        setShowImage(false);
        setTransformElement1(prev => !prev);
    };

    const handleMouseEnterElement1 = () => {
        setHoverElement1(true);
        setShowSubMenu(true);
    };

    const handleMouseLeaveElement1 = () => {
        setHoverElement1(false);
    };

    const handleMouseEnterSubElement = () => {
        setShowImage(true);
    };

    const handleMouseLeaveSubElement = () => {
        setShowImage(false);
    };

    return (
        <header className='headerMenu'>
            <div className="headerFlex">
                <h2 className={`headerLogo ${isOpen ? 'white' : ''}`}>Master</h2>
                <button
                    className={`toggleButton ${isOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                >
                    {isOpen ? 'Cerrar' : 'Abrir'}
                </button>
            </div>
            <div className={`navContainer ${isOpen ? 'open' : ''}`}>
                <div className="navContent">
                    <nav className="nav">
                        <ul className={`navList ${animateNavList ? 'show' : ''} ${isClosing ? 'close' : ''}`}>
                            {['Collection', 'Design', 'Craftmanship', 'Ethics'].map((element, index) => (
                                <li 
                                    key={index}
                                    onClick={element === 'Collection' ? handleClickElement1 : undefined}
                                    className={element === 'Collection' && transformElement1 ? 'transform' : ''}
                                    style={{ animationDelay: `${index * 100}ms` }} // Retraso en la animación
                                >
                                    {element}
                                    {element === 'Collection' && (
                                        <ul className={`submenu ${showSubMenu ? 'show' : 'hide'}`}>
                                            <li onMouseEnter={handleMouseEnterSubElement} onMouseLeave={handleMouseLeaveSubElement}>Furniture</li>
                                            <li>Lighting</li>
                                            <li>Accesories</li>
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <ul className={`footerNav ${animateNavList ? 'show' : ''} ${isClosing ? 'close' : ''}`}>
                            <li>About</li>
                            <li>Contact</li>
                            <li>Dealers</li>
                            <li>News</li>
                            <li>Care</li>
                            <li>Press</li>
                        </ul>
                    </nav>
                    <div className={`imageContainer ${showImage ? 'show' : ''} ${isClosing ? 'close' : ''}`}>
                        {furnitureNav.map((furniture) => (
                            <img
                                key={furniture._id}
                                src={`${VITE_API}/${furniture.img}`}
                                alt={`Furniture ${furniture._id}`}
                                className="furnitureImage"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
