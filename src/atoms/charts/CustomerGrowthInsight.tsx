import React, { useEffect, useRef, useState } from 'react'
import { MdClose, MdOutlineEditCalendar } from 'react-icons/md'
import { ZojaSelect } from '../../components/tailwind'
import yearRange from '../../utils/yearRange'
import ReactApexChart from 'react-apexcharts'
import { Dictionary } from '../../types'
import { AiOutlineClose } from 'react-icons/ai'
import { BsFilter } from 'react-icons/bs'
import { BiChevronDown } from 'react-icons/bi'
import { Oval } from 'react-loader-spinner'
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks'
import { getCustomerGrowthInsight } from '../../redux/slice'
import numberFormat from '../../utils/numberFormat'


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const monthOptions = Object.values(months.map((month: any) => {
    return {
        label: month,
        value: month
    }
}))

const currentMonth = (new Date()).getMonth() + 1
const currentYear = (new Date()).getFullYear();
const yearsFrom = yearRange(currentYear, 2022, -1)

const yearOptions = Object.values(yearsFrom.map((year: any) => {
    return {
        label: year,
        value: year
    }
}))


const secondarySelector: any = {
    Daily: [
        {
            label: 'Select Week',
            value: ''
        },
        {
            label: 'Week 1',
            value: 'Week 1'
        },
        {
            label: 'Week 2',
            value: 'Week 2'
        },
        {
            label: 'Week 3',
            value: 'Week 3'
        },
        {
            label: 'Week 4',
            value: 'Week 4'
        },
        {
            label: 'Week 5',
            value: 'Week 5'
        },
    ],
    Weekly: [
        {
            label: 'Select Month',
            value: ''
        },
        ...monthOptions

    ],
    Monthly: [
        {
            label: 'Select Year',
            value: ''
        },
        ...yearOptions
    ]
}

const primarySelector: any = [
    {
        label: 'Daily',
        value: 'Daily'
    },
    {
        label: 'Weekly',
        value: 'Weekly'
    },
    {
        label: 'Monthly',
        value: 'Monthly'
    },
]

const CustomerGrowthInsight = () => {
    const dispatch = useAppDispatch()
    // destructure customer growth insight data from store
    const { data: { total_customers, new_customer_count, growth, insights }, status, error } = useAppSelector(state => state.customer_growth_insight)

    const [selectedOption, setSelectedOption] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily')
    const [filterBy, setFilterBy] = useState<Dictionary>({
        frequency: 'daily',
        week: 1,
        month: currentMonth,
        year: currentYear
    })
    const [categoriesData, setCategoriesData] = useState<Dictionary>({
        Daily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        Weekly: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        Monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    })
    const [seriesData, setSeriesData] = useState<Dictionary>({
        Daily: [0, 0, 0, 0, 0, 0, 0],
        Weekly: [0, 0, 0, 0, 0],
        Monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    })
    const [showCustomerGrowthInsightFilter, setShowCustomerGrowthInsight] = useState<boolean>(false)
    const [loading, setLoading] = useState<Boolean>(false)
    // let timer = useRef<any>()

    // set chart key to rerender the chart on state change
    // Increment the chart key by 1 on option change
    const [chartKey, setChartKey] = useState(0);

    // initialiaze chart data
    const [chartData, setChartData] = useState<any>({
        series: [{
            name: '',
            data: [0, 0, 0, 0, 0, 0, 0],
        }],
        options: {
            chart: {
                type: 'bar',
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '45%',
                    endingShape: 'rounded',
                    colors: {
                        // backgroundBarColors: ['#FFAF56'],
                    },
                },
            },
            colors: [
                "#FFAF56",
            ],
            // labels: appFeatures.map((data: any) => data.title),
            dataLabels: {
                enabled: true,
                style: {
                    position: 'absolute',
                    top: 0,
                }
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yaxis: {
                show: false,
                title: {
                    // text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val: any) {
                        return val
                    }
                }
            }
        },
    })

    // filter input change handler
    const handleFilterChange = (data: any) => {
        const { key, value } = data
        if (key === 'year') {
            setFilterBy({ ...filterBy, year: value })
        }
        if (key === 'month') {
            let monthValue = months.findIndex(m => m === value) + 1
            // console.log(monthValue)
            setFilterBy({ ...filterBy, month: monthValue })
        }
        if (key === 'week') {
            let weekValue = secondarySelector.Daily.findIndex((d: any) => d.value === value)
            setFilterBy({ ...filterBy, week: weekValue })
        }
    }
    // filter customer growth insight handler
    const handleFilterCustomerGrowthInsight = () => {
        // if (filterBy.frequency === 'daily') {
        dispatch(getCustomerGrowthInsight(filterBy))
        // }
        setFilterBy({ ...filterBy, frequency: 'daily' })
        setLoading(true)
        setShowCustomerGrowthInsight(false)
    }

    useEffect(() => {
        if (selectedOption) {
            // reset filter fields on change of frequency
            if (showCustomerGrowthInsightFilter) {
                let resetFilter = { week: '', month: '', year: '' }
                setFilterBy({ ...filterBy, frequency: selectedOption.toLowerCase(), ...resetFilter })
            }

        }
    }, [selectedOption])

    useEffect(() => {
        dispatch(getCustomerGrowthInsight(filterBy))
    }, [])

    // update chart data with payload data
    useEffect(() => {
        if (status === 'succeeded') {
            const values = insights.map((d: any) => d.customer_count)
            let series = chartData.series
            series[0].data = values
            setChartData({ ...chartData, series: series, options: { ...chartData.options, xaxis: { ...chartData.options.xaxis, categories: categoriesData[selectedOption] } } })
            setChartKey(chartKey + 1)
        }
    }, [status])

    return (
        <div className='tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-zojaShadowOne tw-w-full tw-relative tw-overflow-hidden'>
            <div className="tw-flex tw-flex-col tw-gap-y-2 tw-border-b tw-pb-2 tw-justify-between md:tw-flex-row md:tw-gap-y-0 md:tw-items-center">
                <h2 className='tw-text-[#5E6366] tw-font-normal tw-text-sm tw-mb-0 md:tw-text-[1.2rem]'>Customer Growth Insight</h2>

                {status !== 'loading' && <div className="tw-flex tw-gap-x-1 tw-items-center tw-border tw-p-1 tw-px-3 tw-rounded-md tw-cursor-pointer tw-w-fit" onClick={() => setShowCustomerGrowthInsight(!showCustomerGrowthInsightFilter)}>
                    <span className='tw-text-lg'><BsFilter /></span>
                    <span className='tw-text-sm'>Filter</span>
                    <span><BiChevronDown /></span>
                </div>}

            </div>

            {status !== 'loading' &&
                <>
                    {status === 'succeeded' && <>
                        <div className="tw-flex tw-justify-between tw-items-cente tw-mt-2">
                            <div>
                                <span className='tw-text-xs tw-text-[#5E6366]'>Total Customer</span>
                                <h2 className='tw-text-[#222B88] tw-font-normal tw-text-3xl'>{numberFormat(Number(total_customers))}</h2>

                                {growth?.status === 'equal' ?
                                    <span className='tw-text-sm tw-text-[#5E6366]'>No change</span>
                                    : <span className='tw-text-sm tw-text-[#5E6366]'>{growth?.percentage.toFixed(2)}% {growth?.status} in the past {filterBy.frequency === 'daily' ? 'week' : filterBy.frequency === 'weekly' ? 'month' : filterBy.frequency === 'monthly' && 'year'}</span>}

                            </div>
                            <div>
                                <span className='tw-text-xs tw-text-[#5E6366]'>New Customer</span>
                                <h2 className='tw-text-[#222B88] tw-font-normal tw-text-3xl'>{numberFormat(Number(new_customer_count))}</h2>
                            </div>
                        </div>
                        <div className='tw-mt-4'>
                            <ReactApexChart key={chartKey} options={chartData.options} series={chartData.series} type="bar" height={200} />
                        </div>
                    </>}
                    <div className={`${showCustomerGrowthInsightFilter && 'tw-bg-white/0 tw-h-full tw-w-[calc(100vw_-_9.5rem)] tw-absolute tw-left-0 tw-top-0'}`} onClick={() => setShowCustomerGrowthInsight(false)}></div>
                    <div className={`tw-w-[9.5rem] tw-shadow-zojaShadowFive tw-h-full tw-p-3 tw-pt-7 tw-bg-white tw-absolute tw-top-0 tw-right-0 tw-flex tw-flex-col tw-gap-x-3 tw-items-cente tw-flex-wra tw-justify-en tw-gap-y-4 tw-transition-all tw-duration-300 tw-ease-in-out ${showCustomerGrowthInsightFilter ? 'tw-translate-x-0' : 'tw-translate-x-full'}`}>
                        <span className='tw-absolute tw-right-2 tw-top-1 tw-text-xs tw-text-red-400 tw-cursor-pointer' onClick={() => setShowCustomerGrowthInsight(false)}><MdClose /></span>
                        <ZojaSelect
                            options={primarySelector}
                            extraClass='tw-appearance-none tw-p-1 tw-text-xs tw-px- tw-w-32 tw-pr-10 tw-py-1.5 tw-rounded-[3px] tw-bg-[#DDDFF7] tw-text-[#222B88] tw-border-0 tw-cursor-pointer tw-font-thin tw-shadow-zojaShadowFive'
                            showArrown={true}
                            arrowDownClass='tw-top-2.5 tw-right-2 tw-text-[#222B88]'
                            setSelectedOption={setSelectedOption}
                        />
                        <ZojaSelect
                            options={secondarySelector['Daily']}
                            extraClass={`tw-appearance-none tw-p-1 tw-text-xs tw-px- tw-w-32 tw-pr-10 tw-py-1.5 tw-rounded-[3px] tw-text-[#222B88] tw-border-0 tw-cursor-pointer tw-font-normal tw-shadow-zojaShadowFive`}
                            disabled={filterBy.frequency !== 'daily' && true}
                            showArrown={true}
                            arrowDownClass='tw-top-2.5 tw-right-2 tw-text-[#222B88]'
                            setSelectedOption={(data) => handleFilterChange({ key: 'week', value: data })}
                        />
                        <ZojaSelect
                            options={secondarySelector['Weekly']}
                            extraClass={`tw-appearance-none tw-p-1 tw-text-xs tw-px- tw-w-32 tw-pr-10 tw-py-1.5 tw-rounded-[3px] tw-text-[#222B88] tw-border-0 tw-cursor-pointer tw-font-normal tw-shadow-zojaShadowFive`}
                            disabled={filterBy.frequency === 'monthly' && true}
                            showArrown={true}
                            arrowDownClass='tw-top-2.5 tw-right-2 tw-text-[#222B88]'
                            setSelectedOption={(data) => handleFilterChange({ key: 'month', value: data })}
                        />
                        <ZojaSelect
                            options={secondarySelector['Monthly']}
                            extraClass='tw-appearance-none tw-p-1 tw-text-xs tw-px- tw-w-32 tw-pr-10 tw-py-1.5 tw-rounded-[3px] tw-bg-white tw-text-[#222B88] tw-border-0 tw-cursor-pointer tw-font-normal tw-shadow-zojaShadowFive'
                            showArrown={true}
                            arrowDownClass='tw-top-2.5 tw-right-2 tw-text-[#222B88]'
                            setSelectedOption={(data) => handleFilterChange({ key: 'year', value: data })}
                        />
                        <button className='tw-bg-isPrimary tw-text-white tw-p-1.5 tw-px-5 tw-text-xs tw-rounded-lg' onClick={handleFilterCustomerGrowthInsight}>Filter</button>
                        <button className='tw-bg-gray-300 tw-text-white tw-p-1.5 tw-px-5 tw-text-xs tw-rounded-lg' onClick={() => setShowCustomerGrowthInsight(false)}>Close</button>
                    </div>
                </>

            }
            {
                status === 'failed' && (
                    <div className='tw-flex tw-justify-center tw-items-center tw-h-full'>
                        <h4 className='tw-text-gray-500 tw-text-xl'>No Record Found</h4>
                    </div>
                )
            }
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
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
        </div>
    )
}

export default CustomerGrowthInsight