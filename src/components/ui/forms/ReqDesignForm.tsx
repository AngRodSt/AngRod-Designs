'use client';

import { SetStateAction, useState, useActionState, useEffect } from 'react';
import { Input } from '../FormInput';
import { Label } from '../FormLabel';
import { FileUpload } from '../FileUpload';
import SubmitButton from '../SubmitButton';
import OrderAction from '@/actions/orderAction';
import SubmitNotificationModal from '../Notification';

const initialState = { success: false, msg: '', error: false };

//Form for order a design
export default function RequireDesignForm() {
  const [state, formAction, isPending] = useActionState(
    OrderAction,
    initialState
  );
  const [functionalityOption, setFunctionalityOption] = useState('option1');
  const [resetTrigger, setResetTrigger] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const handleRadioChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setFunctionalityOption(event.target.value);
  };

  useEffect(() => {
    if (state.success) {
      setModalOpen(true);
      setModalMessage(state.msg);
      setResetTrigger(true);
      setFunctionalityOption('option1');
      setTimeout(() => {
        setResetTrigger(false);
      }, 100);
    }
  }, [state]);

  return (
    <>
      <SubmitNotificationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Request sent!"
        message={modalMessage}
      />
      <div className="my-5 flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-center text-white">
          Request Design Form
        </h1>
        <p className="text-sm text-center text-[#f1cca3]">
          Need a custom 3D design? Fill out the form below with your
          requirements.
        </p>
      </div>
      <form
        action={formAction}
        className="flex flex-col max-w-[50rem] mx-auto bg-gray-950 p-5 rounded-md shadow-md"
      >
        <div className="mx-5">
          <Input
            type="text"
            name="type"
            id="type"
            defaultValue="design"
            readOnly
            className="hidden"
          />
          <section className="flex w-full flex-col md:flex-row gap-2 mb-4">
            <div className="w-full md:w-1/2">
              <Label htmlFor="name" className="">
                Client Name
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                autoComplete="true"
                required
                className=" text-white border-gray-200"
              />
            </div>

            <div className="w-full md:w-1/2">
              <Label htmlFor="email" className="">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                autoComplete="true"
                required
                className=" text-white border-gray-600"
              />
            </div>
          </section>
          <section className="mb-4">
            <Label htmlFor="phone" className="">
              Phone Number
            </Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              autoComplete="true"
              required
              className=" text-white border-gray-600"
            />
          </section>
          <section className="flex flex-col gap-3 mb-4">
            <FileUpload resetTrigger={resetTrigger} />
            <Label htmlFor="description" className="">
              Design Description{' '}
              <span className="font-light">(color, features...)</span>
            </Label>
            <textarea
              name="description"
              id="description"
              className="shadow-input bg-gray-800 rounded-md border-none  px-3 py-2 text-sm text-white transition duration-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              required
              style={{ resize: 'none' }}
            ></textarea>
          </section>
          <section className="flex flex-col gap-2">
            <Label htmlFor="functionality" className="">
              Required Functionality?
            </Label>
            <div className="flex gap-5 my24">
              <div className="flex flex-col gap-1 items-center">
                <input
                  type="radio"
                  id="functionality-no"
                  value="option1"
                  name="functionality"
                  className="w-10 h-6 accent-[#9c200d]"
                  checked={functionalityOption === 'option1'}
                  onChange={handleRadioChange}
                />
                <Label
                  htmlFor="functionality-no"
                  className="font-light text-gray-300"
                >
                  No
                </Label>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <input
                  type="radio"
                  id="functionality-yes"
                  name="functionality"
                  value="option2"
                  className="w-10 h-6 accent-[#9c200d]"
                  checked={functionalityOption === 'option2'}
                  onChange={handleRadioChange}
                />
                <Label
                  htmlFor="functionality-yes"
                  className="font-light text-gray-300"
                >
                  Yes
                </Label>
              </div>
            </div>
            <section
              className={`${functionalityOption !== 'option2' ? 'hidden' : 'block'} flex flex-col mt-4 gap-3`}
            >
              <div className="flex flex-col gap-3">
                <Label htmlFor="functionalityDescription" className="">
                  Description Functionality
                </Label>
                <textarea
                  name="functionalityDescription"
                  id="functionalityDescription"
                  className="shadow-input rounded-md bg-gray-800 border-none  px-3 py-2 text-sm text-white transition duration-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed"
                  required={functionalityOption === 'option2'}
                  style={{ resize: 'none' }}
                ></textarea>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="functionality-type" className="">
                  Type of Functionality
                </Label>
                <div className="flex gap-4 my-4">
                  <div className="flex flex-col gap-1 items-center">
                    <input
                      type="checkbox"
                      id="functionality-mechanic"
                      value="mechanic"
                      name="functionality-mechanic"
                      className="w-10 h-6 accent-[#9c200d]"
                    />
                    <Label
                      htmlFor="functionality-mechanic"
                      className="font-light text-gray-300"
                    >
                      Mechanic
                    </Label>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <input
                      type="checkbox"
                      id="functionality-electrical"
                      name="functionality-electrical"
                      value="electrical"
                      className="w-10 h-6 accent-[#9c200d]"
                    />
                    <Label
                      htmlFor="functionality-electrical"
                      className="font-light text-gray-300"
                    >
                      Electrical
                    </Label>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <section className="my-4">
            <Label htmlFor="dimentions" className="">
              Desired Product Dimension{' '}
              <span className="font-light">
                ( Max 255mm for printing service)
              </span>
            </Label>
            <div className="flex gap-4 my-2 flex-col sm:flex-row w-full">
              <div className="flex flex-col items-center">
                <Input
                  type="number"
                  id="dimention-x"
                  name="dimentions-x"
                  min={0}
                  max={255}
                  className="w-30 sm:w-16  text-white border-gray-600"
                />
                <Label className="text-gray-300">X</Label>
              </div>
              <div className="flex flex-col items-center">
                <Input
                  type="number"
                  id="dimention-y"
                  name="dimentions-y"
                  min={0}
                  max={255}
                  className="w-30 sm:w-16  text-white border-gray-600"
                />
                <Label className="text-gray-300">Y</Label>
              </div>
              <div className="flex flex-col items-center">
                <Input
                  type="number"
                  id="dimention-z"
                  name="dimentions-z"
                  min={0}
                  max={255}
                  className="w-30 sm:w-16 text-white border-gray-600"
                />
                <Label className="text-gray-300">Z</Label>
              </div>
            </div>
          </section>

          <div className="flex flex-col justify-center my-5">
            <SubmitButton
              text="Send your request"
              props={{ disabled: isPending }}
            />
          </div>
        </div>
      </form>
    </>
  );
}
