"use server"
import { BUCKET_ID, users } from "../appwrite.config"
import { ID, Query, } from "node-appwrite"
import  InputFile from "node-appwrite/file"
import { parseStringify } from "../utils"
// import InputFile from "node-appwrite/file"
export const createUser = async(user: CreateUserParams) => {
try {
   const newUser = await users.create(ID.unique(), 
    user.email,
    user.phone, 
    undefined, 
    user.name,
 ) 
 console.log(newUser)
} catch (error: any) {
  
if (error && error?.code == 409) {
    const documents = await users.list([
        Query.equal("email", [user.email])
    ])
    return documents.users[0]
}
}
}

export const getUser = async(userId: string) => {
   try {
     const user = await users.get(userId);
     return parseStringify(user);
   } catch (error) {
    console.log(error)
   }
}

export const registerPatients = async({identificationDocument, ...patient}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      )
      file = await Storage.createFile(BUCKET_ID!, ID.unique(), InputFile)
    }
  } catch (error) {
    console.log(error)
  }
}


