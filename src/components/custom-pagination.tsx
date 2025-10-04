'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { memo, useMemo } from 'react';

const MAX_VISIBLE_PAGES = 5;

export type CustomPaginationProps = {
  page: number;
  total: number;
  pageSize: number;
  isLoading: boolean;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export const CustomPagination = memo(function CustomPagination(props: CustomPaginationProps) {
  const { page, total, pageSize, isLoading, pageSizeOptions, onPageChange, onPageSizeChange } =
    props;

  const totalPageCount = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);

  const visiblePages = useMemo(() => {
    const pages: number[] = [];

    if (totalPageCount <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPageCount; i++) pages.push(i);
    } else {
      pages.push(1);

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + 1);

      if (start > 2) pages.push(-1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPageCount) {
          pages.push(i);
        }
      }

      if (end < totalPageCount - 1) pages.push(-1);
      if (totalPageCount > 1) pages.push(totalPageCount);
    }

    return pages;
  }, [page, totalPageCount]);

  const renderPageNumbers = () => {
    return visiblePages.map((pageNum, index) => {
      if (pageNum === -1) {
        return (
          <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      return (
        <PaginationItem key={pageNum}>
          <PaginationLink
            onClick={() => onPageChange(pageNum)}
            isActive={page === pageNum}
            className={cn(
              'cursor-pointer transition-colors',
              isLoading && 'pointer-events-none opacity-50'
            )}
            aria-disabled={isLoading}>
            {pageNum}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  return (
    <div className='flex flex-col md:flex-row items-center gap-3 w-full'>
      <Pagination className={cn({ 'md:justify-end': pageSizeOptions })}>
        <PaginationContent className='max-sm:gap-0'>
          {isLoading && (
            <PaginationItem>
              <Loader2 className='h-4 w-4 animate-spin' />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(page - 1, 1))}
              aria-disabled={page === 1 || isLoading}
              tabIndex={page === 1 || isLoading ? -1 : undefined}
              className={cn(
                page === 1 || isLoading ? 'pointer-events-none opacity-50' : 'cursor-pointer'
              )}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(page + 1, totalPageCount))}
              aria-disabled={page === totalPageCount || isLoading}
              tabIndex={page === totalPageCount || isLoading ? -1 : undefined}
              className={cn(
                page === totalPageCount || isLoading
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {pageSizeOptions && (
        <div className='flex flex-col gap-4 flex-1'>
          <SelectRowsPerPage
            options={pageSizeOptions}
            setPageSize={onPageSizeChange}
            pageSize={pageSize}
          />
        </div>
      )}
    </div>
  );
});

type SelectRowsPerPageProps = {
  options: number[];
  setPageSize: (newSize: number) => void;
  pageSize: number;
};

const SelectRowsPerPage = memo(function SelectRowsPerPage(props: SelectRowsPerPageProps) {
  const { options, setPageSize, pageSize } = props;

  return (
    <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
      <SelectTrigger className='cursor-pointer'>
        <SelectValue>{String(pageSize)}</SelectValue>
      </SelectTrigger>
      <SelectContent className='bg-white'>
        {options.map((option) => (
          <SelectItem className='cursor-pointer' key={option} value={String(option)}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
