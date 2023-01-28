import React from 'react';
import ReactPlayer from 'react-player';

interface IProp {
    videoSrc?: string;
}

function Trailer({ videoSrc }: IProp) {
    return <div className='d-flex align-content-center align-items-center'>
        <ReactPlayer playing={true} controls={true} width='800px' url={videoSrc} />
    </div>;
}

export default Trailer;
