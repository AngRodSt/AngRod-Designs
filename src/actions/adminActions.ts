/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '@/components/admin/DynamicOrderTable';
import z from 'zod';

const userSchema = z.object({
  email: z.string(),
  password: z.string(),
});

//Function for login with the admin account
const LogIn = async (prev: any, formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  console.log(email, password);
  const result = userSchema.safeParse({ email, password });

  //Validation with zod
  if (!result.success) {
    return { success: false, msg: result.error.errors[0], error: true };
  }
  //Making the call to de API
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();
    if (result.error) {
      return { success: false, msg: result.msg, error: true };
    }
    return { success: true, msg: result.msg, error: false };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : 'An unknown error occurred',
      error: true,
    };
  }
};

//Function for fetching the orders from the database
const getOrders = async () => {
  try {
    const res = await fetch('/api/orderApi', {
      method: 'GET',
    });
    const result = await res.json();
    return { response: result, error: false };
  } catch (error) {
    return { response: error, error: true };
  }
};

//Function for updating an order
const updateOrder = async (order: Order) => {
  try {
    const res = await fetch('/api/orderApi', {
      method: 'PUT',
      body: JSON.stringify(order),
    });
    const result = await res.json();
    return { response: result, error: false };
  } catch (error) {
    return { response: error, error: true };
  }
};

//Function for delete an order
const deleteOrder = async (_id: string) => {
  try {
    const res = await fetch('/api/orderApi', {
      method: 'DELETE',
      body: _id,
    });
    const result = await res.json();
    return { response: result, error: false };
  } catch (error) {
    return { response: error, error: true };
  }
};

//Function to send a recived-email to the client to notify the order has been recived
const handleSendRecivedEmail = async (selectedOrder: Order) => {
  try {
    const res = await fetch('/api/recivedOrderApi', {
      method: 'POST',
      body: JSON.stringify(selectedOrder),
    });
    const result = await res.json();
    return { response: result, error: false };
  } catch (error) {
    return { response: error, error: true };
  }
};

export { LogIn, getOrders, updateOrder, handleSendRecivedEmail, deleteOrder };
