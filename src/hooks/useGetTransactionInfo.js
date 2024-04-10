import { useState, useEffect } from 'react';
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"

export const useGetTransactionInfo = () => {

    const { userID } = useGetUserInfo()
    const transactionCollectionRef = collection(db, "transactions")

    const [transactions, setTransactions] = useState([])
    const getTransactions = async () => {

        let unsubscribe;

        try {
            const queryTransactions = query(
                transactionCollectionRef,
                where("userID", "==", userID),
                orderBy("createdAt")
            )
            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                const docs = []

                snapshot.forEach((doc) => {
                    const data = doc.data()
                    const id = doc.id

                    docs.push({ ...data, id })
                })

                setTransactions(docs);
            })

            return () => { unsubscribe() }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getTransactions()
    }, [])
    return { transactions }
}