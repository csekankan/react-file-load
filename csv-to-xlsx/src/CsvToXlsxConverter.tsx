// src/CsvToXlsxConverter.tsx
import React, { useState } from 'react';
import { convertCsvToXlsx } from './utils/csvToXlsx';

const CsvToXlsxConverter: React.FC = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setCsvFile(file);
  };

  const handleFileUpload = async () => {
    if (csvFile) {
      try {
        await convertCsvToXlsx(csvFile);
        alert("Conversion successful! The file has been downloaded.");
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Please upload a CSV file first.");
    }
  };

  return (
    <div>
      <h1>CSV to XLSX Converter</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Convert to XLSX</button>
    </div>
  );
};

export default CsvToXlsxConverter;
