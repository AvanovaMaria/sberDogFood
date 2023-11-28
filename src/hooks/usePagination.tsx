import { useState } from "react";

export default function usePagination<T>(data: T[], itemPerPage: number) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const countPage = Math.ceil(data.length / itemPerPage);
    const MIN_PAGE = 1;

    function getCurrentData() {
		const start = (currentPage - 1) * itemPerPage;
		const end = start + itemPerPage;
		return data.slice(start, end);
	}

    function next() {
		setCurrentPage((currentPage) => Math.min(currentPage + 1, countPage));
	}

    function prev() {
		setCurrentPage((currentPage) => Math.max(currentPage - 1, MIN_PAGE));
	}

    function setPagePaginate(page: number) {
		const pageNumber = Math.max(1, page);
		setCurrentPage(() => Math.min(pageNumber, countPage));
	}

    return {
        currentPage,
        getCurrentData,
        countPage,
        next,
        prev,
        setPagePaginate
    }

}