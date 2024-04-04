'use client';

import Loader from '../_components/Loader';
import { redirect } from 'next/navigation';
import useSWR from 'swr';
import axios from 'axios';

const DynamicSlugPage = ({ params }: { params: { slug: string } }) => {
  const { data, isLoading, error } = useSWR('/api/get-link', (): Promise<{ data: { original_url: string } }> =>
    axios.post('/api/get-link', { hash: params.slug })
  );

  if (error) throw new Error();

  if (isLoading) {
    return <Loader />;
  }

  if (data) {
    redirect(data.data.original_url);
  } else {
    return <></>;
  }
};

export default DynamicSlugPage;
