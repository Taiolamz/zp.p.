import { memo } from 'react';
import Pagination, { bootstrap5PaginationPreset } from 'react-responsive-pagination';
import { spacing } from '../../utils';
import './style.css';
interface IProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
  maxWidth?: number;
  isLoading: boolean;
}

function RPagination({ totalPages, currentPage, onPageChange, maxWidth, isLoading = false }: IProps) {
  return (
    <>
      {!isLoading && (
        <div
          style={{
            marginTop: spacing.small,
            marginBottom: spacing.medium,
            width: '100%',
            maxWidth: '100%',
          }}>
          <Pagination
            {...bootstrap5PaginationPreset}
            total={totalPages}
            current={currentPage}
            onPageChange={onPageChange}
            extraClassName="justify-content-center"
            pageItemClassName="page-item"
            pageLinkClassName="page-link"
            activeItemClassName="active"
            disabledItemClassName="disabled"
            srOnlyClassName="sr-only"
            narrowStrategy="dropEllipsis"
            maxWidth={maxWidth || 350}
          />
        </div>
      )}
    </>
  );
}

export default memo(RPagination);
