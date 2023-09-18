import { useEffect, useState } from 'react';
import { ActivityActionModal, AppContainer, LoaderModal, NewArticle } from '../../atoms';
import { images, routesPath } from '../../utils';
import { useNavigate, useParams } from 'react-router';
// import { useParams } from 'react-router-dom';

import { Dictionary } from '../../types';
import { NewAppContainer } from './style';
import { getArticleByIdRequest, updateArticleRequest, updateArticleReset } from '../../redux/slice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { IPropsInitialValues } from '../../atoms/newArticle';
import { object, string } from 'yup';

const { SETTINGS } = routesPath;

function UpdateArticle() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const [articleDataList, setArticleDataList] = useState<IPropsInitialValues>();
  const [isProfileActivationSuccessModalVisible, setIsProfileActivationSuccessModalVisible] = useState(false);

  const updateArticleState = useAppSelector(state => state.updateArticle);
  const { status: updateArticleStatus } = updateArticleState;

  const getArticleByIdState = useAppSelector(state => state.getArticleById);
  const { status: getArticleByIdStatus, data: getArticleData } = getArticleByIdState;

  useEffect(() => {
    dispatch(getArticleByIdRequest({ articleId: id }));
  }, [dispatch, id]);

  const handleUpdateArticleBtn = (item: Dictionary) => {
    const { content, title, image } = item;
    const typeOfImage = typeof image;

    const formData = new FormData();
    typeOfImage === 'object' && formData.append('image', image || getArticleData?.article?.image_url);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('active_platform', 'web');
    formData.append('status', 'active');
    formData.append('_method', 'PUT');

    dispatch(updateArticleRequest({ formData, id }));
  };

  const handleProfileActivationSuccessClose = () => {
    setIsProfileActivationSuccessModalVisible(false);
  };

  useEffect(() => {
    if (updateArticleStatus === 'succeeded') {
      setIsProfileActivationSuccessModalVisible(true);
      dispatch(updateArticleReset());
    }
  }, [dispatch, updateArticleStatus]);

  useEffect(() => {
    if (getArticleByIdStatus === 'succeeded' && getArticleData?.article) {
      const { title, content, active_platform, status, image_url } = getArticleData.article;
      const updatedList: IPropsInitialValues = { title, content, active_platform, status, image: image_url };
      setArticleDataList(updatedList);
    }
  }, [getArticleByIdStatus, getArticleData]);

  return (
    <div>
      <AppContainer goBack={() => navigate(SETTINGS)} navTitle={`App Contents`} navHelper="ARTICLES | VIEW ARTICLE ">
        <NewAppContainer>
          {articleDataList && (
            <NewArticle
              initialValues={articleDataList}
              onSubmit={item => handleUpdateArticleBtn(item)}
              requestStatus={updateArticleStatus}
            />
          )}
        </NewAppContainer>
      </AppContainer>
      <LoaderModal
        isModalVisible={getArticleByIdStatus === 'loading'}
        text="Loading please wait..."
        closeModal={() => {}}
      />
      <ActivityActionModal
        isModalVisible={isProfileActivationSuccessModalVisible}
        closeModal={handleProfileActivationSuccessClose}
        actionClick={handleProfileActivationSuccessClose}
        image={images.check}
        isLoading={false}
        actionText="Close"
        title=""
        text={'Article has been successfuly updated'}
      />{' '}
    </div>
  );
}
export default UpdateArticle;
