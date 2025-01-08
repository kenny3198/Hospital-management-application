"use client"
import { UserFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";    
import { Button } from "@/components/ui/button"
import SubmitButton from "../SubmitButton";
import { Form, FormControl} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patients.action";
import { GenderOptions } from "@/constatnts";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { RadioGroup } from "../ui/radio-group";
import { Label } from "@radix-ui/react-label";
export enum FormFieldType{
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

 const RegisterForm = ({user}: {user: User}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
    const form = useForm<z.infer<typeof UserFormValidation>>({
      resolver: zodResolver(UserFormValidation),
      defaultValues: {
        name: "",
        email: "",
        phone: ""
       
      },
    });
    // Define submit handler
     const onSubmit = async ({name, email, phone}: z.infer<typeof UserFormValidation>) => {
        setIsLoading(true)
     try {
       const userData = {
        name,
        email,
        phone
       }
       const user = await createUser(userData)

       if (user) router.push(`/patients/${user.$id}/register`)
     } catch (error) {
        console.log(error)
     }
    }
  
    return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
       <h1 className="header">Welcome 👋 </h1>
       <p className="text-dark-700">Let us know more about yourself</p>
        </section>
        <section className="space-y-6">
         <div className="mb-9 space-y-1">
         <h2 className="sub-header">Personal Information</h2>
         </div>
        </section>
       <CustomFormField 
       fieldType= {FormFieldType.INPUT}
       name="name"
       label="Full Name"
       placeholder="Abdul"
       iconSrc="/assets/icons/user.svg"
       iconAlt="user"
       control= {form.control}/>
       <div className="flex flex-col gap-6 xl:flex-row">
       <CustomFormField 
       fieldType= {FormFieldType.INPUT}
       name="email"
       label="email"
       placeholder="myemail@gmail.com"
       iconSrc="/assets/icons/email.svg"
       iconAlt="email"
       control= {form.control}/>

      <CustomFormField 
       fieldType= {FormFieldType.PHONE_INPUT}
       name="phone"
       label="Phone Number"
       placeholder="081 123-45671" 
       control= {form.control}/>
       </div>
       <div className="flex flex-col gap-6 xl:flex-row">
       <CustomFormField 
       fieldType= {FormFieldType.DATE_PICKER}
       name="birthday"
       label="Date of Birth"
       control= {form.control}/>

      <CustomFormField  
       fieldType= {FormFieldType.SKELETON}
       name="gender"
       label="Gender"
        renderSkeleton={(field) => ( 
            <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                 onValueChange={field.onChange}
                 defaultValue={field.value}
                 >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                     <RadioGroupItem value={option} id={option} />
                     <Label htmlFor={option} className="cursor-pointer">
                      {option}
                     </Label>
                    </div>
                  ))}
                </RadioGroup>
            </FormControl>
        )}
       control= {form.control}/>
       </div>
       <div className="flex flex-col gap-6 xl:flex-row">
        
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        
        </div>
 
        <SubmitButton isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
    )
}   
     
       export default RegisterForm;
