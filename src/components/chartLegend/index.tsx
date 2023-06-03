import { memo } from 'react';
import { TransactionMainLegend } from './style';
import { FaCircle } from 'react-icons/fa';
import { H4, H5 } from '../../styles';
import { colors } from '../../utils';

export interface ChartLegendIPropsIProps {
  id: number;
  count?: number;
  name: string;
  backgroundColor?: string;
}

export interface ChartLegendIProps {
  data: ChartLegendIPropsIProps[];
  type?: string;
}

function ChartLegend({ data, type }: ChartLegendIProps) {
  return (
    <TransactionMainLegend>
      {data.map(item => {
        return (
          <div key={item.id}>
            <FaCircle color={item.backgroundColor} />
            <H5 left color={colors.primary}>
              {item.name}
            </H5>
            {type === 'withcount' ? (
              <H4 bold left color={colors.primary}>
                {item.count}%
              </H4>
            ) : null}
          </div>
        );
      })}
    </TransactionMainLegend>
  );
}

export default memo(ChartLegend);
