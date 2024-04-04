import React from 'react';
import { UrlInfoItem } from '@/types/url-info';
import Link from 'next/link';

interface LinkListProps {
  links: Array<UrlInfoItem>;
}
const LinkList = ({ links }: LinkListProps) => {
  return (
    <table className='text-surface min-w-full text-left text-sm font-light dark:text-white'>
      <thead className='flex w-full border-b border-neutral-200 font-medium dark:border-white/10'>
        <tr className='mb-4 flex w-full'>
          <th className='w-1/6 p-4'>#</th>
          <th className='w-1/4 p-4'>Original URL</th>
          <th className='w-1/4 p-4'>Short URL</th>
          <th className='w-1/4 p-4'>Created At</th>
        </tr>
      </thead>
      <tbody className='bg-grey-light flex h-[400px] w-full flex-col items-center overflow-y-scroll'>
        {links.map((item, index) => {
          return (
            <tr className='mb-4 flex w-full' key={item._id}>
              <td className='w-1/6 p-4'>{index}</td>
              <td className='w-1/4 p-4'>
                <Link
                  href={item.original_url}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {item.original_url}
                </Link>
              </td>
              <td className='w-1/4 p-4'>
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
