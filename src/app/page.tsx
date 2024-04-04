'use client';

import LinkList from '@/src/app/_components/LinkList';
import CreateShortUrlForm from '@/src/app/_components/CreateShortUrlForm';

export default function Home() {
  return (
    <main className='flex min-w-[60rem] h-[600px] flex-col items-center justify-start gap-5 rounded-md bg-transparent bg-white bg-opacity-40 p-5'>
      <h1>URL Simplifier</h1>
      <CreateShortUrlForm />
      <LinkList />
    </main>
  );
}
