import { useState } from 'react';
import { TextArea } from '../../components';
import { images, colors, showMessage } from '../../utils';
import { ActivityActionModal } from '..';

export interface IProps {
  isModalVisible: boolean;
  closeModal: () => void;
  activityStatus: string;
  actionClicked: () => void;
  setDeactiveMessage: any;
}

function ProfileActivationToggleModal({
  isModalVisible,
  closeModal,
  actionClicked,
  activityStatus,
  setDeactiveMessage,
}: IProps) {
  const [message, setMessage] = useState('');
  const handleCloseModal = () => {
    closeModal();
  };

  const handleActionClicked = () => {
    setDeactiveMessage(message);
    if (activityStatus === 'active' && message.length < 1) {
      showMessage({ type: 'info', message: 'Message is required' });
    } else {
      actionClicked();
    }
  };

  return (
    <div>
      <ActivityActionModal
        actionText={activityStatus === 'active' ? 'Reactivate' : 'Deactivate'}
        title=""
        text={
          activityStatus === 'active'
            ? 'Please Input reason for deactivation'
            : 'Arse tou sure you want to reactivate this user`s profile?'
        }
        isModalVisible={isModalVisible}
        closeModal={handleCloseModal}
        actionClick={handleActionClicked}
        image={activityStatus === 'active' ? images.deactivateUser : images.reactivateUser}
        isLoading={false}
        secondaryActionText={'Cancel'}>
        <div>
          {activityStatus === 'active' && (
            <div style={{ width: '100%' }}>
              <TextArea
                label=""
                name="message"
                placeholder="Type here..."
                value={message}
                onChange={(e: any) => setMessage(e.target.value)}
                backgroundColor={colors.white}
                borderColor={colors.grey}
              />
            </div>
          )}
        </div>
      </ActivityActionModal>
    </div>
  );
}

export default ProfileActivationToggleModal;
