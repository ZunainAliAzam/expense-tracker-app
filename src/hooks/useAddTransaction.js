import {addDoc, collection, serverTimestamp} from "firebase/firestore"
import {db} from '../config/firebase-config'

export const useAddTransaction = () => {

    const transactionCollectionRef = collection(db, "Transactions")

    const AddTransaction = async () => {
        await addDoc(transactionCollectionRef,{
            userID:"",
            description:"",
            transactionAmount:0,
            transactionTypes:"",
            createdAt:serverTimestamp()
        })
    }
    return {AddTransaction}
}