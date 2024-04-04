'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [links, setLinks] = useState({});
  const longUrlOnnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
  };

  const createShorten = async () => {
    console.log(`Make this short: ${longUrl}`);

    const result = await axios.post('/api/create-link', {
      original_url: longUrl,
    });

    console.log(result);

    setLongUrl('');
  };

  return (
    <main className='flex min-w-[60rem] flex-col items-center justify-center gap-5 rounded-md bg-transparent bg-white bg-opacity-40 p-5'>
      <h1 className=''>Url shortener</h1>
      <div className='flex w-full items-center gap-5 text-base'>
        <p className='whitespace-nowrap'>Create a short url: </p>
        <input
          type='text'
          placeholder='Enter long url'
          value={longUrl}
          onChange={longUrlOnnChange}
          className='w-full rounded-md border-2 px-3 py-2 text-black outline-0'
        />

        <button
          onClick={createShorten}
          className='h-full grow whitespace-nowrap rounded-md bg-green-500 px-4 py-2.5'
        >
          Make it short
        </button>
      </div>
    </main>
  );
}
