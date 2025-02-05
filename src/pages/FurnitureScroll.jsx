import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState, useEffect } from 'react';
import { useIterativeContext } from '../context/IterativeContext';
import '../css/furniture.scroll.css';



export const FurnitureScroll = () => {
    const [furniture, setFurniture] = useState([]);
    const { furnitureByViewport, setFurnitureByViewport } = useIterativeContext();
    const { VITE_API, VITE_MONGO_ENDPOINT, VITE_IMG_URL_VERCEL, VITE_LINK_IMAGE } = import.meta.env;

    // Estado para manejar la transición de recogida
    const [isExiting, setIsExiting] = useState(false); 

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await fetch(`${VITE_API}${VITE_MONGO_ENDPOINT}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (response.ok) {
                setFurniture(data);
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Error al obtener el producto", error);
        }
    };

    const handleViewportChange = (newViewport) => {
        if (newViewport !== furnitureByViewport) {
            // Iniciar la animación de recogida
            setIsExiting(true);

            setTimeout(() => {
                setFurnitureByViewport(newViewport);
                setIsExiting(false); // Restablecer estado después de cambiar
            }, 1900); // Este tiempo debe coincidir con la duración de la animación
        }
    };

    return (
        <>
            <Header />
            <div className="furniture-scroll-container">
                {furniture.map(({ _id, designer, furniture_type, furniture_description, image }, index) => (
                    <div
                        key={_id}
                        className={`furniture-container ${
                            furnitureByViewport === (index === 0 ? "first" : "second")
                                ? isExiting ? `${index === 0 ? "first" : "second"}-exit`
                                : `${index === 0 ? "first" : "second"}-active`
                                : `${index === 0 ? "first" : "second"}-exit`
                        }`}
                    >
                        {furnitureByViewport === (index === 0 ? "first" : "second") && (
                            <div className="dataMap">
                                <div className="flexContainer">
                                    <div className="flex-left">
                                        <strong>{designer}</strong>
                                        <h3>{furniture_type}</h3>
                                        <p>{furniture_description}</p>
                                    </div>
                                    <div className="flex-right">
                                        <img src={`${VITE_API}/public${image}`} alt={designer} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button className="fixed-button">Product details</button>
            <Footer onViewportChange={handleViewportChange} />
        </>
    );
};
