import { useEffect, useState } from 'react';
import { AppContainer, ActivityActionModal, CountInfo, LoaderModal, MoreIconView } from '../../atoms';
import {
  articleDataHeader,
  faqData,
  faqDataHeader,
  notificationData,
  notificationDataHeader,
  settingsCountData,
} from './data';

import { colors, dateFormat, images, routesPath, yearDateFormat } from '../../utils';
import { BorderedText, FaqTable, NotificationTable, Pagination, SearchInput } from '../../components';
import { Dictionary } from '../../types';
import { NotificationTop, TableContainer } from './style';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { deleteArticleRequest, getArticlesRequest } from '../../redux/slice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

import { getAllFaqsRequest, getAllFaqsReset, deleteFaqRequest, deleteFaqReset } from '../../redux/slice';

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

const beforeDeleteAction = 'Delete';
const afterDeleteAction = 'Close';

function Settings() {
  const dispatch = useAppDispatch();

  const [selectedSettingsCard, setSelectedSettingsCard] = useState<Dictionary>({});
  const [searchValue, setSearchValue] = useState('');
  const pageSize = 10;
  const [isSearching, setIsSearching] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [transactionDataList, setTransactionDataList] = useState<any[]>([]);
  const [articlesDataList, setArticlesDataList] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any>({});
  const [deleteIsModalVisible, setDeleteIsModalVisible] = useState(false);
  const [actionText, setActionText] = useState(beforeDeleteAction);

  const [faqsData, setFaqsData] = useState<any[]>([]);
  const [currentPageFaq, setCurrentPageFaq] = useState(1);
  const [totalPagesFaq, setTotalPagesFaq] = useState(5);

  const [selectedNotificationText, setSelectedNotificationText] = useState('');
  const [selectedFaqData, setSelectedFaqData] = useState<Dictionary>({});
  const [isDeleteFaqModalVisible, setIsDeleteFaqModalVisible] = useState(false);

  const viewDetails = 'View Details';
  const deleteEntry = 'Delete Entry';
  const moreIconOption = [viewDetails, deleteEntry];

  const [moreIsVisible, setMoreIsVisible] = useState(false);

  // redux state
  const articlesState = useAppSelector(state => state.getArticles);
  const { status: getArticlesStatus } = articlesState;

  const deleteArticleState = useAppSelector(state => state.deleteArticle);
  const { status: deleteArticleStatus } = deleteArticleState;

  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const objectLength = Object.keys(selectedSettingsCard).length;

  // redux state
  const faqsState = useAppSelector(state => state.getAllFaqs);
  const { status: faqsStatus } = faqsState;

  const deleteFaqState = useAppSelector(state => state.deleteFaq);
  const { status: deletedFaqStatus } = deleteFaqState;

  // api faq
  useEffect(() => {
    dispatch(getAllFaqsRequest({}));
  }, []);

  useEffect(() => {
    if (faqsStatus === 'succeeded') {
      let updatedList: any[] = [];

      faqsState?.data?.faqs?.data.forEach((item: any, index: number) => {
        updatedList.push({
          itemId: item.id,
          id: index + 1,
          faqTitle: item?.question,
          helpful: '10',
          notHelpful: '10',
          createdBy: item?.author?.name.length < 2 ? 'N/A' : item?.author?.name,
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
      navigate(`${ARTICLEUPDATE}${selectedArticle.articleId}`);
    }

    if (item === deleteEntry) {
      setMoreIsVisible(false);
      setDeleteIsModalVisible(true);
    }
  };
  const handleMoreIconOptionsFaq = async (item: string) => {
    if (item === viewDetails) {
      navigate(`${FAQUPDATE}${selectedFaqData?.itemId?.toString()}`);
    }
    if (item === deleteEntry) {
      setMoreIsVisible(false);
      setIsDeleteFaqModalVisible(true);
    }
  };

  const handleSelectedFaq = (item: any) => {
    setMoreIsVisible(true);
    setSelectedFaqData(item);
  };
  const handleDeleteFaq = () => {
    if (deletedFaqStatus === 'succeeded') {
      setIsDeleteFaqModalVisible(false);
      dispatch(deleteFaqReset());
    } else {
      dispatch(
        deleteFaqRequest({
          id: selectedFaqData?.itemId,
        }),
      );
    }
  };
  const handleActionClick = () => {
    if (actionText === beforeDeleteAction && deleteIsModalVisible === true) {
      dispatch(deleteArticleRequest({ articleId: selectedArticle.articleId }));
    } else {
      setActionText(beforeDeleteAction);
      setDeleteIsModalVisible(false);
    }
  };

  const handleCloseModal = () => {
    setActionText(beforeDeleteAction);
    setDeleteIsModalVisible(false);
  };

  useEffect(() => {
    if (deleteArticleStatus === 'succeeded') {
      setActionText(afterDeleteAction);
    }
  }, [deleteArticleStatus]);

  useEffect(() => {
    if (selectedSettingsCard.id === 3) {
      dispatch(
        getArticlesRequest({
          per_page: pageSize,
          page: currentPage,
        }),
      );
    }
  }, [selectedSettingsCard, currentPage, pageSize]);

  useEffect(() => {
    if (getArticlesStatus === 'succeeded') {
      let updatedList: any[] = [];

      articlesState?.data?.articles?.data.forEach((item: any, index: number) => {
        updatedList.push({
          id: index + 1,
          title: item?.title,
          status: item?.status,
          dateCreated: yearDateFormat(item?.created_at),
          timeUpdated: item?.updated_at,
          articleId: item?.id,
          imageUrl: item?.image_url,
          createdBy: item?.author?.name,
        });
      });

      const {
        meta: { links, last_page },
      } = articlesState?.data?.articles;

      setTotalPages(last_page);

      setArticlesDataList(updatedList);
    }
  }, [articlesState]);

  const settingsBoxShadow = '0px 30px 55px 0px rgba(120, 120, 143, 0.10)';

  const handleCloseFaq = () => {
    setIsDeleteFaqModalVisible(false);
    dispatch(deleteFaqReset());
  };

  return (
    <AppContainer navTitle="App Contents" navHelper={selectedSettingsCard?.title}>
      <div>
        <CountInfo
          data={settingsCountData}
          shadow={settingsBoxShadow}
          setSelectedData={setSelectedSettingsCard}
          type="settings"
        />
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
                  getArticlesStatus === 'loading' ||
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
                type="article"
                data={articlesDataList}
                onClick={(item: Dictionary) => setMoreIsVisible(true)}
                setSelectedItem={setSelectedArticle}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={selectedPage => {
                  setCurrentPage(selectedPage);
                }}
                isLoading={getArticlesStatus === 'loading' || articlesDataList?.length < 1}
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
                onClick={(item: Dictionary) => handleSelectedFaq(item)}
              />
              <MoreIconView
                setSelectedText={setSelectedNotificationText}
                isModalVisible={moreIsVisible}
                closeModal={() => setMoreIsVisible(false)}
                options={moreIconOption}
                onClick={item => handleMoreIconOptionsFaq(item)}
              />
              {/* This Modal Promps to delete */}
              <ActivityActionModal
                isLoading={deletedFaqStatus === 'loading'}
                actionClick={handleDeleteFaq}
                closeModal={handleCloseFaq}
                isModalVisible={isDeleteFaqModalVisible}
                text={
                  deletedFaqStatus === 'succeeded'
                    ? 'You have successfully deleted the Faq'
                    : `You have sure you want to delete this notification?`
                }
                actionText={deletedFaqStatus === 'succeeded' ? 'Close' : 'Delete'}
                actionBtnBackgroundColor={deletedFaqStatus === 'succeeded' ? colors.primary : colors.red}
                image={deletedFaqStatus === 'succeeded' ? images.check : images.deactivateUser}
                secondaryActionText={deletedFaqStatus === 'succeeded' ? '' : 'Close'}
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
        <LoaderModal
          isModalVisible={getArticlesStatus === 'loading'}
          text="Loading please wait..."
          closeModal={() => {}}
        />
        <ActivityActionModal
          actionText={actionText}
          title=""
          text={
            actionText === beforeDeleteAction
              ? 'Are you sure you want to delete this record?'
              : 'Record has been successfully deleted'
          }
          isModalVisible={deleteIsModalVisible}
          closeModal={handleCloseModal}
          actionClick={handleActionClick}
          image={actionText === beforeDeleteAction ? images.reject : images.check}
          isLoading={false}
          requestStatus={deleteArticleStatus}
          secondaryActionText={actionText === beforeDeleteAction ? 'Cancel' : ''}
        />
      </div>
    </AppContainer>
  );
}

export default Settings;
