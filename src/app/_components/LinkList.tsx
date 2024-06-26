import React from 'react';
import { UrlInfoItem } from '@/types/url-info';
import Link from 'next/link';
import useSWR from 'swr';
import axios from 'axios';
import Loader from '@/src/app/_components/Loader';

async function getUrlList(
  url: string
): Promise<{ data: { list: Array<UrlInfoItem> } }> {
  return axios.get(url);
}
const LinkList = () => {
  const { data, isLoading, error } = useSWR('/api/get-links', getUrlList);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <table className='text-surface  min-w-full text-left text-sm font-light dark:text-white'>
      <thead className='flex w-full border-b border-neutral-200 font-medium dark:border-white/10'>
        <tr className='mb-4 flex w-full'>
          <th className='w-1/8 p-4'>#</th>
          <th className='w-1/3 p-4'>Original URL</th>
          <th className='w-1/3 p-4'>Short URL</th>
          <th className='w-1/4 p-4'>Created At</th>
        </tr>
      </thead>
      <tbody className='bg-grey-light flex  h-[300px] w-full flex-col items-center overflow-y-scroll'>
        {(data?.data.list || []).map((item, index) => {
          return (
            <tr className='mb-4 flex w-full' key={item._id}>
              <td className='w-1/8 p-4'>{index}</td>
              <td className='w-1/3 p-4'>
                <Link
                  href={item.original_url}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {item.original_url}
                </Link>
              </td>
              <td className='w-1/3 p-4'>
                <Link
                  href={item.short_url}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {item.short_url}
                </Link>
              </td>
              <td className='w-1/4 p-4'>{item.created_at}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LinkList;
