import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminPanel() {
    const [prices, setPrices] = useState({});
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [menuOption, setMenuOption] = useState(null);
    const [editingPrice, setEditingPrice] = useState({ currency: "", amount: "", value: "", bonus: "" });

    const fetchPrices = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "prices"));
            const pricesData = {};
            querySnapshot.forEach((doc) => {
                pricesData[doc.id] = doc.data();
            });
            setPrices(pricesData);
        } catch (error) {
            console.error("Error fetching prices:", error);
        }
    };

    useEffect(() => {
        fetchPrices();
    }, []);

    const handleLogin = () => {
        if (name === "juan" && password === "taffetani") {
            setIsAuthenticated(true);
        } else {
            alert("Credenciales incorrectas");
        }
    };

    const editPrice = (currency, amount, data) => {
        setEditingPrice({ currency, amount, value: data.price, bonus: data.bonus });
    };

    const saveEditedPrice = async () => {
        if (!editingPrice.currency || !editingPrice.amount) {
            alert("Error: Faltan datos.");
            return;
        }

        try {
            const priceRef = doc(db, "prices", editingPrice.currency);
            const updatedPrices = {
                ...prices[editingPrice.currency],
                [editingPrice.amount]: {
                    price: parseFloat(editingPrice.value),
                    bonus: parseFloat(editingPrice.bonus),
                },
            };

            await updateDoc(priceRef, updatedPrices);
            setEditingPrice({ currency: "", amount: "", value: "", bonus: "" });
            fetchPrices();
            alert("Precio actualizado con éxito");
        } catch (error) {
            console.error("Error al actualizar precio:", error);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-zinc-900 min-h-screen text-white">
            {!isAuthenticated ? (
                <div className="bg-zinc-800 p-6 rounded-lg shadow-md mt-12">
                    <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
                    <input className="p-2 mb-2 w-full rounded bg-zinc-700" type="text" placeholder="Nombre" onChange={(e) => setName(e.target.value)} />
                    <input className="p-2 mb-2 w-full rounded bg-zinc-700" type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                    <button className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600" onClick={handleLogin}>Entrar</button>
                </div>
            ) : menuOption === "setPrices" ? (
                <div className="w-full max-w-2xl mt-12">
                    <h2 className="text-2xl font-bold mb-4 text-center">Editar Precios</h2>

                    {Object.entries(prices).map(([currency, amounts]) => (
                        <div key={currency} className="bg-zinc-800 p-4 rounded-lg shadow-md mb-4">
                            <h3 className="text-lg font-bold mb-2">{currency}</h3>
                            {Object.entries(amounts).map(([amount, data]) => (
                                <div key={amount} className="flex justify-between items-center p-2 bg-gray-700 mb-2 rounded">
                                    <p><strong>{amount}:</strong> ${data.price} (Bono: {data.bonus})</p>
                                    <button className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600" onClick={() => editPrice(currency, amount, data)}>Editar</button>
                                </div>
                            ))}
                        </div>
                    ))}

                    {editingPrice.currency && (
                        <div className="bg-zinc-800 p-4 rounded-lg shadow-md mb-6">
                            <h3 className="text-lg font-bold mb-2">Editando {editingPrice.currency} - {editingPrice.amount}</h3>
                            <input className="p-2 mb-2 w-full rounded bg-zinc-700" type="number" placeholder="Nuevo precio" value={editingPrice.value} onChange={(e) => setEditingPrice({ ...editingPrice, value: e.target.value })} />
                            <input className="p-2 mb-2 w-full rounded bg-zinc-700" type="number" placeholder="Nuevo bono" value={editingPrice.bonus} onChange={(e) => setEditingPrice({ ...editingPrice, bonus: e.target.value })} />
                            <button className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600" onClick={saveEditedPrice}>Guardar Cambios</button>
                        </div>
                    )}

                    <button className="w-full bg-gray-500 py-2 rounded hover:bg-gray-600" onClick={() => setMenuOption(null)}>Volver al Menú</button>
                </div>
            ) : (
                <div className="w-full max-w-2xl mt-12">
                    <h2 className="text-2xl font-bold mb-4 text-center">Menú Administrador</h2>
                    <div className="bg-zinc-800 p-4 rounded-lg shadow-md mb-6">
                        <button className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 mb-2" onClick={() => setMenuOption("setPrices")}>Editar Precios</button>
                    </div>
                </div>
            )}
        </div>
    );
}