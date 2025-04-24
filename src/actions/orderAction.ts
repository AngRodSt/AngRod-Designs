/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { z } from 'zod';

//Schema of an order
const orderSchema = z.object({
  type: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  description: z.string(),
  file: z.instanceof(File).optional(),
  material: z.string().nullable().optional(),
  functionality: z.string(),
  functionalityDescription: z.string().optional(),
  functionalityMechanic: z.string().optional().nullable(),
  functionalityElectrical: z.string().optional().nullable(),
  dimentionsX: z.string().optional(),
  dimentionsY: z.string().optional(),
  dimentionsZ: z.string().optional(),
});

//Function to handle the submition of an order
export default async function OrderAction(prevState: any, formData: FormData) {
  //Extract the data from the form
  const type = formData.get('type');
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const description = formData.get('description');
  const material = formData.get('material') as string | '';
  const functionality = formData.get('functionality');
  const functionalityDescription = formData.get('functionalityDescription');
  const functionalityMechanic = formData.get('functionality-mechanic');
  const functionalityElectrical = formData.get('functionality-electrical');
  const file = formData.get('file') as File;
  const dimentionsX = formData.get('dimentions-x');
  const dimentionsY = formData.get('dimentions-y');
  const dimentionsZ = formData.get('dimentions-z');
  let fileUrl;

  //Validate the type of the data with the zod schema
  const result = orderSchema.safeParse({
    type,
    name,
    email,
    phone,
    description,
    file,
    material,
    functionality,
    functionalityDescription,
    functionalityMechanic,
    functionalityElectrical,
    dimentionsX,
    dimentionsY,
    dimentionsZ,
  });

  if (!result.success) {
    console.log(result.error);
    return { success: false, msg: '', error: result.error.errors[0] };
  }

  /*
    ? Cloudinary max is the 10mb in the free plan... so is working after all
    */
  //logic for upload files to cloudinary
  if (file instanceof File && file.size > 0) {
    const fileData = new FormData();
    fileData.append('file', file);
    try {
      const res = await fetch('/api/uploadFiles', {
        method: 'POST',
        body: fileData,
      });
      const data: { url?: string; error?: string } = await res.json();
      //return an url for submit to the DataBase
      console.log(data.error, data.url);
      fileUrl = data.url;
    } catch (error) {
      console.log(error);
      return { success: false, msg: error, error: true };
    }
  }

  //Formating the data
  const dimensions = `${dimentionsX || ''}x${dimentionsY || ''}x${dimentionsZ || ''}`;
  const functionalityType = `${functionalityElectrical || ''} , ${functionalityMechanic || ''}`;
  let functionalityBolean = false;
  if (functionality === 'option2') {
    functionalityBolean = true;
  }

  //Creating the plane object for the inputs and adapts to the entry for the database
  const formDataForDataBase: Record<string, string> = {
    type: type as string,
    name: name as string,
    email: email as string,
    ...(phone && { phone: phone as string }),
    description: description as string,
    material: material as string,
    functionality: String(functionalityBolean),
    ...(functionalityDescription && {
      functionalityDescription: functionalityDescription as string,
    }),
    functionalityType: functionalityType,
    dimensions: dimensions,
    ...(fileUrl && { file: fileUrl }),
  };

  //logic for saving the request to the DataBase
  try {
    const res = await fetch('/api/orderApi', {
      method: 'POST',
      body: JSON.stringify(formDataForDataBase),
    });
    const result = await res.json();
    return { success: true, msg: result.msg, error: false };
  } catch (error) {
    return { success: false, msg: error, error: true };
  }
}
