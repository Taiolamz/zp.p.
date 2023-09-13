import { useEffect, useState } from 'react';
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

  // useEffect(() => {
  //   if (getArticlesStatus === 'succeeded') {
  //     let updatedList: any[] = [];

  //     articlesState?.data?.articles?.data.forEach((item: any, index: number) => {
  //       updatedList.push({
  //         id: index + 1,
  //         title: item?.title,
  //         status: item?.status,
  //         dateCreated: yearDateFormat(item?.created_at),
  //         timeUpdated: item?.updated_at,
  //         articleId: item?.id,
  //         imageUrl: item?.image_url,
  //         createdBy: item?.author?.name,
  //       });
  //     });

  //     const {
  //       meta: { links, last_page },
  //     } = articlesState?.data?.articles;

  //     setTotalPages(last_page);

  //     setArticlesDataList(updatedList);
  //   }
  // }, [articlesState]);

  return (
    <AppContainer goBack={() => navigate(SETTINGS)} navTitle={`App Contents`} navHelper="ARTICLES | VIEW ARTICLE ">
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
