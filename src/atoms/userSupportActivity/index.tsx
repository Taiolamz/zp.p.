import { BorderedText } from '../../components';
import { Dictionary } from '../../types';
import { colors } from '../../utils';
import { Container } from './style';
import { namedViewSubAgents, namedDeactivateProfile, namedReactivateProfile } from '../../pages/users/data';

export interface UserSupportActivityIProps {
  id: number;
  text: string;
  backgroundColor: string;
}

export interface UserSupportActivitiesIProps {
  data: UserSupportActivityIProps[];
  onClick: (item: Dictionary) => void;
  setSelectedItem: any;
  onClickProfileToggle: () => void;
  profileToggleText: string;
  kycLevel: string;
  onClickViewSubAgent: () => void;
}

const UserSupportActivity = ({
  data,
  onClick,
  setSelectedItem,
  onClickProfileToggle,
  onClickViewSubAgent,
  profileToggleText,
  kycLevel,
}: UserSupportActivitiesIProps) => {
  const handleSelectedItem = (item: UserSupportActivityIProps) => {
    setSelectedItem(item);
    onClick(item);
  };
  return (
    <Container>
      {data?.map((item: UserSupportActivityIProps) => (
        <BorderedText
          onClick={() => handleSelectedItem(item)}
          key={item.id}
          text={item.text}
          backgroundColor={item.backgroundColor}
          color={colors.white}
        />
      ))}
      <BorderedText
        onClick={onClickProfileToggle}
        text={profileToggleText}
        backgroundColor={profileToggleText === namedReactivateProfile ? colors.green : colors.red}
        color={colors.white}
      />
      {kycLevel === 'Level 3' && (
        <BorderedText
          onClick={onClickViewSubAgent}
          text={namedViewSubAgents}
          backgroundColor={colors.purpleVariantThree}
          color={colors.white}
        />
      )}
    </Container>
  );
};

export default UserSupportActivity;
