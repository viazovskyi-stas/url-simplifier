import UrlInfoSchema from "@/formschemas/url-info";
// import { supabase } from "@/lib/initSupabase";
// import { generateRandomSlug } from "@/lib/utils";
// import { generateResponseError } from "@/lib/web";
import { parseRequestBody } from "@/helpers/requests";
import getConfig from "next/config";
import { NextResponse } from "next/server";

const { publicRuntimeConfig } = getConfig();

interface UrlType {
  original_url: string;
  shorten_url?: string | undefined;
  full_url?: string;
}

export async function POST(req: Request) {
  try {
    const data: UrlType = await UrlInfoSchema.validate(
      await parseRequestBody(req)
    );

    let hasGenerateSlug = false;
    // const handleInsert = async (): Promise<NextResponse> => {
    //   if (!data.shorten_url) {
    //     hasGenerateSlug = true;
    //     data.shorten_url = generateRandomSlug(
    //       Math.floor(Math.random() * 15) + 1
    //     );
    //   }
    //
    //   const {
    //     data: link,
    //     error,
    //     status,
    //     statusText,
    //   } = await supabase
    //     .from("link_shorteners")
    //     .insert(data)
    //     .select("original_url, shorten_url")
    //     .single();
    //
    //   if (error) {
    //     if (error.code === "23505" && hasGenerateSlug) {
    //       data.shorten_url = undefined;
    //       return await handleInsert();
    //     } else {
    //       throw error;
    //     }
    //   }
    //
    //   return NextResponse.json(
    //     {
    //       code: status,
    //       data: {
    //         ...link,
    //         full_url: `${publicRuntimeConfig.baseUrl}/${link.shorten_url}`,
    //       },
    //       message: statusText,
    //     },
    //     {
    //       status,
    //       statusText,
    //     }
    //   );
    // };
    //
    // return await handleInsert();
  } catch (error: any) {
    // return generateResponseError(error);
  }
}