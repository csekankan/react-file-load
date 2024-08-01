// src/utils/csvToXlsx.ts
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export const convertCsvToXlsx = (csvFile: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      header: true,
      complete: (result) => {
        try {
          const worksheet = XLSX.utils.json_to_sheet(result.data);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

          const fileName = csvFile.name.replace(/\.csv$/, '.xlsx');
          XLSX.writeFile(workbook, fileName);
          resolve(fileName);
        } catch (error: any) {
          reject("Error converting CSV to XLSX: " + error.message);
        }
      },
      error: (error) => {
        reject("CSV parsing error: " + error.message);
      }
    });
  });
};
