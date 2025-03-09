import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function AdminPanel() {
    const [prices, setPrices] = useState({ CLP: {}, USD: {}, EUR: {}, COP: {}, MXN: {} });
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [menuOption, setMenuOption] = useState(null);
    const [discounts, setDiscounts] = useState({ PC: "", PSXB: "", minCoinsForDiscount: "" });

    useEffect(() => {
        const fetchPrices = async () => {
            const docRef = doc(db, "prices", "per100k");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPrices(docSnap.data());
            }
        };
        const fetchDiscounts = async () => {
            const docRef = doc(db, "discounts", "global");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setDiscounts(docSnap.data());
            }
        };
        fetchPrices();
        fetchDiscounts();
    }, []);

    const handleLogin = () => {
        if (name === "juan" && password === "taffetani") {
            setIsAuthenticated(true);
        } else {
            alert("Credenciales incorrectas");
        }
    };

    const handleUpdatePrices = async () => {
        const docRef = doc(db, "prices", "per100k");
        await updateDoc(docRef, prices);
        alert("Precios actualizados");
    };

    const handleUpdateDiscounts = async () => {
        const docRef = doc(db, "discounts", "global");
        await updateDoc(docRef, {
            PC: Number(discounts.PC),
            PSXB: Number(discounts.PSXB),
            minCoinsForDiscount: Number(discounts.minCoinsForDiscount),
        });
        alert("Descuento actualizado correctamente.");
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-6 text-white bg-zinc-900">
            {!isAuthenticated ? (
                <div className="p-6 mt-12 rounded-lg shadow-md bg-zinc-800">
                    <h2 className="mb-4 text-xl font-bold">Iniciar sesión</h2>
                    <input className="w-full p-2 mb-2 rounded bg-zinc-700" type="text" placeholder="Nombre" onChange={(e) => setName(e.target.value)} />
                    <input className="w-full p-2 mb-2 rounded bg-zinc-700" type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                    <button className="w-full py-2 bg-blue-500 rounded hover:bg-blue-600" onClick={handleLogin}>Entrar</button>
                </div>
            ) : menuOption === "setPrices" ? (
                <div className="w-full max-w-2xl mt-12">
                    <h2 className="text-2xl font-bold">Editar Precios</h2>
                    <div className="p-6 rounded-lg shadow-md bg-zinc-800">
                        {Object.keys(prices).map((currency) => (
                            <div key={currency}>
                                <h3 className="mt-4 text-lg font-bold">{currency} 100K</h3>
                                <label className="block mb-2">PC:
                                    <input className="w-full p-2 rounded bg-zinc-700" type="number" value={prices[currency].PC || ""} onChange={(e) => setPrices({ ...prices, [currency]: { ...prices[currency], PC: e.target.value } })} />
                                </label>
                                <label className="block mb-2">PSXB:
                                    <input className="w-full p-2 rounded bg-zinc-700" type="number" value={prices[currency].PSXB || ""} onChange={(e) => setPrices({ ...prices, [currency]: { ...prices[currency], PSXB: e.target.value } })} />
                                </label>
                            </div>
                        ))}
                        <button className="w-full py-2 mt-4 bg-green-500 rounded hover:bg-green-600" onClick={handleUpdatePrices}>Guardar Cambios</button>
                        <button className="w-full py-2 mt-2 bg-gray-500 rounded hover:bg-gray-600" onClick={() => setMenuOption(null)}>Volver al Menú</button>
                    </div>
                </div>
            ) : menuOption === "setDiscounts" ? (
                <div className="w-full max-w-2xl mt-12">
                    <h2 className="text-2xl font-bold">Configurar Descuentos</h2>
                    <div className="p-6 rounded-lg shadow-md bg-zinc-800">
                        <label className="block mb-2">Porcentaje de regalo en PC (%):
                            <input className="w-full p-2 rounded bg-zinc-700" type="number" value={discounts.PC} onChange={(e) => setDiscounts({ ...discounts, PC: e.target.value })} />
                        </label>
                        <label className="block mb-2">Porcentaje de regalo en PSXB (%):
                            <input className="w-full p-2 rounded bg-zinc-700" type="number" value={discounts.PSXB} onChange={(e) => setDiscounts({ ...discounts, PSXB: e.target.value })} />
                        </label>
                        <label className="block mb-2">Mínimo de monedas para aplicar descuento:
                            <input className="w-full p-2 rounded bg-zinc-700" type="number" value={discounts.minCoinsForDiscount} onChange={(e) => setDiscounts({ ...discounts, minCoinsForDiscount: e.target.value })} />
                        </label>
                        <button className="w-full py-2 mt-4 bg-green-500 rounded hover:bg-green-600" onClick={handleUpdateDiscounts}>Guardar Cambios</button>
                        <button className="w-full py-2 mt-2 bg-gray-500 rounded hover:bg-gray-600" onClick={() => setMenuOption(null)}>Volver al Menú</button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-2xl mt-12">
                    <h2 className="mb-4 text-2xl font-bold text-center">Menú Administrador</h2>
                    <button className="w-full py-2 mb-2 bg-blue-500 rounded hover:bg-blue-600" onClick={() => setMenuOption("setPrices")}>Editar Precios</button>
                    <button className="w-full py-2 mb-2 bg-blue-500 rounded hover:bg-blue-600" onClick={() => setMenuOption("setDiscounts")}>Configurar Descuentos</button>
                </div>
            )}
        </div>
    );
}
