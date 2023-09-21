import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { AppContainer, ActivityActionModal, LoaderModal } from '../../atoms';
import { routesPath, colors, spacing } from '../../utils';
import { useNavigate, useParams } from 'react-router';
import { NewAppContainer } from './style';
import { TextArea, Input, Picker, Button, RichText } from '../../components';
import { H2 } from '../../styles';
import { updateFaqRequest, updateFaqReset, getTagsRequest, getFaqRequest } from '../../redux/slice';
import { images } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

import * as yup from 'yup';

import { ButtonContainer, MiniInputs } from '../../atoms/newFaqAtom/style';
import { Dictionary } from '../../types';

const { SETTINGS } = routesPath;

function EditFaq() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let { id } = useParams();

  const faqId = id?.trim();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [tagsData, setTagsData] = useState<any[]>([]);
  const [faqData, setFaqData] = useState<Dictionary>({});
  const [activePlatform, setActivePlatform] = useState('');
  const [selectedTags, setSelectedTags] = useState('');
  const [selectedTagName, setSelectedTagName] = useState('');
  const [solutionValue, setSolutionValue] = useState('');
  // redux state
  const faqState = useAppSelector(state => state.getFaq);
  const { status: faqStatus } = faqState;

  const tagsState = useAppSelector(state => state.getTags);
  const { status: tagsStatus } = tagsState;

  const updateFaqState = useAppSelector(state => state.updateFaq);
  const { status: updateFaqStatus } = updateFaqState;

  const schema = yup.object().shape({
    question: yup.string().required('Question is required'),
    solution: yup.string().required('Content is required'),
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
    dispatch(
      getFaqRequest({
        faqId,
      }),
    );
  }, []);

  useEffect(() => {
    if (faqStatus === 'succeeded') {
      setSelectedTagName(faqState?.data?.faq?.tag?.name);
      setActivePlatform(faqState?.data?.faq?.active_platform);
      setSelectedTags(faqState?.data?.faq?.tag?.id);
      setFaqData({
        question: faqState?.data?.faq?.question,
        solution: faqState?.data?.faq?.propose_solution,
      });
    }
  }, [faqStatus]);

  useEffect(() => {
    if (updateFaqStatus === 'succeeded') {
      setIsModalVisible(true);
    }
  }, [updateFaqStatus]);

  const handleSuccssModalClose = () => {
    setIsModalVisible(false);
    dispatch(updateFaqReset());
    navigate(SETTINGS);
  };
  return (
    <AppContainer goBack={() => navigate(SETTINGS)} navTitle={`App Contents`} navHelper="FAQ'S | NEW FAQ">
      <div>
        <NewAppContainer>
          <Formik
            initialValues={{
              platform: activePlatform ? activePlatform : '',
              tag: selectedTagName ? selectedTagName : '',
              question: faqData?.question ? faqData?.question : '',
              solution: faqData?.solution ? faqData?.solution : '',
            }}
            enableReinitialize={true}
            validationSchema={schema}
            onSubmit={async (values, { setSubmitting }) => {
              const { question, solution } = values;

              dispatch(
                updateFaqRequest({
                  question: question,
                  propose_solution: solutionValue,
                  active_platform: activePlatform,
                  status: 'active',
                  tag_id: selectedTags,
                  faqId: faqState?.data?.faq?.id,
                  _method: 'patch',
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
                      // error={errors.question}
                    />

                    <RichText
                      selectedValue={setSolutionValue}
                      error={errors.solution}
                      placeholderText={'Enter answer to the FAQ'}
                      label={'Prosposed Solution'}
                    />

                    <MiniInputs>
                      <Picker
                        // error={errors.platform}
                        placeholder={activePlatform}
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
                        // error={errors.tag}
                        placeholder={selectedTagName}
                        label="Select a Tag"
                        selectedValue={setSelectedTags}
                        marginBottom="0"
                        options={tagsData}
                      />
                    </div>

                    <ButtonContainer>
                      <Button
                        type="submit"
                        text="Update Item"
                        disabled={updateFaqStatus === 'loading' ? true : false}
                      />
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
          text={`You have successfully update the FAQ`}
          actionText="Close"
          image={images.check}
        />

        <LoaderModal
          isModalVisible={tagsStatus === 'loading' || faqStatus === 'loading' || updateFaqStatus === 'loading'}
          text="Loading please wait..."
          closeModal={() => {}}
        />
      </div>
    </AppContainer>
  );
}

export default EditFaq;
