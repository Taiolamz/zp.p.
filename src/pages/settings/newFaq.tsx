import { useState, useEffect } from 'react';
import { AppContainer, NewFaqAtom, ActivityActionModal } from '../../atoms';
import { routesPath } from '../../utils';
import { useNavigate } from 'react-router';
import { NewAppContainer } from './style';
// import { notificationRecipents } from './data';
// import { H5 } from '../../styles';
import { createFaqRequest, createFaqReset } from '../../redux/slice';
import { images } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

const { SETTINGS } = routesPath;

function NewFaq() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formvalues, setFormvalues] = useState<any>({});

  // redux state
  const createFaqState = useAppSelector(state => state.createFaq);
  const { status: createFaqStatus } = createFaqState;

  // api faq response
  useEffect(() => {
    if (createFaqStatus === 'succeeded') {
      setIsModalVisible(true);
    }
  }, [createFaqStatus]);

  // console.log(formvalues);
  const onClick = () => {
    const { solution, question, activePlatform } = formvalues;
    dispatch(
      createFaqRequest({
        question: question,
        propose_solution: solution,
        active_platform: activePlatform,
        status: 'active',
        tag_id: 'faa91bf8-ee64-40e4-8488-052e18c6f710',
      }),
    );
  };

  const handleSuccssModalClose = () => {
    setIsModalVisible(false);
    dispatch(createFaqReset());
  };
  return (
    <AppContainer goBack={() => navigate(SETTINGS)} navTitle={`App Contents`} navHelper="FAQ'S | NEW FAQ">
      <div>
        <NewAppContainer>
          <NewFaqAtom setFormvalues={setFormvalues} onClick={onClick} />
        </NewAppContainer>

        <ActivityActionModal
          actionClick={handleSuccssModalClose}
          closeModal={handleSuccssModalClose}
          isModalVisible={isModalVisible}
          text={`You have successfully create a new App Notification`}
          actionText="Close"
          image={images.check}
        />
      </div>
    </AppContainer>
  );
}

export default NewFaq;
