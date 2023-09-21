import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Input, Picker, RichText, Button } from '../../components';
import { AppContainer, NewFaqAtom, ActivityActionModal, LoaderModal } from '../../atoms';
import { routesPath } from '../../utils';
import { useNavigate } from 'react-router';
import { NewAppContainer } from './style';
// import { notificationRecipents } from './data';
// import { H5 } from '../../styles';
import { H2 } from '../../styles';
import { createFaqRequest, createFaqReset, getTagsRequest } from '../../redux/slice';
import { images, colors, spacing } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

import { ButtonContainer, MiniInputs } from '../../atoms/newFaqAtom/style';

const { SETTINGS } = routesPath;

function NewFaq() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [tagsData, setTagsData] = useState<any[]>([]);

  const [activePlatform, setActivePlatform] = useState('');
  const [selectedTags, setSelectedTags] = useState('');

  const [solutionValue, setSolutionValue] = useState('');

  // redux state
  const createFaqState = useAppSelector(state => state.createFaq);
  const { status: createFaqStatus } = createFaqState;

  const tagsState = useAppSelector(state => state.getTags);
  const { status: tagsStatus } = tagsState;

  const schema = yup.object().shape({
    question: yup.string().required('Question is required'),
    solution: solutionValue.length < 2 ? yup.string().required('Content is required') : yup.string(),

    platform: activePlatform.length < 2 ? yup.string().required('Select a platform') : yup.string(),
    tag: selectedTags.length < 2 ? yup.string().required('Select a Tag') : yup.string(),
  });

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

  const handleSuccssModalClose = () => {
    setIsModalVisible(false);
    dispatch(createFaqReset());
    navigate(SETTINGS);
  };

  return (
    <AppContainer goBack={() => navigate(SETTINGS)} navTitle={`App Contents`} navHelper="FAQ'S | NEW FAQ">
      <div>
        <NewAppContainer>
          {/* <NewFaqAtom setFormvalues={setFormvalues} onClick={onClick} tagsList={tagsData} /> */}

          <Formik
            initialValues={{
              question: '',
              platform: '',
              tag: '',
              solution: '',
            }}
            enableReinitialize={true}
            validationSchema={schema}
            onSubmit={async (values, { setSubmitting }) => {
              const { question, tag, platform, solution } = values;

              dispatch(
                createFaqRequest({
                  question: question,
                  propose_solution: solutionValue,
                  active_platform: activePlatform,
                  status: 'active',
                  tag_id: selectedTags,
                }),
              );

              setSubmitting(false);
            }}>
            {formikProps => {
              const { handleChange, values, handleSubmit, errors } = formikProps;
              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <H2 left bold style={{ marginBottom: spacing.small }}>
                      New FAQ
                    </H2>
                    <Input
                      label="Frequently Asked Question"
                      backgroundColor={colors.white}
                      borderColor={colors.grey}
                      placeholder="Enter  Question"
                      type="text"
                      value={values?.question}
                      name={'question'}
                      onChange={handleChange}
                      error={errors.question}
                    />

                    <RichText
                      selectedValue={setSolutionValue}
                      error={errors.solution}
                      placeholderText={'Enter answer to the FAQ'}
                      label={'Prosposed Solution'}
                    />

                    <MiniInputs>
                      <Picker
                        error={errors.platform}
                        label="Select a Platform"
                        selectedValue={setActivePlatform}
                        marginBottom="0"
                        options={[
                          { label: 'App', value: 'app' },
                          { label: 'Web', value: 'web' },
                        ]}
                      />
                    </MiniInputs>

                    <div style={{ marginBottom: spacing.large }}>
                      {/* this is for the listings */}
                      <Picker
                        width={100}
                        error={errors.tag}
                        label="Select a Tag"
                        selectedValue={setSelectedTags}
                        marginBottom="0"
                        options={tagsData}
                      />
                    </div>

                    <ButtonContainer>
                      <Button type="submit" text="Create Item" />
                      <Button
                        onClick={() => navigate(SETTINGS)}
                        text="Cancel"
                        disabled={false}
                        secondary
                        backgroundColor="red"
                        borderColor="transparent"
                        color={colors.primary}
                        boxShadow="none"
                      />
                    </ButtonContainer>
                  </div>
                </form>
              );
            }}
          </Formik>
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
