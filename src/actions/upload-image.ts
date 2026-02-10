import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary-server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<{ public_id: string; url: string }>(
      (resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'portfolio' },
          (error, result) => {
            if (error || !result) {
              reject(error);
              return;
            }
            resolve({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }
        ).end(buffer);
      }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
