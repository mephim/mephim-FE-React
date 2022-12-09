import "./style.css";
import {IMovie} from "../../shared/model/IMovie";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import * as Api from "../../api";
import { formatDate } from "../../common";
import {IShowDate} from "../../shared/model/IShowDate";
import {IShowTimeResponse} from "../../shared/model/response/IShowTimeResponse";

interface DayWrap {
  day: number;
  name: string;
}

interface DateWrap {
  dateDetail: string;
  date: number;
  day: number;
}

interface IProp {
  movie: IMovie;
}

function ChooseShowTimeList({movie} : IProp) {
  const navigate = useNavigate();
  const [listShowDateExist, setListShowDateExist] = useState<IShowDate[]>([]);
  const [listShowTimeExist, setListShowTimeExist] = useState<IShowTimeResponse[]>([]);
  const [dateActive, setDateActive] = useState<number>();
  const findShowDateExist = async () => {
    const response = await Api.get(`http://localhost:9090/api/movie/find-show-date-by-movie?movieId=${movie.movieId}`);
    setListShowDateExist(response.data.showDateList);
  };

  useEffect(()=> {
    findShowDateExist();
  }, []);

  const currentMonth: number = new Date().getMonth() + 1;
  const dayList: DayWrap[] = [
    {day: 0, name: "Chủ nhật"},
    {day: 1, name: "Thứ 2"},
    {day: 2, name: "Thứ 3"},
    {day: 3, name: "Thứ 4"},
    {day: 4, name: "Thứ 5"},
    {day: 5, name: "Thứ 6"},
    {day: 6, name: "Thứ 7"},

  ];
  const dateList: DateWrap[] = [
    {dateDetail: formatDate(new Date(new Date().setDate(new Date().getDate()))) ,date: new Date(new Date().setDate(new Date().getDate())).getDate(),day: new Date(new Date().setDate(new Date().getDate())).getDay()},
    {dateDetail: formatDate(new Date(new Date().setDate(new Date().getDate()+1))) ,date: new Date(new Date().setDate(new Date().getDate()+1)).getDate(),day: new Date(new Date().setDate(new Date().getDate()+1)).getDay()},
    {dateDetail: formatDate(new Date(new Date().setDate(new Date().getDate()+2))) ,date: new Date(new Date().setDate(new Date().getDate()+2)).getDate(),day: new Date(new Date().setDate(new Date().getDate()+2)).getDay()},
    {dateDetail: formatDate(new Date(new Date().setDate(new Date().getDate()+3))) ,date: new Date(new Date().setDate(new Date().getDate()+3)).getDate(),day: new Date(new Date().setDate(new Date().getDate()+3)).getDay()},
    {dateDetail: formatDate(new Date(new Date().setDate(new Date().getDate()+4))) ,date: new Date(new Date().setDate(new Date().getDate()+4)).getDate(),day: new Date(new Date().setDate(new Date().getDate()+4)).getDay()},
    {dateDetail: formatDate(new Date(new Date().setDate(new Date().getDate()+5))) ,date: new Date(new Date().setDate(new Date().getDate()+5)).getDate(),day: new Date(new Date().setDate(new Date().getDate()+5)).getDay()},
    {dateDetail: formatDate(new Date(new Date().setDate(new Date().getDate()+6))) ,date: new Date(new Date().setDate(new Date().getDate()+6)).getDate(),day: new Date(new Date().setDate(new Date().getDate()+6)).getDay()},
  ];

  const findShowTime = async (dateDetail: string) => {
    const showDate = listShowDateExist?.filter((date) => date.date === dateDetail) || [];
    if(showDate.length === 0) {
      setListShowTimeExist([]);
    }
    else {
      const response = await Api.get(`http://localhost:9090/api/movie/find-show-time-by-show-date?movieId=${movie.movieId}&showDateId=${showDate[0].showDateId}`);
      if(response.data === null) {
        setListShowTimeExist([]);
      } else {
        setListShowTimeExist(response.data);
      }
    }

  };

  return (
    <div className="choose-time-list">
      <div className="choose-show-date">
        <h4 className="text-start">Chọn ngày chiếu</h4>
        <h3 className="month text-center mb-16">Tháng {currentMonth}</h3>
        <div className="day-list">
          {dateList.map((dateWrap: DateWrap, index: number) => (
              <div key={index}>
                <span className="d-block text-center">{dayList.filter(dayWrap => dayWrap.day === dateWrap.day)[0].name}</span>
                <span className={`date-element ${dateWrap.date === dateActive ? " active" : ""}`} onClick={(e) => {
                  setDateActive(dateWrap.date);
                  findShowTime(dateWrap.dateDetail);
                }}>{dateWrap.date}</span>
              </div>
          ))}
        </div>
      </div>
      <div className="choose-show-time">
        <h4 className="text-start">Chọn lịch chiếu</h4>
        <div className="show-time-wrap">
          <h5 className="movie-name fw-bold mt-12">{movie.movieName}</h5>
          <div className="show-time-detail">
            <div className="movie-image mr-12">
              <img src={movie.moviePoster} alt="" />
            </div>
            {listShowTimeExist.length === 0 && <h3 className="text-center">Không có lịch chiếu</h3>}
            {listShowTimeExist.length > 0 && <div className="show-time-list">
              {listShowTimeExist.map((item: IShowTimeResponse, index) => (
                  <div className="show-time" key={index} onClick={() => {
                    navigate('/main/seat-selection', {
                      state: {
                        response: {showTimeRes: item, movie},
                      }
                    });
                  }}>
                    <div className="time">
                      <span>{item?.showTime?.time}</span>
                    </div>
                    <div className="room">
                      <span>Phòng chiếu</span>
                      <span>{item?.room?.roomName}</span>
                    </div>
                  </div>
              ))}
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseShowTimeList;
