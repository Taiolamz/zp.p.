import { useEffect, useState } from 'react';
import { ActivityActionModal, AppContainer, NewArticle, NewNotification } from '../../atoms';
import { images, routesPath } from '../../utils';
import { useNavigate, useParams } from 'react-router';
// import { useParams } from 'react-router-dom';
import { Dictionary } from '../../types';
import { NewAppContainer } from './style';
import { notificationRecipents } from './data';
import { getArticleByIdRequest, updateArticleRequest } from '../../redux/slice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { IPropsInitialValues } from '../../atoms/newArticle';

const { SETTINGS } = routesPath;

function UpdateArticle() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [articleDataList, setArticleDataList] = useState<IPropsInitialValues>();
  const [profileActivationSuccessIsModalVisible, setProfileActivationSuccessIsModalVisible] = useState(false);

  const updateArticleState = useAppSelector(state => state.updateArticle);
  const { status: updateArticleStatus } = updateArticleState;
  const getArticleByIdState = useAppSelector(state => state.getArticleById);
  const { status: getArticleByIdStatus } = getArticleByIdState;

  useEffect(() => {
    dispatch(
      getArticleByIdRequest({
        articleId: id,
      }),
    );
  }, [dispatch, id]);

  const handleUpdateArticleBtn = (item: Dictionary) => {
    const { content, title, image } = item;

    const formData = new FormData();
    formData.append('image', image || getArticleByIdState?.data?.article?.image_url);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('active_platform', 'web');
    formData.append('status', 'active');

    dispatch(updateArticleRequest({ formData, id }));
    console.log(...formData);
  };

  const handleProfileActivationSuccessClose = () => {
    setProfileActivationSuccessIsModalVisible(false);
  };

  useEffect(() => {
    if (updateArticleStatus === 'succeeded') {
      setProfileActivationSuccessIsModalVisible(true);
    }
  }, [updateArticleStatus]);

  useEffect(() => {
    if (getArticleByIdStatus === 'succeeded') {
      const updatedList: any = {
        title: getArticleByIdState?.data?.article?.title,
        content: getArticleByIdState?.data?.article?.content,
        active_platform: getArticleByIdState?.data?.article?.active_platform,
        status: getArticleByIdState?.data?.article?.status,
        image: getArticleByIdState?.data?.article?.image_url,
      };

      setArticleDataList(updatedList);
    }
  }, [getArticleByIdStatus, getArticleByIdState]);

  return (
    <div>
      <AppContainer goBack={() => navigate(SETTINGS)} navTitle={`App Contents`} navHelper="ARTICLES | VIEW ARTICLE ">
        <NewAppContainer>
          <NewArticle
            initialValues={articleDataList}
            // setFormvalues={setFormvalues}
            onSubmit={(item: Dictionary) => handleUpdateArticleBtn(item)}
          />
        </NewAppContainer>
      </AppContainer>
      <ActivityActionModal
        isModalVisible={profileActivationSuccessIsModalVisible}
        closeModal={handleProfileActivationSuccessClose}
        actionClick={handleProfileActivationSuccessClose}
        image={images.check}
        isLoading={false}
        actionText="Close"
        title=""
        text={updateArticleStatus === 'succeeded' ? 'Article has been successfuly updated' : ''}
      />
    </div>
  );
}

export default UpdateArticle;
