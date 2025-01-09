"use client"
import { convertFileToUrl } from '@/lib/utils'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Image from 'next/image'
type FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void
}
const FileUploader = ({files, onChange} : FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image src={convertFileToUrl(files[0])} width={1000} height={1000} alt='uploaded image' 
        className='max-h-[400px] overflow-hidden object-cover'/>
      )
     :(
        <>
        <Image src="/asset/icons/upload.svg"
        width={40}
        height={40}
        alt="pload"/>
        <div className="file-upload_label">
            <p className='text-14 regular'>
              <span className='text-green-500'>
                Click to upload
              </span> or drag and drop
            </p>
            <p>SVG, PNG, JPEG, GIF (max 800*400)</p>
        </div> 
        </>
     )}
     
    </div>
  )
}
export default FileUploader