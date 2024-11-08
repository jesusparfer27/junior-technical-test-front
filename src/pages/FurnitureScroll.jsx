import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState, useEffect } from 'react';
import { useIterativeContext } from '../context/IterativeContext';
import '../css/furniture.scroll.css';

// coment1
// coment1
// coment2




export const FurnitureScroll = () => {
    const [furniture, setFurniture] = useState([]);
    const { furnitureByViewport, setFurnitureByViewport } = useIterativeContext();
    const { VITE_API, VITE_MONGO_ENDPOINT } = import.meta.env;
    console.log(VITE_API)
    console.log(VITE_MONGO_ENDPOINT)

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

    const renderFurniture = (index) => {
        const item = furniture[index];
        if (!item) return null;

        const { _id, designer, furniture_type, furniture_description, image } = item;
        return (
            <div key={_id} className="dataMap">
                <div className="flexContainer">
                    <div className="flex-left">
                        <strong>{designer}</strong>
                        <h3>{furniture_type}</h3>
                        <p>{furniture_description}</p>
                    </div>
                    <div className="flex-right">
                        <img src={`${image}`} alt="" />
                    </div>
                </div>
            </div>
        );
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
            <div className={`furniture-container ${furnitureByViewport === "first" ? (isExiting ? "first-exit" : "first-active") : "first-exit"}`}>
                {furnitureByViewport === "first" && renderFurniture(0)}
            </div>
            <div className={`furniture-container ${furnitureByViewport === "second" ? (isExiting ? "second-exit" : "second-active") : "second-exit"}`}>
                {furnitureByViewport === "second" && renderFurniture(1)}
            </div>
            <button className="fixed-button">Product details</button>
            <Footer onViewportChange={handleViewportChange} />
        </>
    );
};
