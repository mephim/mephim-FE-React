import {useEffect} from "react";
import * as Api from "../../api";

interface ICheckTransactionProp {
    vnp_ResponseCode: string;
}

function CheckTransaction({vnp_ResponseCode} : ICheckTransactionProp) {
    const API_CHECK_PAYMENT = 'http://localhost:9090/check-payment';
    const fetchData = async() => {
        const resultCheck = await Api.post(API_CHECK_PAYMENT, {vnp_ResponseCode})
    }

    useEffect(() => {
        fetchData();
    })
    return <></>;
}

export default CheckTransaction;
