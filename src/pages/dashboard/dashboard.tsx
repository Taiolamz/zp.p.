import { useEffect, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { BsFilter } from 'react-icons/bs';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { AdvanceFilter, AllUserStat, AppContainer, CustomerGrowthInsight, KycDistributionStat, MetricCard, RightSideMetric, TransactionVolumeInsight } from '../../atoms';
import { NotificationIcon, NotificationModal, SingleNotification } from '../../components';
import { ZojaModal } from '../../components/tailwind';
import { useAppDispatch } from '../../redux';
import { useAppSelector } from '../../redux/redux-hooks';
import { getDashboardAnalyticInsight } from '../../redux/slice';
import { Dictionary } from '../../types';
import { images, routesPath } from '../../utils';
const { SETTLEMENTS, USERS, KYC, SUPPORT } = routesPath;

export interface dashboardMainCountDataIProps {
  id: number;
  title: string;
  count: number;
  helperText: string;
  backgroundColor: string;
  color: string;
}

export interface fourBoxesIProps {
  title: string;
  color: string;
  count: number;
  type: string;
  titleColor: string;
}

const payload: Dictionary = {
  start_date: '',
  end_date: '',
  transaction_type: '',
  user_type: '',
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [showAdvanceFilter, setShowAdvanceFilter] = useState(false)
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const advanceFilterRef = useRef<any>(null)
  const notificationModalRef = useRef<any>(null)
  const dispatch = useAppDispatch()

  const handleCloseAdvanceFilterModal = () => setShowAdvanceFilter(false)
  const handleCloseNotificationModal = () => setShowNotificationModal(false)

  const { data: { users, kyc, cash_request, agents, transaction, transaction_volume, support_tickets, reconciliation }, status, error } = useAppSelector(state => state.dashboard)
  const { data: { name } } = useAppSelector(state => state.auth)

  const handlePageRefresh = () => dispatch(getDashboardAnalyticInsight(payload))

  useEffect(() => {
    dispatch(getDashboardAnalyticInsight(payload))
  }, [])

  return (
    <AppContainer navBarContentRight={
      <div className='tw-flex tw-items-center tw-gap-x-2 md:tw-gap-x-20'>
        <div className={`${status === 'succeeded' ? '' : 'tw-hidden'} tw-flex tw-items-center tw-gap-x-2 tw-border tw-p-1 tw-px-3 tw-rounded-md tw-cursor-pointer`} onClick={() => setShowAdvanceFilter(true)}>
          <span className='tw-text-[#101828] tw-text-2xl tw-font-semibold'><BsFilter /> </span>
          <span className='tw-hidden tw-text-[#6E7C87] tw-text-sm tw-font-normal md:tw-block'>Advanced Filter</span>
          <span><BiChevronDown /></span>
        </div>
        <NotificationIcon onClick={() => setShowNotificationModal(true)}/>
      </div>
    } navTitle={<span className='tw-ml-3 tw-text-[#5E6366] tw-text-xs tw-font-medium md:tw-text-[1.2rem]'
    >Welcome, {name}</span>}>
      <>
        <ZojaModal
          show={showAdvanceFilter}
          height='auto'
          position='right'
          borderRadius='8px'
          handleClose={handleCloseAdvanceFilterModal}
          closeOnClickOutside={true}
          extraClass='md:tw-w-[33.5rem] md:tw-right-72 md:tw-mt-12'
          contentRef={advanceFilterRef}
          children={<AdvanceFilter contentRef={advanceFilterRef} handleClose={handleCloseAdvanceFilterModal} />}
        />

        <ZojaModal
          show={showNotificationModal}
          height='full'
          position='right'
          handleClose={handleCloseNotificationModal}
          extraClass='tw-w-[18rem] md:tw-w-[25rem]'
          closeOnClickOutside={true}
          contentRef={notificationModalRef}
          children={
            <NotificationModal
              title='Notification'
              contentRef={notificationModalRef}
              handleClose={handleCloseNotificationModal}
              children={<div>
                <SingleNotification
                  title="Ticket Response Received"
                  content="Your Ticket with Item Number #12345 has gotten a response from the assigned staff, click this message to go and view this ticket action"
                  createdAt="06-06-2022"
                />
                <SingleNotification
                  title="New Live Message"
                  content="New Live message received from Adebayo Tijani"
                  createdAt="06-06-2022"
                  isRead={true}
                />
              </div>}
            />}
        />
        <section className='tw-p-2 tw-mb-4 md:tw-p-0 md:tw-pt-8 md:tw-px-4 md:tw-mb-8'>
          <section className={`${status === 'loading' || status === 'succeeded'} ? '' : 'tw-hidden' `}>
            <section className='tw-flex tw-justify-between tw-gap-8 tw-flex-col md:tw-flex-row'>
              <div className='md:tw-w-[calc(100vw_-_24rem)]'>
                <div className="tw-ml-2 tw-flex tw-gap-4 tw-gap-x-16 tw-flex-wrap tw-mt-4 md:tw-gap-x-24">
                  {status === 'succeeded' && <>
                    <MetricCard title='Total Income' total={Number(transaction.inflow)} subTitle='Transaction Inflow' totalColor='#89CFF0' />
                    <MetricCard title='Total Withdrawal' total={Number(transaction.outflow)} subTitle='Transaction Outflow' totalColor='#FFAF56' />
                    <MetricCard title='Revenue' total={Number(transaction.revenue)} subTitle='Transaction Profit' totalColor='#16B45E' />
                  </>}
                  {status === 'idle' || status === 'loading' &&
                    <div className='tw-flex tw-gap-4 tw-flex-wrap tw-gap-x-10'>
                      {Array.from({ length: 3 }, (_, idx) => (
                        <div key={idx} className='tw-w-[9rem] md:tw-w-[14rem]'>
                          <Skeleton count={4} height={9} borderRadius='0' />
                        </div>
                      ))}
                    </div>
                  }
                </div>
                <div className='tw-mt-6 tw-flex tw-flex-col tw-gap-4 md:tw-flex-row md:tw-gap-x-6 md:tw-mt-16'>
                  {status === 'succeeded' && <>
                    <AllUserStat total_user={Number(users.total_count)} active_user={Number(users.active_count)} inactive_user={Number(users.inactive_count)} ios_download={4000} android_download={5300} conversion_rate={77} />
                    <KycDistributionStat data={kyc} />
                  </>}
                  {status === 'idle' || status === 'loading' &&
                    <div className='tw-flex tw-flex-col tw-gap-4 md:tw-gap-x-10 md:tw-flex-row md:-tw-mt-5 md:tw-ml-2'>
                      {Array.from({ length: 2 }, (_, idx) => (
                        <div key={idx} className='tw-w-[100%] md:tw-w-[22.5rem]'>
                          <Skeleton count={8} height={9} borderRadius='0' />
                        </div>
                      ))}
                    </div>
                  }
                </div>
              </div>

              <div className={`${status === 'failed' && 'tw-hidden'} ${status === 'succeeded' && 'tw-shadow-zojaShadowThree'} tw-bg-gray-200/20 tw-p-5 tw-rounded-lg md:tw-w-[24rem]`}>
                {status === 'succeeded' &&
                  <>
                    <RightSideMetric title="Total Cash Requests" subTitleOne="Active Requests" subTitleTwo='Completed Requests' totalOne={Number(cash_request.active_cash_request_count)} totalTwo={Number(cash_request.completed_cash_request_count)} icon={images.totalCashIcon} />
                    <RightSideMetric title="Total Reconciliation" subTitleOne="Reconciled Credit" subTitleTwo='Reconciled Debits' totalOne={Number(reconciliation.credit_count)} totalTwo={Number(reconciliation.debit_count)} icon={images.totalReconciliationIcon} />
                    <RightSideMetric title="Support Tickets" subTitleOne="Pending Tickets" subTitleTwo='Resolved Tickets' totalOne={Number(support_tickets.pending_count)} totalTwo={Number(support_tickets.resolved_count)} icon={images.supportTicketIcon} />
                    <RightSideMetric title="Agents" subTitleOne="Super Agents" subTitleTwo='Sub Agents' totalOne={Number(agents.super_agents)} totalTwo={Number(agents.sub_agents)} icon={images.agentIcon} hasMarginBottom={false} />
                  </>

                }
                {status === 'idle' || status === 'loading' && <div className='tw-bg-gray-200/20 tw-flex tw-flex-col tw-gap-y-4 tw-rounded-lg'>
                  {Array.from({ length: 3 }, (_, idx) => (
                    <div key={idx} className='tw-w-[100%] md:tw-w-[16.5rem]'>
                      <Skeleton count={4} height={7} borderRadius='0' />
                    </div>
                  ))}
                </div>}

              </div>
            </section>
            <section className="tw-flex tw-flex-col tw-gap-y-3 tw-mt-8 md:tw-flex-row md:tw-gap-x-7">
              {status === 'succeeded' && <>
                <TransactionVolumeInsight />
                <CustomerGrowthInsight />
              </>}
              {status === 'idle' || status === 'loading' && <div className="tw-flex tw-flex-col tw-gap-y-3 tw-mt-8 md:tw-flex-row md:tw-gap-x-12">
                {Array.from({ length: 2 }, (_, idx) => (
                  <div key={idx} className='tw-w-[100%] md:tw-w-[calc(100vw_-_55.5rem)]'>
                    <Skeleton count={8} height={9} borderRadius='0' />
                  </div>
                ))}
              </div>}
            </section>
          </section>
          { status === "failed" &&
          <section className='tw-h-[calc(110vh_-_50vh)] tw-bg-isSmokeWhite tw-flex tw-justify-center tw-items-center'>
            <div className='tw-text-isRed tw-items-center tw-bg-white tw-shadow-sm tw-p-5 tw-w-[90%] tw-mx-auto md:tw-w-7/12'>
              {/* <h6 className='tw-font-normal'>Error! </h6> */}
                <span className="tw-text-6xl tw-block tw-text-center tw-mt-4">🙁</span>
              <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-my-5 tw-mt-6">
                <span className='tw-text-gray-400 tw-block tw-mb-2 tw-text-sm md:tw-text-[15px]'>We encounted an error, click to reload page</span>
                <span className='tw-text-white tw-bg-isPrimary tw-p-2 tw-px-4 tw-block tw-text-sm tw-w-fit tw-rounded-m tw-cursor-pointer' onClick={handlePageRefresh}>Refresh Page</span>
              </div>
            </div>
          </section>

          }
        </section>
      </>

    </AppContainer>
  );
}

export default Dashboard;
