import React, { useState } from 'react';

const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
    const [selectedPage, setSelectedPage] = useState(currentPage);

    const handlePageChange = (page) => {
        setSelectedPage(page);
        onPageChange(page);
    };

    const renderPaginationButtons = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === selectedPage ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="pagination">
            {renderPaginationButtons()}
        </div>
    );
};

export default CustomPagination;