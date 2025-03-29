import { z } from 'zod'

const reqDesignSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    designDescription: z.string(),
    file: z.instanceof(File).optional(),
    functionality: z.string(),
    functionalityDescription: z.string().optional(),
    functionalityMechanic: z.string().optional().nullable(),
    functionalityElectrical: z.string().optional().nullable(),
    dimentionsX: z.string().optional(),
    dimentionsY: z.string().optional(),
    dimentionsZ: z.string().optional()
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function reqDesignAction(prevState: any, formData: FormData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const designDescription = formData.get('desingDescription')
    const functionality = formData.get('functionality')
    const functionalityDescription = formData.get('functionalityDescription')
    const functionalityMechanic = formData.get('functionality-mechanic')
    const functionalityElectrical = formData.get('functionality-electrical')
    const file = formData.get('file')
    const dimentionsX = formData.get('dimentions-x')
    const dimentionsY = formData.get('dimentions-y')
    const dimentionsZ = formData.get('dimentions-z')

    const result = reqDesignSchema.safeParse({ name, email, phone, designDescription, file, functionality, functionalityDescription, functionalityMechanic, functionalityElectrical, dimentionsX, dimentionsY, dimentionsZ })

    if (!result.success) {
        return { success: false, msg: '', error: result.error.errors[0] }
    }
    if(file instanceof File && file.size > 0 ){
        //logic for upload files to cloudinary
        //return an url for submit to the dataBase
    }
    
    console.log(file)
    return { success: true, msg: 'hola', error: false }
}