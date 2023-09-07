import { useEffect, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { BsFilter } from 'react-icons/bs';
import { VscBellDot } from 'react-icons/vsc';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { AdvanceFilter, AllUserStat, AppContainer, CustomerGrowthInsight, KycDistributionStat, MetricCard, RightSideMetric, TransactionVolumeInsight } from '../../atoms';
import { NotificationIcon, NotificationModal, SingleNotification } from '../../components';
import { ZojaModal } from '../../components/tailwind';
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

const Dashboard = () => {
  const navigate = useNavigate();
  const [showAdvanceFilter, setShowAdvanceFilter] = useState(false)
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const advanceFilterRef = useRef<any>(null)
  const notificationModalRef = useRef<any>(null)
  let timeRef = useRef<any>(null)

  const handleCloseAdvanceFilterModal = () => setShowAdvanceFilter(false)
  const handleCloseNotificationModal = () => setShowNotificationModal(false)

  useEffect(() => {
    timeRef.current = setTimeout(() => {
      setLoading(false)
    }, 3000);

    return () => clearTimeout(timeRef.current)
  }, [])

  return (
    <AppContainer navBarContentRight={
      <div className='tw-flex tw-items-center tw-gap-x-2 md:tw-gap-x-20'>
        <div className='tw-flex tw-items-center tw-gap-x-2 tw-border tw-p-1 tw-px-3 tw-rounded-md tw-cursor-pointer' onClick={() => setShowAdvanceFilter(true)}>
          <span className='tw-text-[#101828] tw-text-2xl tw-font-semibold'><BsFilter /> </span>
          <span className='tw-hidden tw-text-[#6E7C87] tw-text-sm tw-font-normal md:tw-block'>Advanced Filter</span>
          <span><BiChevronDown /></span>
        </div>
        <NotificationIcon onClick={() => setShowNotificationModal(true)}/>
      </div>
    } navTitle={<span className='tw-ml-3 tw-text-[#5E6366] tw-font-medium md:tw-text-[1.2rem]'
    >Welcome, Bola</span>}>
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
          <section className='tw-flex tw-justify-between tw-gap-8 tw-flex-col md:tw-flex-row'>
            <div className='md:tw-w-[calc(100vw_-_24rem)]'>
              <div className="tw-ml-2 tw-flex tw-gap-4 tw-gap-x-16 tw-flex-wrap tw-mt-4 md:tw-gap-x-24">
                {!loading && <>
                  <MetricCard title='Total Income' total={19990560} subTitle='Transaction Inflow' totalColor='#89CFF0' />
                  <MetricCard title='Total Withdrawal' total={10590000} subTitle='Transaction Outflow' totalColor='#FFAF56' />
                  <MetricCard title='Revenue' total={1450000} subTitle='Transaction Profit' totalColor='#16B45E' />
                </>}
                {loading &&
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
                {!loading && <>
                  <AllUserStat total_user={9300} active_user={7900} inactive_user={1400} ios_download={4000} android_download={5300} conversion_rate={77} />
                  <KycDistributionStat />
                </>}
                {loading &&
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

            <div className='tw-bg-gray-200/20 tw-shadow-zojaShadowThree tw-p-5 tw-rounded-lg md:tw-w-[24rem]'>
              {!loading &&
                <>
                  <RightSideMetric title="Total Cash Requests" subTitleOne="Active Requests" subTitleTwo='Completed Requests' totalOne={400} totalTwo={3400} icon={images.totalCashIcon} />
                  <RightSideMetric title="Total Reconciliation" subTitleOne="Reconciled Credit" subTitleTwo='Reconciled Debits' totalOne={3100} totalTwo={120} icon={images.totalReconciliationIcon} />
                  <RightSideMetric title="Support Tickets" subTitleOne="Pending Tickets" subTitleTwo='Resolved Tickets' totalOne={30} totalTwo={2000} icon={images.supportTicketIcon} />
                  <RightSideMetric title="Agents" subTitleOne="Super Agents" subTitleTwo='Sub Agents' totalOne={60} totalTwo={380} icon={images.agentIcon} hasMarginBottom={false} />
                </>

              }
              {loading && <div className='tw-bg-gray-200/20 tw-flex tw-flex-col tw-gap-y-4 tw-rounded-lg'>
                {Array.from({ length: 3 }, (_, idx) => (
                  <div key={idx} className='tw-w-[100%] md:tw-w-[16.5rem]'>
                    <Skeleton count={4} height={7} borderRadius='0' />
                  </div>
                ))}
              </div>}

            </div>
          </section>
          <section className="tw-flex tw-flex-col tw-gap-y-3 tw-mt-8 md:tw-flex-row md:tw-gap-x-7">
            {!loading && <>
              <TransactionVolumeInsight />
              <CustomerGrowthInsight />
            </>}
            {loading && <div className="tw-flex tw-flex-col tw-gap-y-3 tw-mt-8 md:tw-flex-row md:tw-gap-x-12">
              {Array.from({ length: 2 }, (_, idx) => (
                <div key={idx} className='tw-w-[100%] md:tw-w-[calc(100vw_-_55.5rem)]'>
                  <Skeleton count={8} height={9} borderRadius='0' />
                </div>
              ))}
            </div>}
          </section>
        </section>
      </>

    </AppContainer>
  );
}

export default Dashboard;
