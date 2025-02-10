import React, { useState, useEffect } from "react";
import { db, storage } from "./firebaseConfig";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminPanel() {
    const [offers, setOffers] = useState([]);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [newOffer, setNewOffer] = useState({ buy: "", take: "" });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

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
        if (!newOffer.buy || !newOffer.take || !image) {
            alert("Completa todos los campos y sube una imagen.");
            return;
        }

        setLoading(true);

        try {
            // Subir imagen a Firebase Storage
            const imageRef = ref(storage, `players/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);

            // Agregar oferta a Firestore con la URL de la imagen
            await addDoc(collection(db, "offers"), {
                buy: newOffer.buy,
                take: newOffer.take,
                player: imageUrl
            });

            // Resetear estados
            setNewOffer({ buy: "", take: "" });
            setImage(null);
            fetchOffers();
            alert("Oferta agregada con éxito");
        } catch (error) {
            console.error("Error al agregar oferta:", error);
            alert("Hubo un error al subir la oferta.");
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
            ) : (
                <div className="w-full max-w-2xl mt-12">
                    <h2 className="text-2xl font-bold mb-4 text-center">Panel de Administrador</h2>

                    {/* Agregar Nueva Oferta */}
                    <div className="bg-zinc-800 p-4 rounded-lg shadow-md mb-6">
                        <h3 className="text-lg font-bold mb-2">Agregar Nueva Oferta</h3>
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
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="mb-2 w-full p-2 rounded bg-zinc-700"
                        />
                        <button
                            className={`bg-blue-500 w-full py-2 rounded hover:bg-blue-600 ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            onClick={addOffer}
                            disabled={loading}
                        >
                            {loading ? "Subiendo..." : "Agregar Oferta"}
                        </button>
                    </div>

                    {/* Lista de Ofertas */}
                    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold mb-2">Ofertas Disponibles</h3>
                        {offers.length === 0 ? (
                            <p className="text-gray-400">No hay ofertas disponibles.</p>
                        ) : (
                            offers.map((offer) => (
                                <div key={offer.id} className="flex justify-between items-center p-2 bg-gray-700 mb-2 rounded">
                                    <div>
                                        <p><strong>Comprá:</strong> {offer.buy}K</p>
                                        <p><strong>Llevate:</strong> {offer.take}K</p>
                                        <img src={offer.player} alt="Player" className="w-12 h-12 rounded-full mt-1" />
                                    </div>
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
                </div>
            )}
        </div>
    );
}
