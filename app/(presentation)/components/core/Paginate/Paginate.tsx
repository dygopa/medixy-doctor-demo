import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Button from "../BaseComponents/Button";

interface IPaginationProps {
  page: string | number;
  limit: number;
  total: number;
  maxPreviousPages?: number;
  maxNextPages?: number;
}

export default function Paginate({
  page,
  limit,
  total,
  maxPreviousPages = 5,
  maxNextPages = 5,
}: IPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");

  const currentPage = parseInt(page.toString(), 10);

  const [nextPages, setNextPages] = useState<number[]>([]);
  const [previousPages, setPreviousPages] = useState<number[]>([]);

  const onChangePage = (page: number) => {
    let locationSearch = window.location.search;

    if (pageParam) {
      locationSearch = locationSearch.replace(
        `page=${currentPage}`,
        `page=${page}`
      );
    } else {
      locationSearch = locationSearch
        ? `${locationSearch}&page=${page}`
        : `?page=${page}`;
    }

    router.push(window.location.pathname + locationSearch);
  };

  const getNextPages = useCallback(() => {
    const nextPagesArray: number[] = [];

    for (
      let nextPage = currentPage + 1;
      nextPage < currentPage + maxNextPages;
      nextPage++
    ) {
      const currentTotal: number = nextPage * limit;

      if (currentTotal > total) break;

      if (currentTotal <= total && nextPagesArray.indexOf(nextPage) < 0) {
        nextPagesArray.push(nextPage);
      }
    }

    setNextPages(nextPagesArray);
  }, [currentPage, limit, maxNextPages, total]);

  const getPreviousPages = useCallback(() => {
    if (currentPage > 1) {
      const previousPagesArray: number[] = [];

      let lastPreviousPage = currentPage - maxPreviousPages;
      lastPreviousPage = lastPreviousPage < 0 ? 0 : lastPreviousPage;

      for (
        let previousPage = currentPage - 1;
        previousPage > lastPreviousPage;
        previousPage--
      ) {
        const currentTotal: number = previousPage * limit;

        if (currentTotal > total) break;

        if (
          currentTotal <= total &&
          previousPagesArray.indexOf(previousPage) < 0
        ) {
          previousPagesArray.push(previousPage);
        }
      }

      setPreviousPages(previousPagesArray.sort((a, b) => a - b));
    }
  }, [currentPage, limit, maxPreviousPages, total]);

  useEffect(() => {
    getNextPages();
  }, [currentPage, getNextPages]);

  useEffect(() => {
    getPreviousPages();
  }, [currentPage, getPreviousPages]);

  return (
    <div className="flex">
      {currentPage !== 1 &&
        previousPages.length > 0 &&
        previousPages.map((previousPage: number) => (
          <Button
            key={previousPage}
            variant="outline-primary"
            type="button"
            className="me-2"
            style={{ padding: "5px 13px" }}
            onClick={() => onChangePage(previousPage)}
          >
            {previousPage}
          </Button>
        ))}

      {currentPage && (
        <Button
          variant="primary"
          type="button"
          className="me-2"
          style={{ padding: "5px 15px" }}
        >
          {currentPage}
        </Button>
      )}

      {nextPages.length > 0 &&
        nextPages.map((nextPage: number) => (
          <Button
            key={nextPage}
            variant="outline-primary"
            type="button"
            className="btn btn-outline-primary me-2"
            style={{ padding: "5px 13px" }}
            onClick={() => onChangePage(nextPage)}
          >
            {nextPage}
          </Button>
        ))}
    </div>
  );
}
