import React, { useEffect, useState } from 'react'
import { MdOutlineEditCalendar } from 'react-icons/md'
import { ZojaSelect } from '../../../../components/tailwind'
import yearRange from '../../../../utils/yearRange'
import ReactApexChart from 'react-apexcharts'
import { Dictionary } from '../../../../types'


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',]

const monthOptions = Object.values(months.map((month: any) => {
    return {
        label: month,
        value: month
    }
}))

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

const CustomerGrowthInsight = () => {
    const [selectedOption, setSelectedOption] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily')
    const [secondaryOptions, setSecondaryOptions] = useState([])

    const [chartData, setChartData] = useState<any>({

        series: [{
            name: '',
            data: [30, 25, 87, 56, 61, 58, 63, 60, 66]
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
            labels: appFeatures.map((data: any) => data.title),
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
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
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
                        return "₦ " + val + " thousands"
                    }
                }
            }
        },


    })


    useEffect(() => {
        if (selectedOption) {
            setSecondaryOptions(secondarySelector[selectedOption])
        }
    }, [selectedOption])

    return (
        <div className='tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-zojaShadowOne tw-w-full'>
            <div className="tw-flex tw-flex-col tw-gap-y-2 tw-border-b tw-pb-2 tw-justify-between md:tw-flex-row md:tw-gap-y-0 md:tw-items-center">
                <h2 className='tw-text-[#5E6366] tw-font-normal tw-text-sm tw-mb-0 md:tw-text-[1.2rem]'>Customer Growth Insight</h2>
                <div className="tw-flex tw-gap-x-2 tw-text-isPrimary">
                    <ZojaSelect
                        options={primarySelector}
                        extraClass='tw-appearance-none tw-p-1 tw-text-xs tw-px- tw-w-28 tw-pr-10 tw-py-1.5 tw-rounded-[3px] tw-bg-[#DDDFF7] tw-text-[#222B88] tw-border-0 tw-cursor-pointer tw-font-thin tw-shadow-zojaShadowFive'
                        showArrown={true}
                        arrowDownClass='tw-top-2.5 tw-right-2 tw-text-[#222B88]'
                        setSelectedOption={setSelectedOption}
                    />
                    <ZojaSelect
                        options={secondaryOptions}
                        extraClass='tw-appearance-none tw-p-1 tw-text-xs tw-px- tw-w-32 tw-pr-10 tw-py-1.5 tw-rounded-[3px] tw-bg-white tw-text-[#222B88] tw-border-0 tw-cursor-pointer tw-font-normal tw-shadow-zojaShadowFive'
                        showArrown={true}
                        arrowDownClass='tw-top-2.5 tw-right-2 tw-text-[#222B88]'
                        setSelectedOption={() => null}
                    />
                </div>
            </div>
            <div className="tw-flex tw-justify-between tw-items-center tw-mt-2">
                <div>
                    <span className='tw-text-xs tw-text-[#5E6366]'>Total Customer</span>
                    <h2 className='tw-text-[#222B88] tw-font-normal tw-text-3xl'>5,234</h2>
                    <span className='tw-text-sm tw-text-[#5E6366]'>3% growth in the past year</span>
                </div>
                <div>
                    <span className='tw-text-xs tw-text-[#5E6366]'>New Customer</span>
                    <h2 className='tw-text-[#222B88] tw-font-normal tw-text-3xl'>2,164</h2>
                </div>
            </div>
            <div className='tw-mt-4'>
                <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={200} />
            </div>
        </div>
    )
}

export default CustomerGrowthInsight