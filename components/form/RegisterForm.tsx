"use client"
import { UserFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { z } from "zod";    
import { Button } from "@/components/ui/button"
import SubmitButton from "../SubmitButton";
import { Form, FormControl} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patients.action";
import { Doctors, GenderOptions, IdentificationTypes } from "@/constatnts";
import { RadioGroupItem } from "../ui/radio-group";
import { RadioGroup } from "../ui/radio-group";
import { Label } from "../ui/label";
import { SelectItem } from "@radix-ui/react-select";
import { constants } from "buffer";
import FileUploader from "../FileUploader";
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
       <CustomFormField 
       fieldType= {FormFieldType.INPUT}
       name="adress"
       label="Adress"
       placeholder="7th Street Taiwo" 
       control= {form.control}/>

       <CustomFormField 
       fieldType= {FormFieldType.INPUT}
       name="occupation"
       label="Occupation"
       placeholder="Sofware Engineer" 
       control= {form.control}/>
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
       fieldType= {FormFieldType.INPUT}
       name="emergencyContact"
       label="Emergen Contact"
       placeholder="Guardinas Name" 
       control= {form.control}/>
 <CustomFormField 
       fieldType= {FormFieldType.INPUT}
       name="emergencyContactNumber"
       label="Emergency ContactNumber"
       placeholder="081 123-45671" 
       control= {form.control}/>
        </div>
        <section className="space-y-6">
         <div className="mb-9 space-y-1">
         <h2 className="sub-header">Medical Information</h2>
         </div>
        </section>

     <CustomFormField  fieldType= {FormFieldType.SELECT}
       name="primaryPhysician"
       label="Primary Physician"
       placeholder="Select a physcian" 
       control= {form.control}>
         {Doctors.map((doctor) => (
          <SelectItem key={doctor.name} value={doctor.name}>
            <div className="flex cursor-pointer items-center gap-2">
               <Image 
               src={doctor.image}
               width={32}
               height={32}
               alt="doctor"
               className="rounded-full border border-dark-500"
               />
               <p>{doctor.name}</p>
            </div>
          </SelectItem>
         ))}
        </CustomFormField>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
       fieldType= {FormFieldType.INPUT}
       name="insuranceProvider"
       label="Insurance Provider"
       placeholder="BlueCross Blue Shield" 
       control= {form.control}/>
       <CustomFormField 
       fieldType= {FormFieldType.INPUT}
       name="insurancePolicyNumber"
       label="Insurance Policy Number"
       placeholder="ABC123-45671" 
       control= {form.control}/>
       </div>
       <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
       fieldType= {FormFieldType.TEXTAREA}
       name="allergies"
       label="Allergis (if any)"
       placeholder="Peanuts, pollen, peniciling"  
       control= {form.control}/>
       <CustomFormField 
       fieldType= {FormFieldType.TEXTAREA}
       name="familyMedicalHistory"
       label="Family Mdical History (if any)"
       placeholder="Mother Had a cancer" 
       control= {form.control}/>
       </div>
       <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
       fieldType= {FormFieldType.TEXTAREA}
       name="pastMedicalHistory"
       label="Past Medical History(if any)"
       placeholder="Appendctomy"  
       control= {form.control}/>
       <CustomFormField 
       fieldType= {FormFieldType.TEXTAREA}
       name="currentMedication"
       label="CurrentMedication (if any)"
       placeholder="Ibroprofin 200mg, Paracetamol (500mg)" 
       control= {form.control}/>
       </div>
       <section className="space-y-6">
         <div className="mb-9 space-y-1">
         <h2 className="sub-header">Identification And Verification</h2>
         </div>
        </section>
      <CustomFormField  fieldType= {FormFieldType.SELECT}
       name="identificationType"
       label="Identification type"
       placeholder="Select an idntification type" 
       control= {form.control}>
         {IdentificationTypes.map((type) => (
          <SelectItem key={type} value={type}>
             {type}
          </SelectItem>
         ))}
        </CustomFormField>
        <CustomFormField 
       fieldType= {FormFieldType.INPUT}
       name="identtificationNumber"
       label="Ident Number"
       placeholder="ABC123-45671" 
       control= {form.control}/>

<CustomFormField  
       fieldType= {FormFieldType.SKELETON}
       name="identificationDocuments"
       label="Identification Documents Scanned Copy"
        renderSkeleton={(field) => ( 
            <FormControl>
           <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
        )}
       control= {form.control}/>
     <section className="space-y-6">
         <div className="mb-9 space-y-1">
         <h2 className="sub-header">Consent And Privacy</h2>
         </div>
        </section>
        
        <CustomFormField  
       fieldType= {FormFieldType.CHECKBOX}
       name="treatmentConsent"
       label="I consent to treatment"
       control={form.control}
       />
         <CustomFormField  
       fieldType= {FormFieldType.CHECKBOX}
       name="disclosureConsent"
       label="I consent to disclosure"
       control={form.control}
       />
         <CustomFormField  
       fieldType= {FormFieldType.CHECKBOX}
       name="privacyConsent"
       label="I consent to privacy policy"
       control={form.control}
       />
        <SubmitButton isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
    )
}   
     
export default RegisterForm;
