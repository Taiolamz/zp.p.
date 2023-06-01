import { useState } from 'react';
import { DatePicker, DoughnutChart } from '../../components';
import { H1, H2, H3, H4, H5, H6 } from '../../styles';
import {
  Container,
  TransactionHeader,
  TransactionMain,
  TransactionMainLeft,
  TransactionMainLegend,
  TransactionMainText,
} from './style';
import { colors } from '../../utils';
import { FaCircle } from 'react-icons/fa';

export interface TransactionVolumeIProps {
  transactionVolumeChartData: any[];
}

const TransactionVolume = ({ transactionVolumeChartData }: TransactionVolumeIProps) => {
  const [startDisplayRecordDate, setStartDisplayRecordDate] = useState('');
  return (
    <Container>
      <TransactionHeader>
        <H2 left semiBold>
          Transaction Volume Insight
        </H2>
        <DatePicker selectedDate={setStartDisplayRecordDate} />
      </TransactionHeader>
      <TransactionMain>
        <TransactionMainLeft>
          <TransactionMainText>
            <H5 semiBold left color={colors.primary}>
              Transaction Volume: NGN 10,821,000
            </H5>
            <H5 semiBold left color={colors.primary}>
              Transaction Count : 2,378
            </H5>
          </TransactionMainText>

          <TransactionMainLegend>
            {transactionVolumeChartData.map(item => {
              return (
                <div key={item.id}>
                  <FaCircle color={item.backgroundColor} />
                  <H6 left color={colors.primary}>
                    {item.name}
                  </H6>
                </div>
              );
            })}
          </TransactionMainLegend>
        </TransactionMainLeft>
        <DoughnutChart data={transactionVolumeChartData} />
      </TransactionMain>
    </Container>
  );
};

export default TransactionVolume;
