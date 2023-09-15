import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { AppContainer, ActivityActionModal, LoaderModal } from '../../atoms';
import { routesPath, colors, spacing } from '../../utils';
import { useNavigate } from 'react-router';
import { NewAppContainer } from './style';
import { TextArea, Input, Picker, Button } from '../../components';
import { H2 } from '../../styles';
import { createFaqRequest, createFaqReset, getTagsRequest } from '../../redux/slice';
import { images } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

import * as yup from 'yup';

import { ButtonContainer, MiniInputs } from '../../atoms/newFaqAtom/style';

const { SETTINGS } = routesPath;

function EditFaq() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formvalues, setFormvalues] = useState<any>({});
  const [tagsData, setTagsData] = useState<any[]>([]);

  const [activePlatform, setActivePlatform] = useState('');
  const [selectedTags, setSelectedTags] = useState('');
  // redux state
  const createFaqState = useAppSelector(state => state.createFaq);
  const { status: createFaqStatus } = createFaqState;

  const tagsState = useAppSelector(state => state.getTags);
  const { status: tagsStatus } = tagsState;

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
    if (createFaqStatus === 'succeeded') {
      setIsModalVisible(true);
    }
  }, [createFaqStatus]);

  // console.log(formvalues);
  const onClick = () => {
    const { solution, question, activePlatform, selectedTags } = formvalues;
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
          {/* <NewFaqAtom setFormvalues={setFormvalues} onClick={onClick} tagsList={tagsData} /> */}
          <Formik
            initialValues={{
              question: '',
              solution: '',
              platform: '',
              tag: '',
            }}
            enableReinitialize={true}
            validationSchema={schema}
            onSubmit={async (values, { setSubmitting }) => {
              const { question, solution } = values;
              setFormvalues({
                question,
                solution,
                activePlatform,
              });
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

                    <TextArea
                      label="Prosposed Solution"
                      backgroundColor={colors.white}
                      borderColor={colors.grey}
                      placeholder="Enter answer to the FAQ"
                      value={values.solution}
                      name={'solution'}
                      onChange={handleChange}
                      error={errors.solution}
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
                      <Button type="submit" text="Create Item" onClick={onClick} />
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
          text={`You have successfully edit the FAQ`}
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

export default EditFaq;
