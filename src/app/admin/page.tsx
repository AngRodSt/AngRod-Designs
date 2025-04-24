'use client';
import { Input } from '@/components/ui/FormInput';
import SubmitButton from '@/components/ui/SubmitButton';
import React, { useActionState, useEffect } from 'react';
import { LogIn } from '@/actions/adminActions';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const initialState = { success: false, msg: '', error: false };

//Page to log in the admin to access to the dashboard
export default function AdminLogin() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(LogIn, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.msg);
      setTimeout(() => {
        router.push('admin/dashboard');
      }, 1000);
    } else {
      toast.error(
        typeof state.msg === 'string'
          ? state.msg
          : state.msg?.message || 'Error desconocido'
      );
    }
  }, [state, router]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <form
        action={formAction}
        className="bg-gray-800 p-5 rounded-2xl flex flex-col w-96 gap-4"
      >
        <h2 className="text-center uppercase text-xl text-white">
          Admin Login
        </h2>
        <Input
          type="text"
          placeholder="Email"
          name="email"
          id="email"
          className="p-2 text-base bg-white"
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          className="p-2 text-base bg-white"
        />
        <SubmitButton
          text="Login"
          props={{ disabled: isPending }}
          className="mt-5"
        />
      </form>
    </div>
  );
}
