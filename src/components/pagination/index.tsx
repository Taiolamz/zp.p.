import { memo } from "react";
import Pagination, {
  bootstrap5PaginationPreset,
} from "react-responsive-pagination";
import { spacing } from "../../utils";
import "./style.css";
interface IProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
  maxWidth?: number;
}

function RPagination({
  totalPages,
  currentPage,
  onPageChange,
  maxWidth,
}: IProps) {
  return (
    <>
      <div style={{ marginTop: spacing.small, marginBottom: spacing.medium }}>
        <Pagination
          {...bootstrap5PaginationPreset}
          total={totalPages}
          current={currentPage}
          onPageChange={onPageChange}
          extraClassName='justify-content-center'
          pageItemClassName='page-item'
          pageLinkClassName='page-link'
          activeItemClassName='active'
          disabledItemClassName='disabled'
          srOnlyClassName='sr-only'
          narrowStrategy='dropEllipsis'
          maxWidth={maxWidth || 500}
        />
      </div>
    </>
  );
}

export default memo(RPagination);
