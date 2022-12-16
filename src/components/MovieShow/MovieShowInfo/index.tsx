function MovieShowInfo({movieShowSelected}: any) {
    console.log("receiver: ", movieShowSelected?.movieName)
    return <div>
        <h5>Thông tin phim</h5>
        <p>{movieShowSelected?.movieName}</p>
    </div>
}

export default MovieShowInfo;
