'use client';

import Loader from '../_components/Loader';
import useGetLink from "@/hooks/useGetLink";
import { redirect } from "next/navigation";

const DynamicSlugPage = ({ params }: { params: { slug: string } }) => {
  const { response, loading, error } = useGetLink(params.slug)
  if (error) throw new Error();
  if (response) {
    redirect(response.original_url);
  } else {
    return <Loader />;
  }
};

export default DynamicSlugPage;
