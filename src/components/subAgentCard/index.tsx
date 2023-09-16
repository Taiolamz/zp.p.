import { ActiveContainer, Avatar, DetailsContainer, NameDateContainer, SubAgentCardContainer } from './style';
import { H2, H3, H4 } from '../../styles';
import { colors } from '../../utils';

export interface SubAgentIPropsIprops {
  id: number | string;
  name: string;
  dateAdded: string;
  active: boolean;
}

export interface SubAgentIProps {
  data: SubAgentIPropsIprops[];
}

function SubAgentCard({ data }: SubAgentIProps) {
  return (
    <>
      {data?.map(agent => {
        return (
          <SubAgentCardContainer key={agent.id}>
            <DetailsContainer>
              <Avatar>{agent.name.match(/\b(\w)/g)?.join('')}</Avatar>

              <NameDateContainer>
                <H2 lightBold left>
                  {agent.name}
                </H2>
                <H3 left>{agent.dateAdded}</H3>
              </NameDateContainer>
            </DetailsContainer>
            <ActiveContainer backgroundColor={agent.active ? '#0099681a' : '#fd00001a'}>
              <H4 semiBold color={agent.active ? colors.green : colors.red}>
                {agent.active ? 'Active' : 'Inactive'}
              </H4>
            </ActiveContainer>
          </SubAgentCardContainer>
        );
      })}
    </>
  );
}

export default SubAgentCard;
