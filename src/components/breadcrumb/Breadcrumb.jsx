import { Breadcrumb as BSBreadcrumb } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { books } from "../../data/database";
import { getBreadcrumbForRoute } from "../../config/breadcrumbConfig";

const Breadcrumb = ({ libro = null }) => {
  const location = useLocation();
  const params = useParams();

  const items = getBreadcrumbForRoute(
    location.pathname,
    params,
    { libro, books }
  );

  if (items.length <= 1) return null;

  return (
    <BSBreadcrumb className="mb-3">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <BSBreadcrumb.Item
            key={index}
            active={isLast}
            linkAs={isLast ? "span" : Link}
            linkProps={isLast ? {} : { to: item.to }}
          >
            {item.label}
          </BSBreadcrumb.Item>
        );
      })}
    </BSBreadcrumb>
  );
};

export default Breadcrumb;

