import { useMemo } from 'react';
import { PaginationType } from '../types/types';

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => i + start);

const calculatePaginationRange = (
  totalCount: number,
  pageSize: number,
  siblingCount: number,
  currentPage: number
) => {
  const totalPageCount = Math.ceil(totalCount / pageSize);
  const totalPageNumbers = siblingCount + 5;

  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, 0, totalPageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

    return [firstPageIndex, 0, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);

    return [firstPageIndex, 0, ...middleRange, 0, lastPageIndex];
  }
};

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage = 1,
}: PaginationType) => {
  const paginationRange = useMemo(() => {
    return calculatePaginationRange(totalCount, pageSize, siblingCount, currentPage);
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange || [];
};

export default usePagination;
