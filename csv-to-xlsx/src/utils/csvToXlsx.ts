// src/utils/csvToXlsx.ts
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

// export const convertCsvToXlsx = (csvFile: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     Papa.parse(csvFile, {
//       header: true,
//       complete: (result) => {
//         try {
//           const worksheet = XLSX.utils.json_to_sheet(result.data);
//           const workbook = XLSX.utils.book_new();
//           XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

//           const fileName = csvFile.name.replace(/\.csv$/, '.xlsx');
//           XLSX.writeFile(workbook, fileName);
//           resolve(fileName);
//         } catch (error: any) {
//           reject("Error converting CSV to XLSX: " + error.message);
//         }
//       },
//       error: (error) => {
//         reject("CSV parsing error: " + error.message);
//       }
//     });
//   });
// };

export const convertCsvToXlsx = (csvInput: File | string, isFile = true): Promise<string> => {
  return new Promise((resolve, reject) => {
    const parseComplete = (result: Papa.ParseResult<object>) => {
      try {
        const worksheet = XLSX.utils.json_to_sheet(result.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Get the filename based on whether it's coming from a file or a string
        const fileName = isFile && typeof csvInput === 'object' 
          ? (csvInput as File).name.replace(/\.csv$/, '.xlsx') 
          : 'converted-data.xlsx'; // default name for string input
        
        XLSX.writeFile(workbook, fileName);
        resolve(fileName);
      } catch (error: any) {
        reject('Error converting CSV to XLSX: ' + error.message);
      }
    };

    const parseError = (error: any) => {
      reject('CSV parsing error: ' + error.message);
    };

    if (isFile) {
      // Handle case if input is a File
      Papa.parse(csvInput as File, {
        header: true,
        complete: parseComplete,
        error: parseError,
      });
    } else {
      // Handle case if input is a CSV string
      Papa.parse(csvInput as string, {
        header: true,
        complete: parseComplete,
        error: parseError,
      });
    }
  });
};