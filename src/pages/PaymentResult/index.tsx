import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { addBookingRequest } from '../../apis/booking.api';
import Spinner from 'react-bootstrap/Spinner';
import './style.css';

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
            setStatus('Thanh toán thành công, vui lòng kiểm tra email !');
        }).catch(err => console.log(err));
    }, []);
    return <div className='transaction-success-page'>
        <div className='card'>
            {status === 'Vui lòng chờ...' && <Spinner animation='border' role='status'/>}
            {status !== 'Vui lòng chờ...' && <div>
                <div style={{ borderRadius: 200, height: 200, width: 200, background: '#F8FAF5', margin: '0 auto' }}>
                    <i className='checkmark'>✓</i>
                </div>
                <h1>Success</h1></div>}
            <p>{status}<br /></p>
        </div>
    </div>;
}

export default PaymentResult;
