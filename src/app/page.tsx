'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LinkList from '@/src/app/_components/LinkList';
import { UrlInfoItem } from '@/types/url-info';
import CreateShortUrlForm from '@/src/app/_components/CreateShortUrlForm';

export default function Home() {
  const [links, setLinks] = useState<Array<UrlInfoItem>>([]);
  const getLinksData = async () => {
    const result = await axios.get('/api/get-links');
    const {
      data: { list },
    } = result;
    setLinks(list);
  };
  useEffect(() => {
    getLinksData();
  }, []);

  return (
    <main className='flex min-w-[60rem] flex-col items-center justify-center gap-5 rounded-md bg-transparent bg-white bg-opacity-40 p-5'>
      <h1 className=''>URL Simplifier</h1>
      <CreateShortUrlForm refreshList={getLinksData} />
      <LinkList links={links} />
    </main>
  );
}
