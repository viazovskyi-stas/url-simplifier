import connectToDatabase from '@/database/mongodb';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
export async function POST(request: NextRequest) {
  // TODO validation and error handling
  const res = await request.json();
  const { hash } = res;

  try {
    const database = await connectToDatabase();
    const urlInfoCollection = database.collection('url-info');
    const linkExists = await urlInfoCollection.findOne({
      hash,
    });

    if (!linkExists) {
      return NextResponse.json(
        {
          message: 'Hash does not exist',
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        original_url: linkExists?.original_url,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 }
    );
  }
}
