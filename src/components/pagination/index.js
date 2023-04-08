import styles from "./pagination.module.scss";

const Pagination = ({
  currentPage,
  productsPerPage,
  totalProducts,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className={styles.pagination}>
        <ul className={styles.listPage}>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`${styles.pageItem} ${
                number === currentPage ? styles.active : ""
              }`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Pagination;
