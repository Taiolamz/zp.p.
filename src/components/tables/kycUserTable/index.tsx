import { TableTag, TD, TH, TR, TableContainer, ViewContent } from "./style";
import { colors } from "../../../utils";
import { H6 } from "../../../styles";

export interface KycDataTableIPropsIProps {
  id?: number | string;
  isSelected?: boolean;
  userName: string;
  bvn: number | string;
  phoneNo: string | number;
  detailsId?: string;
}

export interface TableIPropsIProps {
  data: KycDataTableIPropsIProps[];
  setSelectedItem?: any;
  backgroundColor?: string;
  header?: boolean;
  headerData?: any;
  onClick: () => void;
}

function KycUserTable({
  data,
  setSelectedItem,
  headerData,
  onClick,
}: TableIPropsIProps) {
  const handleOnSelect = (item: any) => {
    setSelectedItem(item);
    // onClick();
    // setMoreIsVisible(true);
  };

  return (
    <TableContainer>
      <TableTag>
        <tr>
          <TH>#</TH>
          <TH>{headerData.name}</TH>
          <TH>{headerData.bvn}</TH>
          <TH>{headerData.phoneNo}</TH>
          <TH></TH>
        </tr>

        <>
          {data.map((item: KycDataTableIPropsIProps, index: number) => (
            <TR key={index}>
              <TD>{item.id}</TD>
              <TD>{item.userName}</TD>
              <TD>{item.bvn}</TD>
              <TD>{item.phoneNo}</TD>
              <TD>
                <ViewContent onClick={() => handleOnSelect(item)}>
                  <H6 semiBold color={colors.white}>
                    View
                  </H6>
                </ViewContent>
              </TD>
            </TR>
          ))}
        </>
      </TableTag>
    </TableContainer>
  );
}

export default KycUserTable;
