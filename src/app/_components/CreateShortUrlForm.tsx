import React, { useState } from 'react';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

interface CreateShortUrlFormProps {
  refreshList: () => void;
}

async function sendRequest(
  url: string,
  { arg }: { arg: { originalUrl: string } }
) {
  return axios.post('/api/create-link', {
    original_url: arg.originalUrl,
  });
}
const CreateShortUrlForm = () => {
  const { trigger, isMutating } = useSWRMutation(
    '/api/user',
    sendRequest /* опции */
  );

  const [originalUrl, setOriginalUrl] = useState('');
  const originalUrlOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(e.target.value);
  };
  const createShorten = async () => {
    trigger({ originalUrl });
    setOriginalUrl('');
    mutate('/api/get-links');
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
