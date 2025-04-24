import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/lib/dbConnect';
import Order from '@/modules/OrderSchema';
import emailRegister from '@/helpers/emailRequestDesign';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();

  //POST method
  if (req.method === 'POST') {
    const data = JSON.parse(req.body);
    const dataForDB = {
      ...data,
      functionality: data.functionality === 'true',
    };
    try {
      const request = new Order(dataForDB);
      await request.save();
      //Notify myself that a requeast has being made.
      await emailRegister({
        name: dataForDB.name as string,
        email: dataForDB.email as string,
        phone: dataForDB.phone as string,
        type: 'Design',
      });
      return res.status(200).json({
        msg: 'Thank you for your request. We will contact you soon by email or WhatsApp.',
      });
    } catch (error) {
      return res.status(400).json({ msg: error });
    }
  }
  //PUT Method
  else if (req.method === 'PUT') {
    const data = JSON.parse(req.body);
    try {
      const order = await Order.findById(data._id);
      if (!order) {
        return res.status(400).json({ msg: 'Non-existent Note' });
      }
      order.status = data.status || order.status;
      order.cost = data.cost || order.cost;

      try {
        await order.save();
        return res.status(200).json({ msg: 'Order Updated Successfully' });
      } catch (error) {
        return res
          .status(400)
          .json({ msg: 'Error Updating The Order ', error });
      }
    } catch (error) {
      return res.status(400).json({ msg: error });
    }
  }
  //DELETE method
  else if (req.method === 'DELETE') {
    const _id = req.body;

    const order = await Order.findById(_id);

    if (!order) {
      return res.status(400).json({ msg: 'Non-existent Order' });
    }

    try {
      await order.deleteOne();
      return res.status(200).json({ msg: 'Order Deleted Succesfully' });
    } catch (error) {
      return res.status(400).json({ msg: error });
    }
  }

  //GET Method
  try {
    const reqDesign = await Order.find().select('-__v');
    return res.status(200).json(reqDesign);
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
}
