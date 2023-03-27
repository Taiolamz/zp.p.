import * as yup from "yup";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import { FiFilter } from "react-icons/fi";
import { H3 } from "../../styles";
import {
  CountInfoCard,
  DatePicker,
  BorderedText,
  Pagination,
  SearchInput,
  Modal,
  Picker,
  Input,
  TextArea,
  Button,
} from "../../components";
import {
  SettlementBarChart,
  TabView,
  TransactionsView,
  MoreIconView,
  AppContainer,
} from "../../atoms";
import {
  colors,
  currencyFormat,
  getPathFromPagUrl,
  spacing,
  yearDateFormat,
} from "../../utils";
import {
  AllTransactionContainer,
  AllTransactionContent,
  DateContent,
  InfoCountContainer,
  InfoCountContent,
  TabViewContainer,
  TabContentTwo,
  EscalateFormContainer,
  EscalateBtnContainer,
  CustomerNameContainer,
} from "./style";

import {
  getTransactionsRequest,
  getTransactionsReset,
} from "../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";

const data = [
  {
    id: 1,
    count: 45233333,
    title: "Inflow",
    helper: "Total Income",
    color: colors.blueVariantOne,
  },
  {
    id: 2,
    count: 55000000,
    title: "Outflow",
    helper: "Total Withdrawals",
    color: colors.orange,
  },
  {
    id: 3,
    count: 7000000,
    title: "Profit",
    helper: "Sharing Percentage on Transactions",
    color: colors.greenVariantOne,
  },
];

const tabViewData = [
  { id: 1, isSelected: true, text: "Transactions History" },
  // { id: 2, isSelected: false, text: "Bills History" },
  // { id: 3, isSelected: false, text: "Cash Request History" },
];

const transactionDataHeader = {
  id: "",
  name: "Customer",
  tid: "Transaction ID",
  amount: "Amount",
  type: "Transaction Type",
  status: "Status",
  time: "Date",
};

const billsHistoryData = [
  {
    id: 1,
    tid: "CRIDD44BI",
    amount: 20000,
    type: "Bill payment",
    status: "System Failure",
    time: "24/11/2021- 17:01",
    icon: true,
    name: "Allen Kardic",
  },
  {
    id: 2,
    tid: "CRIDD44BI",
    amount: 20000,
    type: "Bill payment",
    status: "System Failure",
    time: "24/11/2021- 17:01",
    icon: true,
    name: "James Brown",
  },
  {
    id: 3,
    tid: "CRIDD44BI",
    amount: 20000,
    type: "Bill payment",
    status: "System Failure",
    time: "24/11/2021- 17:01",
    icon: true,
    name: "Enoch Yakubu",
  },
];

const billsHistoryHeader = {
  id: "",
  name: "Customer",
  tid: "Transaction ID",
  amount: "Amount",
  type: "Bill Type",
  status: "Status",
  time: "Time",
};

function Reconciliation() {
  const dispatch = useAppDispatch();

  return (
    <AppContainer navTitle='SETTLEMENTS' navHelper='Reconcialtiona'>
      <div>reconcialtion</div>
    </AppContainer>
  );
}

export default Reconciliation;
