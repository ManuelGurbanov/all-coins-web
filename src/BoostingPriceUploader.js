import React, { useState } from "react";
import * as XLSX from 'xlsx';
import { db, doc, setDoc } from './firebaseConfig';

export default function BoostingPriceUploader() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [previewData, setPreviewData] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      
      // Asumimos que hay 3 hojas: FutChampions, Rivals, Qualifier
      const futChampionsSheet = workbook.Sheets['FutChampions'];
      const rivalsSheet = workbook.Sheets['Rivals'];
      const qualifierSheet = workbook.Sheets['Qualifier'];

      // Convertir a JSON
      const futChampionsData = XLSX.utils.sheet_to_json(futChampionsSheet);
      const rivalsData = XLSX.utils.sheet_to_json(rivalsSheet);
      const qualifierData = XLSX.utils.sheet_to_json(qualifierSheet);

      // Transformar datos de Fut Champions
      const futchampions = {};
      futChampionsData.forEach(row => {
        const rankKey = `rank${row.Rank}`;
        futchampions[rankKey] = {
          ES: row.EUR || 0,
          AR: row.ARS || 0,
          MX: row.MXN || 0,
          CL: row.CLP || 0,
          CO: row.COP || 0,
          US: row.USD || 0
        };
      });

      // Transformar datos de Rivals
      const rivals = {};
      rivalsData.forEach(row => {
        const key = `${row.From}-${row.To}`;
        rivals[key] = {
          ES: row.EUR || 0,
          AR: row.ARS || 0,
          MX: row.MXN || 0,
          CL: row.CLP || 0,
          CO: row.COP || 0,
          US: row.USD || 0
        };
      });

      // Transformar datos de Qualifier
      const qualifier = {};
      qualifierData.forEach(row => {
        qualifier[row.Country] = row.Price || 0;
      });

      const pricesData = {
        futchampions,
        rivals,
        qualifier: {
          ES: qualifier.ES || 35,
          AR: qualifier.AR || 0,
          MX: qualifier.MX || 0,
          CL: qualifier.CL || 0,
          CO: qualifier.CO || 0,
          US: qualifier.US || 0
        }
      };

      setPreviewData(pricesData);
      setMessage("Datos cargados. Revisa la vista previa y confirma para subir a Firebase.");
    } catch (error) {
      console.error("Error procesando el archivo:", error);
      setMessage("Error al procesar el archivo. Verifica el formato.");
    }
  };

  const uploadToFirebase = async () => {
    if (!previewData) return;

    setUploading(true);
    try {
      const docRef = doc(db, "boosting", "prices");
      await setDoc(docRef, previewData);
      setMessage("✅ Precios actualizados correctamente en Firebase!");
      setPreviewData(null);
    } catch (error) {
      console.error("Error subiendo a Firebase:", error);
      setMessage("❌ Error al actualizar precios en Firebase.");
    }
    setUploading(false);
  };

  const downloadTemplate = () => {
    // Crear plantilla de ejemplo
    const wb = XLSX.utils.book_new();

    // Hoja Fut Champions
    const fcData = [
      { Rank: 1, EUR: 150, ARS: 150000, MXN: 2500, CLP: 120000, COP: 600000, USD: 150 },
      { Rank: 2, EUR: 120, ARS: 120000, MXN: 2000, CLP: 100000, COP: 500000, USD: 120 },
      { Rank: 3, EUR: 100, ARS: 100000, MXN: 1700, CLP: 85000, COP: 420000, USD: 100 },
      { Rank: 4, EUR: 80, ARS: 80000, MXN: 1400, CLP: 70000, COP: 350000, USD: 80 },
      { Rank: 5, EUR: 65, ARS: 65000, MXN: 1100, CLP: 55000, COP: 280000, USD: 65 },
      { Rank: 6, EUR: 50, ARS: 50000, MXN: 850, CLP: 42000, COP: 210000, USD: 50 },
      { Rank: 7, EUR: 40, ARS: 40000, MXN: 700, CLP: 35000, COP: 175000, USD: 40 },
      { Rank: 8, EUR: 30, ARS: 30000, MXN: 500, CLP: 25000, COP: 125000, USD: 30 }
    ];
    const fcSheet = XLSX.utils.json_to_sheet(fcData);
    XLSX.utils.book_append_sheet(wb, fcSheet, "FutChampions");

    // Hoja Rivals - Solo divisiones individuales (el sistema calcula automáticamente)
    const rivalsData = [
      // ESCALA 1: División 10 a 5 - MISMO PRECIO (€15 por cada división)
      { From: 10, To: 9, EUR: 15, ARS: 15000, MXN: 250, CLP: 12000, COP: 60000, USD: 15 },
      { From: 9, To: 8, EUR: 15, ARS: 15000, MXN: 250, CLP: 12000, COP: 60000, USD: 15 },
      { From: 8, To: 7, EUR: 15, ARS: 15000, MXN: 250, CLP: 12000, COP: 60000, USD: 15 },
      { From: 7, To: 6, EUR: 15, ARS: 15000, MXN: 250, CLP: 12000, COP: 60000, USD: 15 },
      { From: 6, To: 5, EUR: 15, ARS: 15000, MXN: 250, CLP: 12000, COP: 60000, USD: 15 },
      
      // ESCALA 2: División 5 a 3 - MISMO PRECIO (€30 por cada división)
      { From: 5, To: 4, EUR: 30, ARS: 30000, MXN: 500, CLP: 25000, COP: 125000, USD: 30 },
      { From: 4, To: 3, EUR: 30, ARS: 30000, MXN: 500, CLP: 25000, COP: 125000, USD: 30 },
      
      // ESCALA 3: División 3 a 2 - PRECIO ÚNICO (€50)
      { From: 3, To: 2, EUR: 50, ARS: 50000, MXN: 850, CLP: 42000, COP: 210000, USD: 50 },
      
      // ESCALA 4: División 2 a 1 - PRECIO ÚNICO (€80)
      { From: 2, To: 1, EUR: 80, ARS: 80000, MXN: 1350, CLP: 68000, COP: 340000, USD: 80 }
    ];
    const rivalsSheet = XLSX.utils.json_to_sheet(rivalsData);
    XLSX.utils.book_append_sheet(wb, rivalsSheet, "Rivals");

    // Hoja Qualifier
    const qualifierData = [
      { Country: "ES", Price: 35 },
      { Country: "AR", Price: 35000 },
      { Country: "MX", Price: 600 },
      { Country: "CL", Price: 30000 },
      { Country: "CO", Price: 150000 },
      { Country: "US", Price: 35 }
    ];
    const qualifierSheet = XLSX.utils.json_to_sheet(qualifierData);
    XLSX.utils.book_append_sheet(wb, qualifierSheet, "Qualifier");

    XLSX.writeFile(wb, "boosting_prices_template.xlsx");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-900">
      <div className="w-full max-w-2xl p-8 bg-gray-800 rounded-lg">
        <h1 className="mb-6 text-3xl font-bold text-center text-white">
          Gestor de Precios de Boosting
        </h1>

        <div className="mb-6">
          <button
            onClick={downloadTemplate}
            className="w-full px-6 py-3 mb-4 text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            📥 Descargar Plantilla de Excel
          </button>

          <div className="p-4 mb-4 text-sm text-gray-300 bg-gray-700 rounded-lg">
            <h3 className="mb-2 font-bold">Instrucciones:</h3>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Descarga la plantilla de Excel</li>
              <li>Completa los precios en cada hoja (FutChampions, Rivals, Qualifier)</li>
              <li>Guarda el archivo</li>
              <li>Súbelo usando el botón de abajo</li>
              <li>Revisa la vista previa y confirma</li>
            </ol>
            
            <div className="p-3 mt-3 bg-gray-600 rounded">
              <h4 className="mb-1 font-bold text-yellow-400">Sistema de Escalas Rivals:</h4>
              <ul className="text-xs space-y-0.5">
                <li>• Escala 1 (Div 10→5): Mismo precio × 5 divisiones</li>
                <li>• Escala 2 (Div 5→3): Mismo precio × 2 divisiones</li>
                <li>• Escala 3 (Div 3→2): Precio único</li>
                <li>• Escala 4 (Div 2→1): Precio único</li>
              </ul>
            </div>
          </div>

          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-gray-500">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click para subir</span>
              </p>
              <p className="text-xs text-gray-500">Excel (.xlsx)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
            />
          </label>
        </div>

        {message && (
          <div className={`p-4 mb-4 rounded-lg ${
            message.includes('✅') ? 'bg-green-900 text-green-200' : 
            message.includes('❌') ? 'bg-red-900 text-red-200' : 
            'bg-blue-900 text-blue-200'
          }`}>
            {message}
          </div>
        )}

        {previewData && (
          <div className="p-4 mb-4 bg-gray-700 rounded-lg">
            <h3 className="mb-3 text-lg font-bold text-white">Vista Previa:</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>✓ Fut Champions: {Object.keys(previewData.futchampions).length} rangos</p>
              <p>✓ Rivals: {Object.keys(previewData.rivals).length} combinaciones</p>
              <p>✓ Qualifier: {Object.keys(previewData.qualifier).length} países</p>
            </div>
            <button
              onClick={uploadToFirebase}
              disabled={uploading}
              className="w-full px-6 py-3 mt-4 text-white transition-all bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-600"
            >
              {uploading ? "Subiendo..." : "✅ Confirmar y Subir a Firebase"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}