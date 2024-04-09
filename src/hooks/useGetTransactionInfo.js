import { useState, useEffect } from 'react';
import { query, collection, where, orderBy } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"

export const useGetTransactionInfo = () => {

    const { userID } = useGetUserInfo()
    const transactionCollectionRef = collection(db, "transactions")

    const [transactions, setTransactions] = useState([])
    const getTransactions = async () => {
        try {
            const queryTransactions = query(
                transactionCollectionRef, 
                where("userID", "==", userID),
                orderBy("createdAt")
            )
            
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getTransactions()
    }, [])
    return { transactions }
}