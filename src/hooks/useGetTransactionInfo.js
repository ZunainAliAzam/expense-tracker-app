import { useState, useEffect } from 'react';

export const useGetTransactionInfo = () => {

    const [transactions, setTransactions] = useState([])
    const getTransactions = async () => {
        try { 

        } catch (err) { 
            console.error(err); 
        }
    }

    useEffect(() => {
        getTransactions()
    }, [])
    return { transactions }
}