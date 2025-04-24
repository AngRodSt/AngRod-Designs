import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import cloudinary from '@/lib/cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

type ResponseData = {
  url?: string;
  error?: string;
};

//API for saving the files into cloudinary for storage management
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const form = formidable({ keepExtensions: true });

    // Procesamos la solicitud con `form.parse`
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error al procesar el formulario:', err);
        return res.status(500).json({ error: 'Error processing the file' });
      }

      const uploadedFile = Array.isArray(files.file)
        ? files.file[0]
        : files.file;

      if (!uploadedFile || !uploadedFile.filepath) {
        console.error('No file found');
        return res.status(400).json({ error: 'No file uploaded' });
      }

      try {
        // Upload the file to cloudinaty
        const result = await cloudinary.uploader.upload(uploadedFile.filepath, {
          folder: 'uploads', //folder where is going to be storage the file
        });
        // Return the generated URL to save to the database
        return res.status(200).json({ url: result.secure_url });
      } catch (error) {
        console.error('Error de Cloudinary:', error);
        return res.status(500).json({ error: 'Cloudinary upload failed' });
      }
    });
  }
}
