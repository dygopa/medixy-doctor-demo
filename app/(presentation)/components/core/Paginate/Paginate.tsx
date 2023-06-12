import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IPaginationProps {
  page: string;
  limit: number;
  total: number;
  maxPreviousPages?: number;
  maxNextPages?: number;
}

export default function Paginate({
  page,
  limit,
  total,
  maxPreviousPages = 4,
  maxNextPages = 4,
}: IPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");

  const currentPage = parseInt(page, 10);

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

  const getNextPages = () => {
    if (total === 0) return;

    const nextPagesArray: number[] = [];

    for (
      let nextPage = currentPage + 1;
      nextPage < currentPage + maxNextPages;
      nextPage++
    ) {
      const currentTotal: number = nextPage * limit - limit;

      if (currentTotal > total) break;

      if (currentTotal <= total && nextPagesArray.indexOf(nextPage) < 0) {
        nextPagesArray.push(nextPage);
      }
    }

    setNextPages(nextPagesArray);
  };

  const getPreviousPages = () => {
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
  };

  useEffect(() => {
    getNextPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, total]);

  useEffect(() => {
    getPreviousPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, total]);

  if (currentPage === 1 && total < limit) return <div />;

  return (
    <div>
      <div className="d-flex justify-content-end">
        {previousPages.length > 0 &&
          previousPages.indexOf(1) < 0 &&
          currentPage !== 1 && (
            <>
              <div className="mr-2">
                <button
                  type="button"
                  className="mr-2 border border-primary hover:bg-primary hover:text-white text-primary rounded-full"
                  style={{ padding: "5px 13px" }}
                  onClick={() => onChangePage(1)}
                >
                  1
                </button>
              </div>

              <div className="me-3 mt-3">...</div>
            </>
          )}

        {previousPages.length > 0 &&
          currentPage !== 1 &&
          previousPages.map((previousPage: number) => (
            <button
              key={previousPage}
              type="button"
              className="mr-2 border border-primary hover:bg-primary hover:text-white text-primary rounded-full"
              style={{ padding: "5px 13px" }}
              onClick={() => onChangePage(previousPage)}
            >
              {previousPage}
            </button>
          ))}

        {currentPage && (
          <button
            type="button"
            className="mr-2 border border-primary bg-primary text-white rounded-full"
            style={{ padding: "5px 13px" }}
          >
            {currentPage}
          </button>
        )}

        {nextPages.length > 0 &&
          nextPages.map((nextPage: number) => (
            <button
              key={nextPage}
              type="button"
              className="mr-2 border border-primary hover:bg-primary hover:text-white text-primary rounded-full"
              style={{ padding: "5px 13px" }}
              onClick={() => onChangePage(nextPage)}
            >
              {nextPage}
            </button>
          ))}
      </div>
    </div>
  );
}
