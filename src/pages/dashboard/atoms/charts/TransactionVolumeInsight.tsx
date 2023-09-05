import { MdArrowRightAlt, MdOutlineEditCalendar } from 'react-icons/md'
import StatLabel from '../StatLabel'
import { Dictionary } from '../../../../types'
import { Link } from 'react-router-dom'
import ReactApexChart from 'react-apexcharts'
import { useRef, useState } from 'react'
import { ZojaDatePicker } from '../../../../components/tailwind'
import DatePicker from 'react-multi-date-picker'

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

const TransactionVolumeInsight = () => {
    const datePickerRef = useRef<any>(null)
    const [chartData, setChartData] = useState<any>({
        series: [17, 55, 20, 17, 15, 40, 70],
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
                        return val
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
    return (
        <section className='tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-zojaShadowOne tw-w-full'>
            <div className="tw-flex tw-items-center tw-justify-between md:tw-items-baseline">
                <h2 className='tw-text-[#5E6366] tw-font-normal tw-text-sm tw-mb-0 md:tw-text-[1.2rem]'>Transaction Volume Insight</h2>
                <div className="tw-flex tw-gap-x-2 tw-text-isPrimary tw-cursor-pointer"
                    onClick={() => datePickerRef.current.openCalendar()}
                >
                    <span className='tw-text-[11px] tw-text-[#5E6366]'>Select Time Range</span>
                    <span>
                        <span><MdOutlineEditCalendar /></span>
                        {/* <ZojaDatePicker /> */}
                        <DatePicker
                            ref={datePickerRef}
                            containerClassName=" tw-w-[1rem] tw-text-md tw-hidden -tw-mt-7"
                            inputClass="tw-bg-inherit tw-outline-none tw-hidden"
                        />
                    </span>
                </div>
            </div>
            <section className='tw-flex tw-flex-col tw-justify-between tw-items-cente md:tw-flex-row'>
                <div>
                    <div className='tw-mt-6 tw-flex tw-flex-col tw-gap-y-2'>
                        <span className='tw-text-xs tw-font-normal tw-text-[#5E6366]'>Transaction Volume: <span className='tw-text-[#162082]'>NGN 10,821,000</span></span>
                        <span className='tw-text-xs tw-font-normal tw-text-[#5E6366]'>Transaction Count:  <span className='tw-text-[#162082]'>2,378</span></span>
                    </div>
                    <div className='tw-mt-4 tw-grid tw-grid-cols-2 tw-gap-3'>
                        {
                            appFeatures.map(({ id, title, color }: any) => (
                                <span key={id} className='tw-flex tw-items-center tw-gap-x-1 tw-mt-2 tw-text-[9px] tw-text-[#5E6366]'> <span className='tw-w-2 tw-h-2 tw-rounded-full' style={{ backgroundColor: color }}></span> <span>{title}</span> </span>
                            ))
                        }
                    </div>
                    <Link to="/" className='tw-font-thin tw-flex tw-items-center tw-text-xs tw-no-underline tw-text-[#162082] tw-mt-6 tw-ml-3'> <span className='tw-font-normal'>See More</span> <span className='tw-text-lg'><MdArrowRightAlt /></span>  </Link>
                </div>
                <div className='tw-mx-auto md:tw-w-[50%]'>
                    <div id="chart">
                        <ReactApexChart options={chartData.options} series={chartData.series} type="donut" width={300} />
                    </div>
                </div>
            </section>
        </section>
    )
}

export default TransactionVolumeInsight