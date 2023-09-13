import { useState } from 'react';
import { AppContainer, NewArticle, NewNotification } from '../../atoms';
import { routesPath } from '../../utils';
import { useNavigate } from 'react-router';
import { Dictionary } from '../../types';
import { NewAppContainer } from './style';
import { notificationRecipents } from './data';
import { createArticleRequest } from '../../redux/slice';
import { useAppDispatch } from '../../redux/redux-hooks';

const { SETTINGS } = routesPath;

function NewArticles() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formvalues, setFormvalues] = useState();
  console.log(formvalues);

  const handleCreateInternalUserModalBtn = (item: Dictionary) => {
    const { content, title, image } = item;
    const payload = {
      // content,
      // title,
      // image,
      title: 'Test Article 2',
      content: 'Content of the Article 2',
      active_platform: 'web',
      status: 'active',
      // image: 'MicrosoftTeams-image.png',
    };
    console.log(payload, 'article');
    dispatch(createArticleRequest(payload));
  };

  return (
    <AppContainer goBack={() => navigate(SETTINGS)} navTitle={`App Contents`} navHelper="ARTICLES | NEW ARTICLES ">
      <NewAppContainer>
        <NewArticle
          // setFormvalues={setFormvalues}
          onSubmit={(item: Dictionary) => handleCreateInternalUserModalBtn(item)}
        />
      </NewAppContainer>
    </AppContainer>
  );
}

export default NewArticles;
