import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from '../config/firebase-config'
import { useGetUserInfo } from "./useGetUserInfo"

export const useAddTransaction = () => {

    const transactionCollectionRef = collection(db, "Transactions")
    const { userID } = useGetUserInfo()

    const AddTransaction = async (
        description,
        transactionAmount,
        transactionTypes,
    ) => {
        await addDoc(transactionCollectionRef, {
            userID,
            description,
            transactionAmount,
            transactionTypes,
            createdAt: serverTimestamp()
        })
    }
    return { AddTransaction }
}