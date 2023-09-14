import { useEffect, useState } from 'react';
import { ActivityActionModal, AppContainer, NewArticle, NewNotification } from '../../atoms';
import { images, routesPath } from '../../utils';
import { useNavigate } from 'react-router';
import { Dictionary } from '../../types';
import { NewAppContainer } from './style';
import { notificationRecipents } from './data';
import { createArticleRequest } from '../../redux/slice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

const { SETTINGS } = routesPath;

function NewArticles() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [profileActivationSuccessIsModalVisible, setProfileActivationSuccessIsModalVisible] = useState(false);

  const createArticleState = useAppSelector(state => state.createArticle);
  const { status: createArticleStatus } = createArticleState;

  const handleCreateArticleBtn = (item: Dictionary) => {
    const { content, title, image } = item;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('active_platform', 'web');
    formData.append('status', 'active');

    dispatch(createArticleRequest(formData));
  };

  const handleProfileActivationSuccessClose = () => {
    setProfileActivationSuccessIsModalVisible(false);
  };

  useEffect(() => {
    if (createArticleStatus === 'succeeded') {
      setProfileActivationSuccessIsModalVisible(true);
    }
  }, [createArticleStatus]);

  return (
    <div>
      <AppContainer goBack={() => navigate(SETTINGS)} navTitle={`App Contents`} navHelper="ARTICLES | NEW ARTICLES ">
        <NewAppContainer>
          <NewArticle
            // setFormvalues={setFormvalues}
            onSubmit={(item: Dictionary) => handleCreateArticleBtn(item)}
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
        text={createArticleStatus === 'succeeded' ? 'Article has been successfuly created' : ''}
      />
    </div>
  );
}

export default NewArticles;
