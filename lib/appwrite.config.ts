import * as sdk from "node-appwrite"
export const {
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    PATIENT_COLLECTION_ID,
    DOCTOR_COLLECTION_ID, 
    APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID:BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: END_POINT
} = process.env;

const client = new sdk.Client()
client
.setEndpoint("https://cloud.appwrite.io/v1")
.setProject("6756fd72001403f3419a")
.setKey("standard_2e762a00deba9be5f287f4eb15799e35677b24b1823a81835a2711265ef8e4f42bcf733c9f215a970933cfe22cb6af7c2663db942ba9f54149ea515ab904e2bbf055f694706c90ea02d819a5520b35c6daf7ae20b1dea146b2193e4dd1bfaa5327744fca43e3bdd8db88cf7897b613ad7d543b2e01e691aebde00618b1ae542d")

export const databases = new sdk.Databases(client)
export const storage = new sdk.Storage(client)
export const users = new sdk.Users(client)
export const functions = new sdk.Functions(client)
export const messaging = new sdk.Messaging(client)
