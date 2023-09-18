import { useState, useEffect } from 'react';
import { AppContainer, NewFaqAtom, ActivityActionModal, LoaderModal } from '../../atoms';
import { routesPath } from '../../utils';
import { useNavigate } from 'react-router';
import { NewAppContainer } from './style';
// import { notificationRecipents } from './data';
// import { H5 } from '../../styles';
import { createFaqRequest, createFaqReset, getTagsRequest } from '../../redux/slice';
import { images } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

const { SETTINGS } = routesPath;

function NewFaq() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formvalues, setFormvalues] = useState<any>({});
  const [tagsData, setTagsData] = useState<any[]>([]);
  // redux state
  const createFaqState = useAppSelector(state => state.createFaq);
  const { status: createFaqStatus } = createFaqState;

  const tagsState = useAppSelector(state => state.getTags);
  const { status: tagsStatus } = tagsState;

  useEffect(() => {
    dispatch(getTagsRequest({}));
  }, []);

  useEffect(() => {
    if (tagsStatus === 'succeeded') {
      let updatedList: any[] = [];

      tagsState?.data?.forEach((item: any, index: number) => {
        updatedList.push({
          label: item?.name,
          value: item?.id,
        });
      });

      setTagsData(updatedList);
    }
  }, [tagsStatus]);

  // api faq response
  useEffect(() => {
    if (createFaqStatus === 'succeeded') {
      setIsModalVisible(true);
    }
  }, [createFaqStatus]);

  // console.log(formvalues);
  const onClick = () => {
    const { solution, question, activePlatform, selectedTags } = formvalues;
    // const dd = {
    //   question: question,
    //   propose_solution: solution,
    //   active_platform: activePlatform,
    //   status: 'active',
    //   tag_id: selectedTags,
    // };
    // console.log(dd, 'dd');
    dispatch(
      createFaqRequest({
        question: question,
        propose_solution: solution,
        active_platform: activePlatform,
        status: 'active',
        tag_id: selectedTags,
      }),
    );
  };

  const handleSuccssModalClose = () => {
    setIsModalVisible(false);
    dispatch(createFaqReset());
    navigate(SETTINGS);
  };
  return (
    <AppContainer goBack={() => navigate(SETTINGS)} navTitle={`App Contents`} navHelper="FAQ'S | NEW FAQ">
      <div>
        <NewAppContainer>
          <NewFaqAtom setFormvalues={setFormvalues} onClick={onClick} tagsList={tagsData} />
        </NewAppContainer>

        <ActivityActionModal
          actionClick={handleSuccssModalClose}
          closeModal={handleSuccssModalClose}
          isModalVisible={isModalVisible}
          text={`You have successfully create a new App Notification`}
          actionText="Close"
          image={images.check}
        />

        <LoaderModal
          isModalVisible={tagsStatus === 'loading' || createFaqStatus === 'loading'}
          text="Loading please wait..."
          closeModal={() => {}}
        />
      </div>
    </AppContainer>
  );
}

export default NewFaq;
