import connectToDatabase from '@/database/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  // TODO validation and error handling
  try {
    const database = await connectToDatabase();
    const urlInfoCollection = database.collection('url-info');
    const list = await urlInfoCollection.find().toArray()
    return NextResponse.json(
      {
        list
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
