import { useState, useEffect } from 'react';
import { AppContainer, CountInfo, MoreIconView, ActivityActionModal } from '../../atoms';
import { articleDataHeader, faqDataHeader, notificationData, notificationDataHeader, settingsCountData } from './data';
import { colors, dateFormat, images, routesPath } from '../../utils';
import { BorderedText, FaqTable, NotificationTable, Pagination, SearchInput } from '../../components';
import { Dictionary } from '../../types';
import { NotificationTop, TableContainer } from './style';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router';

import { getAllFaqsRequest, getAllFaqsReset } from '../../redux/slice';

import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

const emptyListCenterStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const {
  NEWAPPNOTIFICATION,
  EMAILNOTIFICATION,
  NEWARTICLE,
  NEWFAQ,
  APPNOTIFICATIONUPDATE,
  EMAILNOTIFICATIONUPDATE,
  ARTICLEUPDATE,
  FAQUPDATE,
} = routesPath;

function Settings() {
  const dispatch = useAppDispatch();

  const [selectedSettingsCard, setSelectedSettingsCard] = useState<Dictionary>({});
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  // faq
  const [faqsData, setFaqsData] = useState<any[]>([]);
  const [currentPageFaq, setCurrentPageFaq] = useState(1);
  const [totalPagesFaq, setTotalPagesFaq] = useState(5);

  const [selectedNotificationText, setSelectedNotificationText] = useState('');
  const [isDeleteFaqModalVisible, setIsDeleteFaqModalVisible] = useState(false);
  const viewDetails = 'View Details';
  const deleteEntry = 'Delete Entry';
  const moreIconOption = [viewDetails, deleteEntry];

  const [moreIsVisible, setMoreIsVisible] = useState(false);

  const navigate = useNavigate();

  const objectLength = Object.keys(selectedSettingsCard).length;

  // redux state
  const faqsState = useAppSelector(state => state.getAllFaqs);
  const { status: faqsStatus } = faqsState;

  // api faq
  useEffect(() => {
    dispatch(getAllFaqsRequest({}));
  }, []);

  useEffect(() => {
    if (faqsStatus === 'succeeded') {
      let updatedList: any[] = [];

      faqsState?.data?.faqs?.data.forEach((item: any, index: number) => {
        updatedList.push({
          id: index + 1,
          faqTitle: item?.question,
          helpful: '10',
          notHelpful: '10',
          createdBy: item?.tag?.slug,
          dateCreated: dateFormat(item?.created_at),
        });
      });

      const {
        meta: { last_page },
      } = faqsState?.data?.faqs;

      setTotalPagesFaq(last_page);

      setFaqsData(updatedList);
    }
  }, [faqsState]);

  // handle different more icon text
  const handleMoreIconOptionsApp = async (item: string) => {
    if (item === viewDetails) {
      navigate(`${APPNOTIFICATIONUPDATE}`);
    }
  };
  const handleMoreIconOptionsEmail = async (item: string) => {
    if (item === viewDetails) {
      navigate(`${EMAILNOTIFICATIONUPDATE}`);
    }
  };
  const handleMoreIconOptionsArticle = async (item: string) => {
    if (item === viewDetails) {
      navigate(`${ARTICLEUPDATE}`);
    }
  };
  const handleMoreIconOptionsFaq = async (item: string) => {
    if (item === viewDetails) {
      navigate(`${FAQUPDATE}`);
    }
    if (item === deleteEntry) {
      setIsDeleteFaqModalVisible(true);
    }
  };

  const handleDeleteFaq = () => {};

  const handleCloseFaq = () => {
    setIsDeleteFaqModalVisible(false);
  };

  return (
    <AppContainer navTitle="App Contents" navHelper={selectedSettingsCard?.title}>
      <div>
        <CountInfo data={settingsCountData} setSelectedData={setSelectedSettingsCard} type="settings" />
        {objectLength < 1 && (
          <div style={emptyListCenterStyle}>
            <img src={images.emptyList} alt="Empty container" />
          </div>
        )}
        <TableContainer>
          {selectedSettingsCard.id === 1 && (
            <>
              <NotificationTop>
                <BorderedText
                  text="New Notification"
                  backgroundColor={colors.primary}
                  color={colors.white}
                  icon={<AiOutlinePlus color={colors.white} />}
                  onClick={() => navigate(`${NEWAPPNOTIFICATION}`)}
                />
                <SearchInput
                  backgroundColor={colors.white}
                  name="SearchValue"
                  value={searchValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length === 0) {
                      setIsSearching(!isSearching);
                    }
                    setSearchValue(e.target.value);
                  }}
                  placeholder="Search Records"
                />
              </NotificationTop>
              <NotificationTable
                headerData={notificationDataHeader}
                header={true}
                data={notificationData}
                onClick={(item: Dictionary) => setMoreIsVisible(true)}
              />
              {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={selectedPage => {
                  setCurrentPage(selectedPage);
                }}
                isLoading={
                  getTransactionsStatus === 'loading' ||
                  settlementAnalyticsStatus === 'loading' ||
                  transactionDataList?.length < 1
                }
              /> */}
              <MoreIconView
                setSelectedText={setSelectedNotificationText}
                isModalVisible={moreIsVisible}
                closeModal={() => setMoreIsVisible(false)}
                options={moreIconOption}
                onClick={item => handleMoreIconOptionsApp(item)}
              />
            </>
          )}
          {selectedSettingsCard.id === 2 && (
            <>
              <NotificationTop>
                <BorderedText
                  text="New Notification"
                  backgroundColor={colors.primary}
                  color={colors.white}
                  icon={<AiOutlinePlus color={colors.white} />}
                  onClick={() => navigate(`${EMAILNOTIFICATION}`)}
                />
                <SearchInput
                  backgroundColor={colors.white}
                  name="SearchValue"
                  value={searchValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length === 0) {
                      setIsSearching(!isSearching);
                    }
                    setSearchValue(e.target.value);
                  }}
                  placeholder="Search Records"
                />
              </NotificationTop>
              <NotificationTable
                headerData={notificationDataHeader}
                header={true}
                data={notificationData}
                onClick={(item: Dictionary) => setMoreIsVisible(true)}
                // onClick={item => navigate(`${USERDETAILS}${item.userId}`)}
              />
              <MoreIconView
                setSelectedText={setSelectedNotificationText}
                isModalVisible={moreIsVisible}
                closeModal={() => setMoreIsVisible(false)}
                options={moreIconOption}
                onClick={item => handleMoreIconOptionsEmail(item)}
              />
            </>
          )}
          {selectedSettingsCard.id === 3 && (
            <>
              <NotificationTop>
                <BorderedText
                  text="New Article"
                  backgroundColor={colors.primary}
                  color={colors.white}
                  icon={<AiOutlinePlus color={colors.white} />}
                  onClick={() => navigate(`${NEWARTICLE}`)}
                />
                <SearchInput
                  backgroundColor={colors.white}
                  name="SearchValue"
                  value={searchValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length === 0) {
                      setIsSearching(!isSearching);
                    }
                    setSearchValue(e.target.value);
                  }}
                  placeholder="Search Records"
                />
              </NotificationTop>
              <NotificationTable
                headerData={articleDataHeader}
                header={true}
                data={notificationData}
                onClick={(item: Dictionary) => setMoreIsVisible(true)}
              />
              <MoreIconView
                setSelectedText={setSelectedNotificationText}
                isModalVisible={moreIsVisible}
                closeModal={() => setMoreIsVisible(false)}
                options={moreIconOption}
                onClick={item => handleMoreIconOptionsArticle(item)}
              />
            </>
          )}
          {selectedSettingsCard.id === 4 && (
            <>
              <NotificationTop>
                <BorderedText
                  text="New FAQ"
                  backgroundColor={colors.primary}
                  color={colors.white}
                  icon={<AiOutlinePlus color={colors.white} />}
                  onClick={() => navigate(`${NEWFAQ}`)}
                />
                <SearchInput
                  backgroundColor={colors.white}
                  name="SearchValue"
                  value={searchValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length === 0) {
                      setIsSearching(!isSearching);
                    }
                    setSearchValue(e.target.value);
                  }}
                  placeholder="Search Records"
                />
              </NotificationTop>
              <FaqTable
                headerData={faqDataHeader}
                header={true}
                data={faqsData}
                onClick={(item: Dictionary) => setMoreIsVisible(true)}
              />
              <MoreIconView
                setSelectedText={setSelectedNotificationText}
                isModalVisible={moreIsVisible}
                closeModal={() => setMoreIsVisible(false)}
                options={moreIconOption}
                onClick={item => handleMoreIconOptionsFaq(item)}
              />
              <ActivityActionModal
                actionClick={handleDeleteFaq}
                closeModal={handleCloseFaq}
                isModalVisible={isDeleteFaqModalVisible}
                text={`You have sure you want to delete this notification?`}
                actionText="Delete"
                actionBtnBackgroundColor={colors.red}
                image={images.check}
              />
            </>
          )}

          {/* {usersData.length >= 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={selectedPage => {
                    setCurrentPage(selectedPage);
                  }}
                  isLoading={superAgentsStatus === 'loading' || usersStatus === 'loading'}
                />
              )} */}
        </TableContainer>
      </div>
    </AppContainer>
  );
}

export default Settings;
