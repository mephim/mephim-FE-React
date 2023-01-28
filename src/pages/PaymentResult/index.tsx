import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addBookingRequest } from '../../apis/booking.api';

function PaymentResult() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [status, setStatus] = useState<string>('Vui lòng chờ...');

    useEffect(() => {
        const paymentOtherInfo: string = params.get('vnp_OrderInfo') || '';
        const user = '' + paymentOtherInfo.split('__')[1];
        const seatIds: string[] = ('' + paymentOtherInfo.split('__')[2]).split('_') || [];
        const ticketId = '' + paymentOtherInfo.split('__')[3];
        addBookingRequest(user, seatIds.map(Number), Number(ticketId)).then(res => {
            console.log('Add booking successful: ', res);
            setStatus('Thanh toán thành công, vui lòng kiểm tra email');
        }).catch(err => console.log(err));
    },[]);
    return <span>{status}</span>;
}

export default PaymentResult;
