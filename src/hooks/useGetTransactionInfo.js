import { useState, useEffect } from 'react';
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"

export const useGetTransactionInfo = () => {

    const { userID } = useGetUserInfo()
    const transactionCollectionRef = collection(db, "transactions")

    const [transactions, setTransactions] = useState([])
    const [transactionsTotal, setTransactionsTotal] = useState({ 
        balance: 0.0, 
        expenses: 0.0, 
        income: 0.0 
    })

    const getTransactions = async () => {

        let unsubscribe;

        try {
            const queryTransactions = query(
                transactionCollectionRef,
                where("userID", "==", userID),
                orderBy("createdAt")
            )
            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                const docs = [];
                let totalIncome=0;
                let totalExpenses = 0;
                let totalBalance = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data()
                    const id = doc.id

                    docs.push({ ...data, id })

                    if(data.transactionType === "expense"){
                        totalExpenses += Number(data.transactionAmount)
                    } else {
                        totalIncome += Number(data.transactionAmount)
                    }
                })
                setTransactions(docs);
                
                totalBalance = totalIncome - totalExpenses
                
                setTransactionsTotal({
                    balance:totalBalance,
                    income: totalIncome,
                    expenses: totalExpenses
                })
            })

            return () => { unsubscribe() }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getTransactions()
    }, [])

    return { transactions, transactionsTotal}
}