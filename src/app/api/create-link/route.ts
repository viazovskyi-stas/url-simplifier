import { customAlphabet } from 'nanoid';
import connectToDatabase from '@/database/mongodb';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const getHash = customAlphabet(characters, 4);

export async function POST(request: NextRequest) {
  // TODO validation and error handling
  const res = await request.json();
  const { original_url } = res;

  if (!original_url) {
    return NextResponse.json(
      {
        message: 'Expected original_url',
      },
      { status: 400 }
    );
  }
  try {
    const database = await connectToDatabase();
    const urlInfoCollection = database.collection('url-info');
    const hash = getHash();
    const linkExists = await urlInfoCollection.findOne({
      original_url,
    });
    const shortUrl = `${process.env.HOST}/${hash}`;
    if (!linkExists) {
      await urlInfoCollection.insertOne({
        original_url,
        uid: hash,
        shortUrl: shortUrl,
        createdAt: new Date(),
      });
    }
    return NextResponse.json(
      {
        original_url,
        full_url: `${linkExists?.shortUrl || shortUrl}`,
        linkExists,
      },
      { status: 201 }
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
