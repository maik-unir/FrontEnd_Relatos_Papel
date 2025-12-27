import { Pagination } from "react-bootstrap";

const PaginationControl = ({
    totalItems = 0,
    itemsPerPage = 8,
    currentPage = 1,
    onPageChange = () => { },
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    return (
        <Pagination className="justify-content-center mt-4">
            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
        </Pagination>
    );
};

export default PaginationControl;
