import React, { useEffect, useState } from 'react';
import { Column, Line, Pie } from '@ant-design/plots';
import Card from 'react-bootstrap/Card';
import { EyeOutlined, CaretUpOutlined, CaretDownOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { Divider, Space, Tag, Select } from 'antd';
import './style.css';
import {
    getCategoryStatics,
    getChangeTransactionOnWeek,
    getChangeTransactionOnYear, getMovieStatics,
    getTransactionByMonth,
} from '../../../apis/statis.api';

function Static() {
    const [data1, setData1] = useState<any>([]);
    const [incomeInLastMonth, setIncomeInLastMonth] = useState<number>(0);
    const [top1Booking, setTop1Booking] = useState<any>();
    const [top1Income, setTop1Income] = useState<any>();
    const [incomeInLast2Month, setIncomeInLast2Month] = useState<number>(0);
    const [listTransactionChange, setListTransactionChange] = useState<any>([]);
    const [transactionChangeMode, setTransactionChangeMode] = useState<string>('week');
    const [listCategoryChange, setListCategoryChange] = useState<any>([]);
    const [listCategoryChangeMode, setListCategoryChangeMode] = useState<string>('week');
    const [listMovieStatics, setListMovieStatics] = useState<any>([]);
    const [listMovieStaticsMode, setListMovieStaticsMode] = useState<string>('week');
    console.log('INCOME: ', incomeInLastMonth);
    console.log('INCOME2: ', incomeInLast2Month);
    console.log('listCategoryChange: ', listCategoryChange);
    console.log('top1Booking: ', top1Booking);
    console.log('top1Income: ', top1Income);

    useEffect(() => {
        getTransactionByMonth(1).then(res => {
            console.log(res.data);
            res.data.data.forEach((trans: any) => {
                if (trans.transactionDay === 'TOTAL') {
                    setIncomeInLastMonth(trans.value);
                }
            });
        }).catch(err => console.log(err));

        getTransactionByMonth(2).then(res => {
            console.log(res.data);
            res.data.data.forEach((trans: any) => {
                if (trans.transactionDay === 'TOTAL') {
                    setIncomeInLast2Month(trans.value);
                }
            });
        }).catch(err => console.log(err));

    }, []);

    const getIncomeChange = (): number => {
        return Number(Number((incomeInLastMonth / (incomeInLast2Month - incomeInLastMonth)) * 100).toFixed(0));
    };

    useEffect(() => {
        if(transactionChangeMode === 'week') {
            getChangeTransactionOnWeek().then(res => {
                    setListTransactionChange(res.data.data)
                }
            ).catch(err => console.log(err));
        } else {
            getChangeTransactionOnYear().then(res => {
                    setListTransactionChange(res.data.data)
                }
            ).catch(err => console.log(err));
        }
    },[transactionChangeMode]);

    useEffect(() => {
        if(listCategoryChangeMode === 'week') {
            getCategoryStatics(7).then(res => {
                    setListCategoryChange(res.data.data)
                }
            ).catch(err => console.log(err));
        } else {
            getCategoryStatics(30).then(res => {
                setListCategoryChange(res.data.data)
                }
            ).catch(err => console.log(err));
        }
    },[listCategoryChangeMode]);

    useEffect(() => {
        let numDay;
        if(listMovieStaticsMode === 'week') {
            numDay = 7;
        } else {
            numDay = 30;
        }

        getMovieStatics(numDay).then(res => {
            const top1Income = res.data.data.reduce((max: any, item: any) => max.value > item.value ? max : item);
            const top1Booking = res.data.data.reduce((max: any, item: any) => max.numOfBooking > item.numOfBooking ? max : item);
            setTop1Income({movieName: top1Income.movieName, value: top1Income.value});
            setTop1Booking({movieName: top1Booking.movieName, numOfBooking: top1Booking.numOfBooking});
            setListMovieStatics(res.data.data);
            console.log('RELOAD');
        })
    },[listMovieStaticsMode]);

    const config1: any = {
        data: listTransactionChange,
        padding: 'auto',
        xField: 'transactionDay',
        yField: 'value',
        xAxis: {
            // type: 'timeCat',
            tickCount: listTransactionChange.length,
        },
        smooth: true
    };

    const data = [
        {
            movieName: '家具家电',
            value: 38,
        },
        {
            movieName: '粮油副食',
            value: 52,
        },
    ];
    const config: any = {
        data: listMovieStatics,
        xField: 'movieName',
        yField: 'value',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: '类别',
            },
            sales: {
                alias: '销售额',
            },
        },
    };

    const config2: any = {
        appendPadding: 10,
        data: listCategoryChange,
        angleField: 'numOfBooking',
        colorField: 'categoryName',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
        ],
    };
    return <div className='p-3'>
        <h4>Bảng thống kê</h4>
        <Card body>
            <Select
                defaultValue="week"
                style={{ width: 120 }}
                onChange={(value: string) => {
                    console.log('Value');
                    setListMovieStaticsMode(value)}}
                options={[
                    { value: 'week', label: 'Trong tuần' },
                    { value: 'year', label: 'Trong tháng' }
                ]}
            />
            <div className='mt-12'/>
            <div className='card-item d-flex align-items-center'>
                <Card body style={{ width: 300 }} className='card-1'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div>
                            <h6>Doanh thu 30 ngày qua</h6>
                            <Tag color='green'><h4>{incomeInLastMonth} VND</h4></Tag>
                        </div>
                        <div>
                            {getIncomeChange() > 0 && <CaretUpOutlined className='icon arrow-up-icon scale-2' />}
                            {getIncomeChange() <= 0 && <CaretDownOutlined className='icon arrow-down-icon scale-2' />}
                            <span>{getIncomeChange()} %</span>
                        </div>
                    </div>
                </Card>
                <Card body style={{ width: 300 }} className='ml-12 card-2'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div>
                            <h6>Phim có doanh thu cao nhất tuần</h6>
                            <Tag color='blue'><h4>{top1Income?.movieName}</h4></Tag>
                            <span>{top1Income?.value} VND</span>
                        </div>
                        <div>
                            <DollarCircleOutlined className='icon dollar-icon scale-2' />
                        </div>
                    </div>
                </Card>
                <Card body style={{ width: 300 }} className='ml-12 card-3'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div>
                            <h6>Phim được xem nhiều nhất tuần</h6>
                            <Tag color='orange'><h4>{top1Booking?.movieName}</h4></Tag>
                            <span>{top1Booking?.numOfBooking} vé</span>
                        </div>
                        <div>
                            <EyeOutlined className='icon eye-icon scale-2' />
                        </div>
                    </div>
                </Card>
            </div>
        </Card>
        <div className='card-wrap d-flex align-items-center justify-content-between'>
            <Card body className='mt-12 flex-grow-1'>
                <h5>Biến động doanh thu</h5>
                <Select
                    defaultValue="week"
                    style={{ width: 120 }}
                    onChange={(value: string) => {
                        console.log('Value');
                        setTransactionChangeMode(value)}}
                    options={[
                        { value: 'week', label: 'Trong tuần' },
                        { value: 'year', label: 'Trong năm' }
                    ]}
                />
                <div className='mt-12'/>
                <div>
                    <Line {...config1} />
                </div>
            </Card>
            <Card body className='mt-12 ml-12'>
                <h5>Thể loại phim được yêu thích</h5>
                <Select
                    defaultValue="week"
                    style={{ width: 120 }}
                    onChange={(value: string) => {
                        console.log('Value');
                        setListCategoryChangeMode(value)}}
                    options={[
                        { value: 'week', label: 'Trong tuần' },
                        { value: 'year', label: 'Trong tháng' }
                    ]}
                />
                <div className='mt-12'/>
                <Pie {...config2} />
            </Card>
        </div>
        <Card body className='w-75 mt-12'>
            <h5>Thống kê phim bán chạy theo {listMovieStaticsMode === 'week' ? 'Tuần' : 'Tháng'}</h5>
            <div>
                <Column {...config} />
            </div>
        </Card>
    </div>;
}

export default Static;
