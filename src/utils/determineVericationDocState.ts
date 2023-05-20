import { colors } from '.';
import { Dictionary } from '../types';

const kycVerificationbvn: string = 'bvnselfieverification';
const kycVerificationidentityCard: string = 'identitycardverification';
const kycVerificationCACDocumentVerification: string = 'cacdocumentverification';
const kycVerificationBusinessAddressVerification: string = 'businessaddressverification';

export default function determineVericationDocState(arrLength: number, item: Dictionary, type: string) {
  let result: Dictionary = {};

  if (item.hasOwnProperty(kycVerificationbvn) && type === kycVerificationbvn) {
    result = {
      status: arrLength < 1 ? 'N/A' : item?.bvnselfieverification?.status,
      count: arrLength < 1 ? 0 : item?.bvnselfieverification?.upload_count,
      statusBG:
        arrLength < 1 ? colors.primary : item?.bvnselfieverification?.status === 'approved' ? colors.green : colors.red,
    };
  } else if (item.hasOwnProperty(kycVerificationidentityCard) && type === kycVerificationidentityCard) {
    result = {
      status: arrLength < 1 ? 'N/A' : item?.identitycardverification?.status,
      count: arrLength < 1 ? 0 : item?.identitycardverification?.upload_count,
      statusBG:
        arrLength < 1
          ? colors.primary
          : item?.identitycardverification?.status === 'approved'
          ? colors.green
          : colors.red,
    };
  } else if (
    item.hasOwnProperty(kycVerificationCACDocumentVerification) &&
    type === kycVerificationCACDocumentVerification
  ) {
    result = {
      status: arrLength < 1 ? 'N/A' : item?.cacdocumentverification?.status,
      count: arrLength < 1 ? 0 : item?.cacdocumentverification?.upload_count,
      statusBG:
        arrLength < 1
          ? colors.primary
          : item?.cacdocumentverification?.status === 'approved'
          ? colors.green
          : colors.red,
    };
  } else if (
    item.hasOwnProperty(kycVerificationBusinessAddressVerification) &&
    type === kycVerificationBusinessAddressVerification
  ) {
    result = {
      status: arrLength < 1 ? 'N/A' : item?.businessaddressverification?.status,
      count: arrLength < 1 ? 0 : item?.businessaddressverification?.upload_count,
      statusBG:
        arrLength < 1
          ? colors.primary
          : item?.businessaddressverification?.status === 'approved'
          ? colors.green
          : colors.red,
    };
  } else {
    result = {
      status: 'N/A',
      count: 0,
      statusBG: colors.primary,
    };
  }
  return result;
}
