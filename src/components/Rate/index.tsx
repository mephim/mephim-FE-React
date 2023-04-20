import React, { useState } from 'react';
import StarsRating from 'react-star-rate';
import './style.css';

interface IRateProps {
    username: string,
    numRate: number;
    content: string;
    isLiked: boolean;
}

function Rate({ username, numRate, content, isLiked }: IRateProps) {
    const [value, setValue] = useState<number>(0);

    return <div>
        <div className='rate-star d-flex align-items-center mt-12'>
            <StarsRating
                value={value}
                onChange={(value) => {
                    if (value) setValue(value);
                }}
            />
            {isLiked && <span className='d-inline-block ml-24'><svg width='24' height='24' fill='none' viewBox='0 0 24 24'
                                                              xmlns='http://www.w3.org/2000/svg'><path
                d='m12.82 5.58-.82.822-.824-.824a5.375 5.375 0 1 0-7.601 7.602l7.895 7.895a.75.75 0 0 0 1.06 0l7.902-7.897a5.376 5.376 0 0 0-.001-7.599 5.38 5.38 0 0 0-7.611 0Z'
                fill='#E84B3C' /></svg><small>Thích bởi Admin</small></span>}
        </div>
        <div>
            <h5 className='d-inline-block text text-info'>{username}<span>:</span></h5>
            <h6 className='d-inline-block ml-12 text text-secondary'>{content}</h6>
        </div>
    </div>;
}

export default Rate;
