import { useIterativeContext } from '../context/IterativeContext';
import { useState } from 'react';
import '../css/footer.css';

const Footer = ({ onViewportChange }) => {
    const { setFurnitureByViewport } = useIterativeContext();
    const [activeButton, setActiveButton] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null); // Nuevo estado para hover

    const handleButtonClick = (buttonId, newViewport) => {
        setActiveButton(buttonId);
        onViewportChange(newViewport);
    };

    return (
        <footer className='footerBackground'>
            <div className="animation-div1"></div>
            <div className="animation-div-2"></div>

            <div className='flex-footer'>
                <button
                    className={`footer-button ${activeButton === 'first' ? 'active' : ''} ${hoveredButton === 'second' ? 'retract' : ''}`}
                    onClick={() => handleButtonClick('first', "first")}
                    onMouseEnter={() => setHoveredButton('first')}
                    onMouseLeave={() => setHoveredButton(null)}
                >
                    <div className="flex-button">
                        <div className='flex-number'>01</div>
                        <div className='flex-name'>Shell Dining Chair</div>
                    </div>
                </button>
                <button
                    className={`footer-button ${activeButton === 'second' ? 'active' : ''} ${hoveredButton === 'first' ? 'retract' : ''}`}
                    onClick={() => handleButtonClick('second', "second")}
                    onMouseEnter={() => setHoveredButton('second')}
                    onMouseLeave={() => setHoveredButton(null)}
                >
                    <div className="flex-button">
                        <div className='flex-number'>02</div>
                        <div className='flex-name'>Dunes Anthrazite Black</div>
                    </div>
                </button>
            </div>
        </footer>
    );
};

export default Footer;
