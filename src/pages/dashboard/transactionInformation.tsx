import React, { useState } from 'react';
import { AppContainer } from '../../atoms';
import { BorderedTexts, ChartContainer, ChartWrapper, Container, StatsCount } from './style';
import { BorderedText, ChartLegend, HorizontalInfoCount, TransactionInfoBarChart } from '../../components';
import { colors } from '../../utils';
import { transactionInfoBarData, transactionInformationStats, transactionVolumeChartData } from './data';

const TransactionInformation = () => {
  return (
    <div>
      <AppContainer navTitle="Transaction Information">
        <Container>
          <BorderedTexts>
            <BorderedText backgroundColor={colors.secondary} text="Filter by" color={colors.primary} />
            <BorderedText text="Export Page" backgroundColor={colors.secondary} color={colors.primary} />
          </BorderedTexts>
          <StatsCount>
            {transactionInformationStats.map(item => {
              return (
                <HorizontalInfoCount
                  title={item.title}
                  count={item.count}
                  backgroundColor={item.backgroundColor}
                  type={item.type}
                  countColor={item.countColor}
                />
              );
            })}
          </StatsCount>

          <ChartContainer>
            <ChartLegend data={transactionVolumeChartData} type="withcount" />
            <ChartWrapper>
              <TransactionInfoBarChart data={transactionInfoBarData} />
            </ChartWrapper>
          </ChartContainer>
        </Container>
      </AppContainer>
    </div>
  );
};

export default TransactionInformation;
