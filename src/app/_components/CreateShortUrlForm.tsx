import React, { useState } from 'react';
import axios from 'axios';

interface CreateShortUrlFormProps {
  refreshList: () => void;
}
const CreateShortUrlForm = ({ refreshList }: CreateShortUrlFormProps) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const originalUrlOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(e.target.value);
  };
  const createShorten = async () => {
    await axios.post('/api/create-link', {
      original_url: originalUrl,
    });
    setOriginalUrl('');
    await refreshList();
  };

  return (
    <div className='flex w-full items-center gap-5 text-base'>
      <p className='whitespace-nowrap'>Create a short url: </p>
      <input
        type='text'
        name='original_url'
        placeholder='Enter long url'
        value={originalUrl}
        onChange={originalUrlOnChange}
        className='w-full rounded-md border-2 px-3 py-2 text-base text-black outline-0 '
      />
      <button
        onClick={createShorten}
        className='h-full grow whitespace-nowrap rounded-md bg-green-500 px-4 py-2.5'
      >
        Make it short
      </button>
    </div>
  );
};

export default CreateShortUrlForm;
