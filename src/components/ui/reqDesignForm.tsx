'use client'

import { SetStateAction, useState, useActionState } from "react"
import { Input } from "./form-input"
import { Label } from "./form-label"
import { FileUpload } from "./file-upload";
import SubmitButton from "./submit-button";
import reqDesignAction from "@/actions/reqDesignActions";

const initialState = { success: false, msg: "", error: false }

export default function RequestForm() {
  const [state, formAction, isPending] = useActionState(reqDesignAction, initialState)
  const [functionalityOption, setFunctionalityOption] = useState("option1");
  const handleRadioChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setFunctionalityOption(event.target.value);
  };
  console.log(state.success)
  console.log(state.error)
  return (
    <>
      <div className="my-5 flex flex-col gap-2">
        <h1 className="text-3xl text-center text-[#9c200d] ">Request Design Form</h1>
        <p className="text-sm text-center ">Need a custom 3D design? Fill out the form below with your requirements.</p>
      </div>
      <form action={formAction} className="flex flex-col max-w-[50rem] mx-auto" >
        <div className="mx-5">
          <section className="flex w-full gap-2 mb-4">
            <div className="w-1/2">
              <Label htmlFor="name">Client Name</Label>
              <Input type="text" name="name" id="name" placeholder="Name" autoComplete="true" required />
            </div>
            <div className="w-1/2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="Email" autoComplete="true" required />
            </div>
          </section>
          <section className="mb-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input type="tel" id="phone" name="phone" placeholder="Phone Number" autoComplete="true" required />
          </section>
          <section className="flex flex-col gap-3 mb-4 ">
            <FileUpload />
            <Label htmlFor="desingDescription">Design Description <span className="font-light">(color, features...)</span></Label>
            <textarea name="desingDescription" id="desingDescription" className="shadow-input  rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none   focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" required style={{
              resize: 'none'
            }}></textarea>
          </section>
          <section className="flex flex-col gap-2">
            <Label htmlFor="functionality">Required Functionality?</Label>
            <div className="flex gap-5 my24">
              <div className="flex flex-col gap-1 items-center">
                <input
                  type="radio"
                  id="functionality-no"
                  value='option1'
                  name="functionality"
                  className="w-10 h-6 accent-[#9c200d]"
                  checked={functionalityOption === "option1"}
                  onChange={handleRadioChange} />
                <Label htmlFor="functionality-no" className="font-light">No</Label>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <input
                  type="radio"
                  id="functionality-yes"
                  name="functionality"
                  value='option2'
                  className="w-10 h-6 accent-[#9c200d] "
                  checked={functionalityOption === "option2"}
                  onChange={handleRadioChange} />
                <Label htmlFor="functionality-yes" className="font-light">Yes</Label>
              </div>

            </div>
            <section className={`${functionalityOption !== 'option2' ? 'hidden' : 'block'} flex flex-col mt-4 gap-3`}>
              <div className="flex flex-col gap-3">
                <Label htmlFor="functionalityDescription">Description Funtionality</Label>
                <textarea name="functionalityDescription" id="functionalityDescription" className="shadow-input  rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none   focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed " required={functionalityOption === 'option2' ? true : false} style={{
                  resize: 'none'
                }}></textarea>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="functionality-type">Type of Functionality</Label>
                <div className="flex gap-4 my-4">
                  <div className="flex flex-col gap-1 items-center">
                    <input
                      type="checkbox"
                      id="functionality-mechanic"
                      value='mechanic'
                      name="functionality-mechanic"
                      className="w-10 h-6 accent-[#9c200d]"
                    />
                    <Label htmlFor="functionality-mechanic" className="font-light">Mechanic</Label>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <input
                      type="checkbox"
                      id="functionality-electrical"
                      name="functionality-electrical"
                      value='electrical'
                      className="w-10 h-6 accent-[#9c200d] "
                    />
                    <Label htmlFor="functionality-electrical" className="font-light">Electrical</Label>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <section className="my-4">
            <Label htmlFor="dimentions">Desired Product Dimension <span className="font-light">( Max 255mm for printing service)</span></Label>
            <div className="flex gap-4 my-2">
              <div className="flex flex-col items-center">
                <Input type='number' id="dimention-x" name="dimentions-x" min={0} max={255} className="w-16" />
                <Label>X</Label>
              </div>
              <div className="flex flex-col items-center">
                <Input type='number' id="dimention-y" name="dimentions-y" min={0} max={255} className="w-16" />
                <Label>Y</Label>
              </div>
              <div className="flex flex-col items-center">
                <Input type='number' id="dimention-z" name="dimentions-z" min={0} max={255} className="w-16" />
                <Label>Z</Label>
              </div>
            </div>
          </section>

          <div className="flex flex-col justify-center my-5">
            <SubmitButton text="Send your request" props={{ disabled: isPending }} />
          </div>
        </div>
      </form>
    </>
  )
}