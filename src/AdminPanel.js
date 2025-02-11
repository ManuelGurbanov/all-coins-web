import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";

export default function AdminPanel() {
    const [offers, setOffers] = useState([]);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [newOffer, setNewOffer] = useState({ buy: "", take: "", imageUrl: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [menuOption, setMenuOption] = useState(null); // Variable para el menú post-login
    const [editingOffer, setEditingOffer] = useState(null); // Variable para controlar la oferta que se está editando

    const fetchOffers = async () => {
        const querySnapshot = await getDocs(collection(db, "offers"));
        const offersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOffers(offersData);
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const handleLogin = () => {
        if (name === "juan" && password === "taffetani") {
            setIsAuthenticated(true);
        } else {
            alert("Credenciales incorrectas");
        }
    };

    const deleteOffer = async (id) => {
        await deleteDoc(doc(db, "offers", id));
        fetchOffers();
    };

    const addOffer = async () => {
        if (!newOffer.buy || !newOffer.take || !newOffer.imageUrl || !newOffer.message) {
            alert("Completa todos los campos.");
            return;
        }

        setLoading(true);

        try {
            // Agregar oferta a Firestore con la URL de la imagen
            await addDoc(collection(db, "offers"), {
                buy: newOffer.buy,
                take: newOffer.take,
                player: newOffer.imageUrl,
                message: newOffer.message
            });

            setNewOffer({ buy: "", take: "", imageUrl: "", message: "" });
            fetchOffers();
            alert("Oferta agregada con éxito");
        } catch (error) {
            console.error("Error al agregar oferta:", error);
            alert("Hubo un error al subir la oferta.");
        }

        setLoading(false);
    };

    const handleEditOffer = (offer) => {
        setEditingOffer(offer);
        setNewOffer({
            buy: offer.buy,
            take: offer.take,
            imageUrl: offer.player,
            message: offer.message
        });
    };

    const saveEditedOffer = async () => {
        if (!newOffer.buy || !newOffer.take || !newOffer.imageUrl || !newOffer.message) {
            alert("Completa todos los campos.");
            return;
        }

        setLoading(true);

        try {
            const offerRef = doc(db, "offers", editingOffer.id);
            await updateDoc(offerRef, {
                buy: newOffer.buy,
                take: newOffer.take,
                player: newOffer.imageUrl,
                message: newOffer.message
            });

            setEditingOffer(null);
            setNewOffer({ buy: "", take: "", imageUrl: "", message: "" });
            fetchOffers();
            alert("Oferta actualizada con éxito");
        } catch (error) {
            console.error("Error al actualizar oferta:", error);
            alert("Hubo un error al actualizar la oferta.");
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-zinc-900 min-h-screen text-white">
            {!isAuthenticated ? (
                <div className="bg-zinc-800 p-6 rounded-lg shadow-md mt-12">
                    <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
                    <input
                        className="p-2 mb-2 w-full rounded bg-zinc-700"
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="p-2 mb-2 w-full rounded bg-zinc-700"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600"
                        onClick={handleLogin}
                    >
                        Entrar
                    </button>
                </div>
            ) : menuOption === null ? (
                <div className="w-full max-w-2xl mt-12">
                    <h2 className="text-2xl font-bold mb-4 text-center">Menú Administrador</h2>
                    <div className="bg-zinc-800 p-4 rounded-lg shadow-md mb-6">
                        <button
                            className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 mb-2"
                            onClick={() => setMenuOption("addOffer")}
                        >
                            1) Agregar Oferta
                        </button>
                        <button
                            className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600"
                            onClick={() => setMenuOption("setPrices")}
                        >
                            2) Elegir Precios
                        </button>
                    </div>
                </div>
            ) : menuOption === "addOffer" ? (
                <div className="w-full max-w-2xl mt-12">
                    <h2 className="text-2xl font-bold mb-4 text-center">Agregar Nueva Oferta</h2>

                    {/* Formulario para nueva oferta */}
                    <div className="bg-zinc-800 p-4 rounded-lg shadow-md mb-6">
                        <input
                            className="p-2 mb-2 w-full rounded bg-zinc-700"
                            type="number"
                            placeholder="Comprá (Ej: 2000)"
                            value={newOffer.buy}
                            onChange={(e) => setNewOffer({ ...newOffer, buy: e.target.value })}
                        />
                        <input
                            className="p-2 mb-2 w-full rounded bg-gray-700"
                            type="number"
                            placeholder="Llevate (Ej: 2250)"
                            value={newOffer.take}
                            onChange={(e) => setNewOffer({ ...newOffer, take: e.target.value })}
                        />
                        <input
                            className="p-2 mb-2 w-full rounded bg-zinc-700"
                            type="text"
                            placeholder="URL de la Imagen"
                            value={newOffer.imageUrl}
                            onChange={(e) => setNewOffer({ ...newOffer, imageUrl: e.target.value })}
                        />
                        <input
                            className="p-2 mb-2 w-full rounded bg-zinc-700"
                            type="text"
                            placeholder="Mensaje por defecto de la oferta"
                            value={newOffer.message}
                            onChange={(e) => setNewOffer({ ...newOffer, message: e.target.value })}
                        />
                        <button
                            className={`bg-blue-500 w-full py-2 rounded hover:bg-blue-600 ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            onClick={addOffer}
                            disabled={loading}
                        >
                            {loading ? "Guardando..." : "Agregar Oferta"}
                        </button>
                    </div>

                    {/* Listar ofertas existentes y permitir su edición */}
                    <div className="bg-zinc-800 p-4 rounded-lg shadow-md mb-6">
                        <h3 className="text-lg font-bold mb-2">Ofertas Disponibles</h3>
                        {offers.length === 0 ? (
                            <p className="text-gray-400">No hay ofertas disponibles.</p>
                        ) : (
                            offers.map((offer) => (
                                <div
                                    key={offer.id}
                                    className="flex justify-between items-center p-2 bg-gray-700 mb-2 rounded"
                                >
                                    <div>
                                        <p><strong>Comprá:</strong> {offer.buy}K</p>
                                        <p><strong>Llevate:</strong> {offer.take}K</p>
                                        <img src={offer.player} alt="Player" className="w-12 h-12 rounded-full mt-1" />
                                    </div>
                                    <button
                                        className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                                        onClick={() => handleEditOffer(offer)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => deleteOffer(offer.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Si estamos editando una oferta */}
                    {editingOffer && (
                        <div className="bg-zinc-800 p-4 rounded-lg shadow-md mb-6">
                            <h3 className="text-lg font-bold mb-2">Editar Oferta</h3>
                            <input
                                className="p-2 mb-2 w-full rounded bg-zinc-700"
                                type="number"
                                placeholder="Comprá (Ej: 2000)"
                                value={newOffer.buy}
                                onChange={(e) => setNewOffer({ ...newOffer, buy: e.target.value })}
                            />
                            <input
                                className="p-2 mb-2 w-full rounded bg-gray-700"
                                type="number"
                                placeholder="Llevate (Ej: 2250)"
                                value={newOffer.take}
                                onChange={(e) => setNewOffer({ ...newOffer, take: e.target.value })}
                            />
                            <input
                                className="p-2 mb-2 w-full rounded bg-zinc-700"
                                type="text"
                                placeholder="URL de la Imagen"
                                value={newOffer.imageUrl}
                                onChange={(e) => setNewOffer({ ...newOffer, imageUrl: e.target.value })}
                            />
                            <input
                                className="p-2 mb-2 w-full rounded bg-zinc-700"
                                type="text"
                                placeholder="Mensaje por defecto de la oferta"
                                value={newOffer.message}
                                onChange={(e) => setNewOffer({ ...newOffer, message: e.target.value })}
                            />
                            <button
                                className="w-full bg-green-500 py-2 rounded hover:bg-green-600"
                                onClick={saveEditedOffer}
                                disabled={loading}
                            >
                                {loading ? "Guardando..." : "Guardar Cambios"}
                            </button>
                        </div>
                    )}

                    <button
                        className="w-full bg-gray-500 py-2 rounded hover:bg-gray-600"
                        onClick={() => setMenuOption(null)}
                    >
                        Volver al Menú
                    </button>
                </div>
            ) : menuOption === "setPrices" ? (
                <div className="w-full max-w-2xl mt-12">
                    <h2 className="text-2xl font-bold mb-4 text-center">Elegir Precios</h2>
                    <div className="bg-zinc-800 p-4 rounded-lg shadow-md mb-6">
                        <p className="text-gray-400">Esta sección está en desarrollo.</p>
                    </div>
                    <button
                        className="w-full bg-gray-500 py-2 rounded hover:bg-gray-600"
                        onClick={() => setMenuOption(null)}
                    >
                        Volver al Menú
                    </button>
                </div>
            ) : null}
        </div>
    );
}
