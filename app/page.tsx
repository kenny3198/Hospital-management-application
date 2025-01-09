import PatientForm from "@/components/form/PatientForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* OTP VERICATION // PASSKEY MODAL */}
       <section className="remove-scrollbar container"> 
          <div className="sub-container max-w-[496px]">
             <Image src='/assets/icons/logo-full.svg'
               alt="patients"
                height={1000}
                width={1000}
               className="mb-12 h-10 w-fit"
               />
               <PatientForm/> 
              
              <p className="copyright py-12">2024 careplus</p>
             
              
          </div>
       </section>
       <Image 
       src='/assets/images/onboarding-img.png'
       height={1000}
       width={1000}
       alt="patient"
       className="side-img max-w-[50%]"
       />
    </div>
  );
}
