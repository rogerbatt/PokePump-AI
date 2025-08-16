import React from "react";

import { Button } from "@/components/atoms";
import { Card } from "@/components/atoms/card";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface AdvancedPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

/**
 * Advanced pagination component with Pokemon-themed styling
 * Supports dynamic items per page and comprehensive navigation controls
 */
const AdvancedPagination: React.FC<AdvancedPaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  hasNext = true,
  hasPrevious = true,
}) => {
  const { t } = useTranslation();
  // Calculate pagination metrics
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const itemsPerPageOptions = [10, 20, 50, 100];

  // Navigation handlers with boundary protection
  const handleFirstPage = () => onPageChange(1);
  const handleLastPage = () => onPageChange(totalPages);
  const handlePreviousPage = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNextPage = () =>
    onPageChange(Math.min(totalPages, currentPage + 1));

  return (
    <div className="">
      <Card className="p-6 bg-gradient-to-r from-primary via-primary to-primary border-4 border-secondary shadow-2xl relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Items per page selector with Pokemon theming */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-secondary drop-shadow-lg">
              ⚡ {t("pagination.itemsPerPage")}:
            </span>
            <div className="hover:scale-105 transition-transform duration-150">
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => onItemsPerPageChange(Number(value))}
              >
                <SelectTrigger className="w-20 h-10 bg-primary border-2 border-secondary text-secondary font-bold rounded-full hover:bg-primary focus:border-secondary shadow-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-2 border-secondary rounded-xl">
                  {itemsPerPageOptions.map((option) => (
                    <SelectItem
                      key={option}
                      value={option.toString()}
                      className="font-semibold"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Current page info display with Pokemon styling */}
          <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full border-2 border-secondary shadow-lg">
            <span className="text-sm font-bold text-primary">
              🎯 {t("pagination.showing", { startItem, endItem, totalItems })}
            </span>
          </div>

          {/* Navigation controls with Pokemon-themed animations */}
          <div className="flex items-center gap-2">
            {/* First page button */}
            <div className="hover:scale-110 hover:-rotate-1 transition-transform duration-150">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFirstPage}
                disabled={currentPage === 1}
                className="h-10 w-10 p-0 bg-destructive/80 dark:bg-destructive/80 hover:bg-destructive/50 dark:hover:bg-destructive/50 border-2 dark:border-destructive border-destructive text-background hover:text-background font-bold rounded-full shadow-lg disabled:opacity-50 disabled:bg-gray-400"
                aria-label={t("pagination.first")}
              >
                <ChevronsLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="hover:scale-110 hover:-rotate-1 transition-transform duration-150">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={!hasPrevious || currentPage === 1}
                className="h-10 w-10 p-0 bg-secondary border-2 border-secondary text-primary hover:text-primary/80 dark:hover:text-primary/80 font-bold rounded-full shadow-lg disabled:opacity-50 disabled:bg-gray-400"
                aria-label={t("pagination.previous")}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="px-3 py-2 text-sm font-medium bg-secondary text-primary rounded-full border-2 border-secondary">
              {currentPage} / {totalPages}
            </div>

            <div className="hover:scale-110 hover:rotate-1 transition-transform duration-150">
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={!hasNext || currentPage === totalPages}
                className="h-10 w-10 p-0 bg-secondary border-2 border-yellow-600 text-destructive hover:text-yellow-700 dark:hover:text-yellow-500 font-bold rounded-full shadow-lg disabled:opacity-50 disabled:bg-gray-400"
                aria-label={t("pagination.next")}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Last page button */}
            <div className="hover:scale-110 hover:rotate-1 transition-transform duration-150">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
                className="h-10 w-10 p-0 bg-destructive/80 dark:bg-destructive/80 hover:bg-destructive/50 dark:hover:bg-destructive/50 border-2 dark:border-destructive border-destructive text-background hover:text-background font-bold rounded-full shadow-lg disabled:opacity-50 disabled:bg-gray-400"
                aria-label={t("pagination.last")}
              >
                <ChevronsRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Pokemon-ball inspired elements */}
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full border-2 border-white opacity-20"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-secondary rounded-full border border-secondary opacity-30"></div>
      </Card>
    </div>
  );
};

export { AdvancedPagination };
export { AdvancedPagination as Pagination };
