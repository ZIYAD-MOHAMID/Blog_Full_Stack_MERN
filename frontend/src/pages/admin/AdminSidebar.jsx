import * as Icon from "react-bootstrap-icons"
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <Link to="/admin-dashboard" className="admin-sidebar-title">
        <Icon.Columns/>
        Dashboard
      </Link>
      <ul className="admin-sidebar-list">
        <Link to="/admin-dashboard/users-table" className="admin-sidebar-link">
          <Icon.Person/>
          Users
        </Link>
        <Link to="/admin-dashboard/posts-table" className="admin-sidebar-link">
          <Icon.FilePost />
          Posts
        </Link>
        <Link
          to="/admin-dashboard/categories-table"
          className="admin-sidebar-link"
        >
          <Icon.TagFill />
          Categories
        </Link>
        <Link
          to="/admin-dashboard/comments-table"
          className="admin-sidebar-link"
        >
          <Icon.ChatLeftText />
          Comments
        </Link>
      </ul>
    </div>
  );
};

export default AdminSidebar;