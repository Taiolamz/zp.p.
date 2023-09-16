import { useEffect, useRef, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { MdArrowRightAlt, MdOutlineEditCalendar } from 'react-icons/md'
import DatePicker from 'react-multi-date-picker'
import { Link } from 'react-router-dom'
import { Dictionary } from '../../types'
import { routesPath } from '../../utils'
import numberFormat from '../../utils/numberFormat'
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks'
import { getTransactionVolume } from '../../redux/slice'
import { Oval } from 'react-loader-spinner'

const appFeatures: Dictionary = [
    {
        id: 1,
        title: 'Cash requests/provision',
        color: '#05F300'
    },
    {
        id: 2,
        title: 'Transfer-other banks',
        color: '#FF6C02'
    },
    {
        id: 3,
        title: 'Transfer-Zojapay',
        color: '#EBC500'
    },
    {
        id: 4,
        title: 'Other bills(cable,betting,etc)',
        color: '#1EEBF8'
    },
    {
        id: 5,
        title: 'Airtime & Data Bills',
        color: '#981EF8'
    },
    {
        id: 6,
        title: 'Contactless payment(NFC,QR)',
        color: '#2DBD9B'
    },
    {
        id: 7,
        title: 'Electricity',
        color: '#FFD60A'
    },
]

const apiFeatures = ['cash_requests', 'other_banks_transfers', 'zojapay_transfers', 'other_bills', 'airtime_and_data_bills', 'contactless_payments', 'electricity_bills']

interface IProps {
    data: Dictionary
}

const payload: Dictionary = {
    start_date: "",
    end_date: "",
}

const TransactionVolumeInsight = () => {
    const datePickerRef = useRef<any>(null)
    const [chartData, setChartData] = useState<any>({
        series: [1, 1, 1, 1, 1, 1, 1],
        height: 300,
        options: {
            chart: {
                type: 'donut',
            },
            legend: {
                show: false,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '75%'
                    }
                }
            },
            colors: appFeatures.map((data: any) => data.color),
            labels: appFeatures.map((data: any) => data.title),
            dataLabels: {
                style: {
                    fontSize: '9px',
                    fontWeight: 'normal',
                },
            },
            stroke: {
                show: true,
                colors: undefined,
                width: 2,
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300,
                        },
                        legend: {
                            show: false,
                        }
                    }
                },
            ],
            tooltip: {
                y: {
                    formatter: function (val: any) {
                        return numberFormat(val)
                    },
                    title: {
                        formatter: function (seriesName: any) {
                            return seriesName
                        }
                    }
                }
            },
        },
    })
    const [chartKey, setChartKey] = useState(0);
    const [activeData, setActiveData] = useState({ transactionVolume: '', transactionCount: '' })
    const { TRANSACTIONINFORMATION } = routesPath
    const { data, status, error } = useAppSelector(state => state.transaction_volume)
    // const { total_volume, total_count } = data

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTransactionVolume(payload))
    }, [])

    useEffect(() => {
        if (status === "succeeded") {
            const chartSeriesData = apiFeatures.map((d) => Number(data[d]?.transaction_volume))
            setChartData({ ...chartData, series: chartSeriesData })
            setChartKey(chartKey + 1)

            setActiveData({transactionVolume: data.total_transaction_volume, transactionCount: data.total_transactions_count})
            // console.log(chartSeriesData)
        }
    }, [status])

    return (
        <section className='tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-zojaShadowOne tw-w-full'>
            <div className="tw-flex tw-items-center tw-justify-between md:tw-items-baseline">
                <h2 className='tw-text-[#5E6366] tw-font-normal tw-text-sm tw-mt-4 tw-mb-0 md:tw-text-[1.2rem]'>Transaction Volume Insight</h2>
                {/* <div className="tw-flex tw-gap-x-2 tw-text-isPrimary tw-cursor-pointer"
                    onClick={() => datePickerRef.current.openCalendar()}
                >
                    <span className='tw-text-[11px] tw-text-[#5E6366]'>Select Time Range</span>
                    <span>
                        <span><MdOutlineEditCalendar /></span>
                        <DatePicker
                            ref={datePickerRef}
                            containerClassName=" tw-w-[1rem] tw-text-md tw-hidden -tw-mt-7"
                            inputClass="tw-bg-inherit tw-outline-none tw-hidden"
                        />
                    </span>
                </div> */}
            </div>
            <section className='tw-flex tw-flex-col tw-justify-between tw-items-cente tw-relative md:tw-flex-row'>
                {status !== 'loading' &&
                    <>
                        {status === 'succeeded' && <>
                            <div>
                                <div className='tw-mt-6 tw-flex tw-flex-col tw-gap-y-2'>
                                    <span className='tw-text-xs tw-font-normal tw-text-[#5E6366]'>Transaction Volume: <span className='tw-text-[#162082]'>NGN {numberFormat(Number(activeData.transactionVolume), true)}</span></span>
                                    <span className='tw-text-xs tw-font-normal tw-text-[#5E6366] tw-mt-1'>Transaction Count:  <span className='tw-text-[#162082]'>{numberFormat(Number(activeData.transactionCount))}</span></span>
                                </div>
                                <div className='tw-mt-4 tw-grid tw-grid-cols-2 tw-gap-3'>
                                    {
                                        appFeatures.map(({ id, title, color }: any) => (
                                            <span key={id} className='tw-flex tw-items-center tw-gap-x-1 tw-mt-2 tw-text-[9px] tw-text-[#5E6366]'> <span className='tw-w-2 tw-h-2 tw-rounded-full' style={{ backgroundColor: color }}></span> <span>{title}</span> </span>
                                        ))
                                    }
                                </div>
                                <Link to={TRANSACTIONINFORMATION} className='tw-font-thin tw-flex tw-items-center tw-text-xs tw-no-underline tw-text-[#162082] tw-mt-6 tw-ml-3'> <span className='tw-font-normal'>See More</span> <span className='tw-text-lg'><MdArrowRightAlt /></span>  </Link>
                            </div>
                            <div className='tw-mx-auto tw-mt-6 md:tw-w-[50%]'>
                                <div id="chart">
                                    <ReactApexChart options={chartData.options} series={chartData.series} type="donut" width={300} />
                                </div>
                            </div>
                        </>}
                    </>
                }
                {
                    status === 'failed' && (
                        <div className='tw-flex tw-justify-center tw-items-center tw-h-full'>
                            <h4 className='tw-text-gray-500 tw-text-xl'>No Record Found</h4>
                        </div>
                    )
                }
                {status === 'loading' &&
                    <div className="tw-flex tw-place-content-center tw-w-full tw-items-center tw-justify-center tw-h-[38vh]">
                        {
                            status === 'loading' && <Oval
                                height={60}
                                width={60}
                                color="#222b88cf"
                                wrapperStyle={{}}
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#222b882b"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                            />
                        }
                    </div>
                }
            </section>
        </section>
    )
}

export default TransactionVolumeInsight