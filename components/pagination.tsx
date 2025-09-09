"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | string)[] = [];
    const delta = 1; // how many pages to show around current

    if (totalPages <= 7) {
      // show all pages if small number
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("…");
      }

      const start = Math.max(2, currentPage - delta);
      const end = Math.min(totalPages - 1, currentPage + delta);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("…");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="mt-4 flex justify-center">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </Button>

        {getPages().map((page, idx) =>
          page === "…" ? (
            <span key={`ellipsis-${idx}`} className="px-2">
              …
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => onPageChange(Number(page))}
            >
              {page}
            </Button>
          )
        )}

        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
