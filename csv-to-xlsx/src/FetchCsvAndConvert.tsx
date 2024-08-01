// src/FetchCsvAndConvert.tsx
import React, { useState } from 'react';
import { convertCsvToXlsx } from './utils/csvToXlsx'; // Reuse the updated utility function

const FetchCsvAndConvert: React.FC = () => {
  const [csvUrl, setCsvUrl] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>(''); // State for access token
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCsvUrl(event.target.value);
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccessToken(event.target.value);
  };

  const handleFetchCsv = async () => {
    setLoading(true);
    setError(null);

    try {
      // Append the access token to the URL as a query parameter
      const urlWithToken = new URL(csvUrl);
      urlWithToken.searchParams.append('access_token', accessToken); // Adding access token to the URL

      const response = await fetch(urlWithToken.toString(), {
        headers: {
          'Accept': 'text/csv', // Assuming the API responds with CSV type
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const csvData = await response.text();
      // Using the utility function with csvData as a string
      await convertCsvToXlsx(csvData, false); // 2nd parameter is false to indicate it's a string

      alert('Conversion successful! The file has been downloaded.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Fetch CSV and Convert to XLSX</h1>
      <input
        type="text"
        value={csvUrl}
        onChange={handleUrlChange}
        placeholder="Enter CSV API URL"
      />
      <input
        type="text"
        value={accessToken}
        onChange={handleTokenChange}
        placeholder="Enter Access Token"
      />
      <button onClick={handleFetchCsv} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch and Convert CSV'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FetchCsvAndConvert;
