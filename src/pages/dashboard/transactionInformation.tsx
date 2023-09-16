import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { BsFilter } from 'react-icons/bs';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { Oval } from 'react-loader-spinner';
import DatePicker from 'react-multi-date-picker';
import { useNavigate } from 'react-router-dom';
import { AppContainer, MetricLabel } from '../../atoms';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { getTransactionVolume } from '../../redux/slice';
import { Dictionary } from '../../types';
import { colors, formatRMDatePicker, routesPath } from '../../utils';
import numberFormat from '../../utils/numberFormat';
const { DASHBOARD } = routesPath;


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
    title: 'Electricity',
    color: '#FFD60A'
  },
  {
    id: 5,
    title: 'Airtime & Data Bills',
    color: '#981EF8'
  },
  {
    id: 6,
    title: 'Contactless payment',
    color: '#2DBD9B'
  },
  {
    id: 7,
    title: 'Other bills(cable,betting,etc)',
    color: '#1EEBF8'
  },

]

const payload: Dictionary = {
  start_date: "",
  end_date: "",
}

const apiFeatures = ['cash_requests', 'other_banks_transfers', 'zojapay_transfers', 'electricity_bills', 'airtime_and_data_bills', 'contactless_payments', 'other_bills']

const TransactionInformation = () => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [showFilter, setShowFilter] = useState(false)
  const startDateRef = useRef<any>(null)
  const endDateRef = useRef<any>(null)
  const [chartData, setChartData] = useState<any>({
    series: [{
      name: '',
      data: [0, 0, 0, 0, 0, 0, 0]
    }],
    options: {
      chart: {
        height: 550,
        type: 'bar',
        events: {
          click: function (chart: any, w: any, e: any) {
            // console.log(chart, w, e)
          }
        },
        toolbar: {
          show: false,
        }
      },
      colors: appFeatures.map((data: any) => data.color),
      labels: appFeatures.map((data: any) => data.title),
      plotOptions: {
        bar: {
          columnWidth: '26%',
          distributed: true,
          borderRadius: 5,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: appFeatures.map((data: any) => data.title),
        labels: {
          style: {
            colors: colors,
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        show: true,
        title: {
          text: 'Amount (millions)'
        }
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return `₦${numberFormat(val)}`
          }
        }
      }
    },
  })
  const [chartKey, setChartKey] = useState(0);
  const { data, status, error } = useAppSelector(state => state.transaction_volume)

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const initialValues: Dictionary = {
    start_date: '',
    end_date: '',
  }

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
    }
  })

  useEffect(() => {
    dispatch(getTransactionVolume(payload))
  }, [])

  const handleFilterChart = () => {
    dispatch(getTransactionVolume(values))
  }

  useEffect(() => {
    if (status === "succeeded") {
      const chartSeriesData = apiFeatures.map((d) => Number(data[d]?.transaction_volume))
      let series = chartData.series
      series[0].data = chartSeriesData
      setChartData({ ...chartData, series: series })
      setChartKey(chartKey + 1)
    }
  }, [status])

  return (
    <div>
      <AppContainer goBack={() => navigate(DASHBOARD)} navTitle={`DASHBOARD`} navHelper={<>
        <h4 className='tw-uppercase tw-my-0 tw-text-[#323348] tw-text-xs md:tw-text-2xl'>Transaction Information</h4>
      </>}
        navBarContentRight={
          <div className='tw-flex tw-items-center tw-gap-x-3 md:tw-gap-x-10 md:tw-mr-6'>
            {/* <span className='tw-text-[#5B6871] tw-text-sm'>Date Range</span> */}
            <div className={`tw-flex tw-items-center tw-gap-x-5 tw-p-1 tw-px-3`}>
              <div className={`${showFilter ? 'tw-absolute tw-top-16 tw-right-6 tw-bg-white tw-p-3 tw-shadow-zojaShadowThree' : 'tw-hidden'}  tw-flex-co tw-gap-x-6 md:tw-flex`}>
                <div className='tw-border tw-text-[11.3px] tw-text-gray-400 tw-p-[9px] tw-px-7 tw-rounded-[4px] tw-flex tw-gap-5 tw-relative md:tw-px-8'>
                  <span className={`${startDate && 'tw-text-gray-600 tw-font-normal'}`}>{startDate !== null ? formatRMDatePicker(startDate) : 'Start Date'}</span> <span className='tw-text-lg tw-text-isPrimary tw-cursor-pointer' onClick={() => startDateRef.current.openCalendar()}><MdOutlineEditCalendar /> </span>
                  <DatePicker
                    onClose={() => {
                      values.start_date = formatRMDatePicker(startDate)
                    }}
                    value={startDate}
                    ref={startDateRef}
                    containerClassName="tw-absolute tw-bottom-2 tw-w-[1rem] tw-text-md tw-hidden -tw-mt-7"
                    inputClass="tw-bg-inherit tw-outline-none tw-hidden"
                    onChange={(date: any) => {
                      setStartDate(date)
                      values.start_date = formatRMDatePicker(startDate)
                    }}
                  />
                </div>
                <div className={`${showFilter && 'tw-mt-3 md:tw-mt-0'} tw-border tw-text-[11.3px] tw-text-gray-400 tw-p-[9px] tw-px-7 tw-rounded-[4px] tw-flex tw-gap-5 tw-relative md:tw-px-8`}>
                  <span className={`${endDate && 'tw-text-gray-600 tw-font-normal'}`}>{endDate !== null ? formatRMDatePicker(endDate) : 'End Date'}</span> <span className='tw-text-lg tw-text-isPrimary tw-cursor-pointer' onClick={() => endDateRef.current.openCalendar()}><MdOutlineEditCalendar /> </span>
                  <DatePicker
                    onClose={() => { values.end_date = formatRMDatePicker(endDate) }}
                    value={endDate}
                    ref={endDateRef}
                    containerClassName="tw-absolute tw-bottom-2 tw-w-[1rem] tw-text-md tw-hidden -tw-mt-7"
                    inputClass="tw-bg-inherit tw-outline-none tw-hidden"
                    onChange={(date: any) => {
                      setEndDate(date)
                      values.end_date = formatRMDatePicker(endDate)
                    }}
                  />
                </div>

                <div className={`${showFilter ? 'tw' : 'tw-hidden'} tw-items-center tw-gap-x-1 tw-text-sm tw-text-[#5B6871] tw-flex tw-justify-center tw-mt-2 tw-p-2 tw-rounded-md tw-h-fit tw-px-4 tw-bg-gray-200 tw-cursor-pointer md:tw-mt-0`} onClick={() => {
                  handleFilterChart()
                  setShowFilter(false)
                }}>
                  <span className='tw-text-lg tw-font-medium'><BsFilter /></span>
                  <span className='tw-font-normal tw-tracking-wide'>Filter</span>
                </div>
              </div>
              <div className='tw-hidden tw-items-center tw-gap-x-1 tw-text-sm tw-text-[#5B6871] tw-p-2 tw-rounded-md tw-px-4 tw-bg-gray-200 tw-cursor-pointer md:tw-flex' onClick={handleFilterChart}>
                <span className='tw-text-lg tw-font-medium'><BsFilter /></span>
                <span className='tw-font-normal tw-tracking-wide'>Filter</span>
              </div>

              <span className='tw-text-lg tw-font-medium tw-border tw-p-2 tw-px-4 tw-bg-gray-200 tw-rounded-md tw-text-[#5B6871] md:tw-hidden' onClick={() => setShowFilter(!showFilter)}><BsFilter /></span>
            </div>
            {/* <NotificationIcon onClick={() => setShowNotificationModal(true)} /> */}
          </div>
        }
      >
        <section className='tw-p-2 tw-mt-4'>
          {
            status !== 'loading' && status === 'succeeded' && (
              <>
                <div className="tw-grid tw-grid-cols-1 tw-gap-2 md:tw-flex tw-gap-x-2 tw-justify-between tw-items-center">
                  <div className='tw-grid tw-gap-2 tw-grid-cols-2 md:tw-flex tw-gap-x-4 tw-justify-between'>
                    <MetricLabel
                      title='Amount Transacted'
                      total={Number(data.total_transaction_volume)}
                      currencySymbol='₦'
                    />
                    <MetricLabel
                      title='Total Revenue'
                      total={Number(data.total_revenue)}
                      currencySymbol='₦'
                    />
                    <MetricLabel title='Total Transactions' total={Number(data.total_transactions_count)} />
                  </div>
                  <span className='tw-bg-[#DDDFF7] tw-text-xs tw-font-normal tw-text-[#162082] tw-rounded-xl tw-p-2 tw-px-3 tw-cursor-pointer tw-w-fit md:tw-text-sm'>Export Page</span>
                </div>
                <section className='tw-mt-4'>
                  <div className="tw-flex md:tw-justify-end">
                    <div className='tw-mt-4 tw-grid tw-grid-cols-2 tw-gap-3 md:tw-grid-cols-4 md:tw-w-[80%] md:tw-gap-x-3'>
                      {
                        appFeatures.map(({ id, title, color }: any) => (
                          <span key={id} className='tw-flex tw-items-center tw-gap-x-1 tw-text-[10px] tw-text-[#5E6366] md:tw-text-[14px]'> <span className='tw-w-7 tw-h-2 tw-rounded-full' style={{ backgroundColor: color }}></span> <span className='tw-text-[#162082]'>{title}</span> </span>
                        ))
                      }
                    </div>
                  </div>
                  <div id="chart" className='tw-mt-6'>
                    <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={550} />
                  </div>
                </section>
              </>
            )
          }
          {
            status === 'loading' && (
              <>
                <div className='tw-h-[60vh] tw-flex tw-justify-center tw-items-center'>
                  <Oval
                    height="80"
                    width="80"
                    color="#222b88cf"
                    ariaLabel="tail-spin-loading"
                    secondaryColor='#222b882b'
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              </>
            )
          }
          {
            status === 'failed' && (
              <div className='tw-flex tw-justify-center tw-items-center tw-h-full'>
                <h4 className='tw-text-gray-500 tw-text-xl'>No Record Found</h4>
              </div>
            )
          }
        </section>
      </AppContainer>
    </div>
  );
};

export default TransactionInformation;
