import React, { useMemo, useState } from "react";
import {
  BarChart3,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  CircleSlash2,
  FileText,
  GraduationCap,
  Home,
  Pencil,
  Plus,
  Search,
  User,
  UserPlus,
  Users,
} from "lucide-react";

const initialSubjects = [
  ["CS101-01", "Problem Solving Using C", "Computer Science", "1", "Dr. Anjali Verma"],
  ["CS101-02", "Programming in C Lab", "Computer Science", "1", "Dr. Rahul Sharma"],
  ["CS102-01", "Data Structures", "Computer Science", "2", "Dr. Priya Nair"],
  ["CS102-02", "Data Structures Lab", "Computer Science", "2", "Dr. Amit Patel"],
  ["CS201-01", "Database Management Systems", "Computer Science", "3", "Dr. Sandeep Kaur"],
  ["CS201-02", "DBMS Lab", "Computer Science", "3", "Dr. Neha Kapoor"],
  ["IT101-01", "Introduction to IT", "Information Technology", "1", "Dr. Vivek Singh"],
  ["IT201-01", "Web Development", "Information Technology", "3", "Dr. Meera Joshi"],
  ["EC101-01", "Basic Electronics", "Electronics & Comm.", "1", "Dr. Pooja Desai"],
  ["EC201-01", "Digital Electronics", "Electronics & Comm.", "3", "Dr. Karan Mehta"],
];

const sidebarGroups = [
  {
    title: "User Management",
    icon: Users,
    items: [
      ["Students", GraduationCap],
      ["Professors", Users],
      ["Admins", User],
    ],
  },
  {
    title: "Academic Management",
    icon: BookOpen,
    items: [
      ["Student Master", FileText],
      ["Subjects", FileText],
      ["Courses", GraduationCap],
    ],
  },
  {
    title: "Learning Management",
    icon: GraduationCap,
    items: [["Learning Paths", Users]],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    items: [["Platform Analytics", User]],
  },
];

function SidebarGroup({ group }) {
  const [open, setOpen] = useState(true);
  const GroupIcon = group.icon;

  return (
    <section className="nav-group">
      <button className="nav-heading" onClick={() => setOpen(!open)}>
        <GroupIcon size={20} />
        <strong>{group.title}</strong>
        <ChevronDown className={open ? "arrow open" : "arrow"} size={15} />
      </button>

      {open && (
        <div className="submenu">
          {group.items.map(([name, Icon]) => (
            <button
              className={`nav-child ${name === "Subjects" ? "selected" : ""}`}
              key={name}
            >
              <Icon size={17} />
              {name}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <h1>NAME</h1>

      <label className="sidebar-search">
        <input placeholder="Search..." />
        <Search size={18} />
      </label>

      <button className="dashboard-link">
        <Home size={20} />
        <strong>Dashboard</strong>
      </button>

      {sidebarGroups.map((group) => (
        <SidebarGroup group={group} key={group.title} />
      ))}

      <button className="profile-link">
        <User size={20} />
        <strong>Profile</strong>
      </button>
    </aside>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div>
        <h2>Subjects</h2>

        <div className="breadcrumbs">
          <span>Dashboard</span>
          <ChevronRight />
          <span>Academic Management</span>
          <ChevronRight />
          <span>Subjects</span>
        </div>
      </div>

      <div className="account">
        <div className="notification">
          <Bell size={25} />
          <b>3</b>
        </div>

        <div className="avatar">AU</div>

        <button
          className="account-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span>
            Welcome,
            <strong>Admin User</strong>
          </span>
          <ChevronDown size={16} />
        </button>

        {menuOpen && (
          <div className="account-menu">
            <button><User size={17} /> My Profile</button>
            <button>Account Settings</button>
            <button>Change Password</button>
            <button className="logout">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default function App() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [query, setQuery] = useState("");

  const filteredSubjects = useMemo(() => {
    const value = query.trim().toLowerCase();

    return subjects.filter(([code, name]) =>
      `${code} ${name}`.toLowerCase().includes(value)
    );
  }, [subjects, query]);

  function addSubject() {
    const code = window.prompt("Enter subject code:");
    if (!code) return;

    const name = window.prompt("Enter subject name:");
    if (!name) return;

    setSubjects((current) => [
      ...current,
      [code, name, "Computer Science", "1", "Not Assigned"],
    ]);
  }

  function editSubject(index) {
    const subject = filteredSubjects[index];
    const newName = window.prompt("Update subject name:", subject[1]);

    if (!newName) return;

    setSubjects((current) =>
      current.map((item) =>
        item[0] === subject[0] ? [item[0], newName, ...item.slice(2)] : item
      )
    );
  }

  function assignProfessor(index) {
    const subject = filteredSubjects[index];
    const professor = window.prompt(
      "Enter professor name:",
      subject[4] === "Not Assigned" ? "" : subject[4]
    );

    if (!professor) return;

    setSubjects((current) =>
      current.map((item) =>
        item[0] === subject[0]
          ? [...item.slice(0, 4), professor]
          : item
      )
    );
  }

  function deactivateSubject(index) {
    const subject = filteredSubjects[index];

    if (window.confirm(`Deactivate ${subject[1]}?`)) {
      setSubjects((current) =>
        current.filter((item) => item[0] !== subject[0])
      );
    }
  }

  return (
    <>
      <style>{`
        :root {
          font-family: Inter, Arial, sans-serif;
          color: #061747;
          background: #fff;
        }

        * { box-sizing: border-box; }
        body { margin: 0; }
        button, input { color: inherit; font: inherit; }
        button { cursor: pointer; }

        .app {
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          width: 270px;
          flex: none;
          padding: 24px 21px;
          background: linear-gradient(120deg, #fffdf9, #f8efe7);
        }

        .sidebar h1 {
          margin: 0 11px 27px;
          font: 700 36px Georgia, serif;
        }

        .sidebar-search {
          height: 45px;
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 0 15px;
          border: 1px solid #dce1e8;
          border-radius: 8px;
          background: white;
        }

        .sidebar-search input {
          min-width: 0;
          flex: 1;
          border: 0;
          outline: 0;
        }

        .sidebar-search svg { color: #71809e; }

        .dashboard-link,
        .profile-link,
        .nav-heading,
        .nav-child {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 15px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          text-align: left;
        }

        .dashboard-link,
        .profile-link {
          padding: 14px 9px;
        }

        .nav-group { margin: 10px 0; }

        .nav-heading { padding: 12px 9px; }

        .nav-heading strong {
          flex: 1;
          font-size: 13px;
        }

        .arrow {
          transition: transform .2s;
        }

        .arrow.open {
          transform: rotate(180deg);
        }

        .nav-child {
          padding: 11px 10px 11px 30px;
          font-size: 13px;
        }

        .nav-child:hover,
        .dashboard-link:hover,
        .profile-link:hover {
          background: #f5e8dd;
        }

        .nav-child.selected {
          background: #f0e1d5;
          font-weight: 700;
        }

        .profile-link { margin-top: 6px; }

        .page {
          min-width: 0;
          flex: 1;
        }

        header {
          height: 118px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          border-bottom: 1px solid #e5e5e5;
        }

        header h2 {
          margin: 0 0 14px;
          font-size: 32px;
        }

        .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }

        .breadcrumbs svg {
          width: 14px;
          height: 14px;
        }

        .account {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .notification { position: relative; }

        .notification b {
          position: absolute;
          top: -8px;
          right: -7px;
          width: 19px;
          height: 19px;
          border-radius: 50%;
          background: red;
          color: white;
          font-size: 12px;
          line-height: 19px;
          text-align: center;
        }

        .avatar {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #061850;
          color: white;
          font-weight: 700;
        }

        .account-button {
          display: flex;
          align-items: center;
          gap: 25px;
          border: 0;
          background: transparent;
          text-align: left;
        }

        .account-button span {
          display: flex;
          flex-direction: column;
          color: #747e95;
          font-size: 13px;
        }

        .account-button strong {
          margin-top: 4px;
          color: #071744;
          font-size: 14px;
        }

        .account-menu {
          position: absolute;
          z-index: 10;
          top: 58px;
          right: 0;
          width: 180px;
          overflow: hidden;
          border: 1px solid #e2e4e8;
          border-radius: 10px;
          background: white;
          box-shadow: 0 10px 25px #00000014;
        }

        .account-menu button {
          width: 100%;
          padding: 13px 18px;
          border: 0;
          background: white;
          text-align: left;
        }

        .account-menu .logout {
          border-top: 1px solid #eee;
          color: red;
        }

        main {
          padding: 30px 29px 20px;
        }

        .toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 34px;
        }

        .search-area {
          display: flex;
          gap: 18px;
        }

        .subject-search {
          width: 395px;
          height: 45px;
          display: flex;
          align-items: center;
          padding: 0 15px;
          border: 1px solid #dce1e8;
          border-radius: 6px;
        }

        .subject-search input {
          min-width: 0;
          flex: 1;
          border: 0;
          outline: 0;
        }

        .subject-search svg { color: #647596; }

        .search-button,
        .add-button {
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 20px;
          border: 0;
          border-radius: 5px;
          background: #075cf4;
          color: white;
        }

        .add-button {
          min-width: 153px;
        }

        .table-card {
          overflow: hidden;
          border: 1px solid #e0e3e8;
          border-radius: 8px;
        }

        .table-scroll { overflow-x: auto; }

        table {
          width: 100%;
          min-width: 1100px;
          border-collapse: collapse;
          font-size: 13px;
        }

        th {
          height: 52px;
          padding: 0 15px;
          background: linear-gradient(90deg, #fffaf6, #faf6f2);
          text-align: left;
        }

        th svg {
          width: 14px;
          margin-left: 7px;
          vertical-align: middle;
        }

        td {
          height: 65px;
          padding: 0 15px;
          border-top: 1px solid #e2e5e9;
        }

        th:first-child,
        td:first-child {
          width: 64px;
        }

        th:nth-child(2) { width: 140px; }
        th:nth-child(3) { width: 230px; }
        th:nth-child(4) { width: 180px; }
        th:nth-child(5) { width: 130px; }
        th:nth-child(6) { width: 180px; }

        .actions {
          display: flex;
          align-items: center;
          gap: 26px;
        }

        .actions button {
          height: 37px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid #77a2ff;
          border-radius: 5px;
          background: white;
          color: #075cff;
        }

        .assign-button {
          min-width: 139px;
          padding: 0 11px;
        }

        .icon-button {
          width: 37px;
          padding: 0;
        }

        .actions .deactivate {
          border-color: #ff9ca3;
          color: red;
        }

        .empty {
          height: 250px;
          color: #758099;
          text-align: center;
        }

        .pagination {
          min-height: 65px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 10px 16px;
          border-top: 1px solid #e2e5e9;
        }

        .page-summary,
        .page-summary label,
        .pages {
          display: flex;
          align-items: center;
        }

        .page-summary {
          gap: 31px;
          color: #52617d;
          font-size: 12px;
        }

        .page-summary label { gap: 17px; }

        .page-summary select {
          width: 70px;
          height: 38px;
          padding: 0 12px;
          border: 1px solid #dfe3e9;
          border-radius: 5px;
          background: white;
        }

        .pages { gap: 10px; }

        .pages button {
          min-width: 35px;
          height: 35px;
          display: grid;
          place-items: center;
          border: 1px solid #dfe3e9;
          border-radius: 5px;
          background: white;
        }

        .pages .current {
          border-color: transparent;
          background: #e8efff;
          color: #075cff;
          font-weight: 700;
        }

        .legend {
          display: flex;
          gap: 35px;
          margin: 23px 15px;
          color: #55627d;
          font-size: 12px;
        }

        .legend div {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .legend div + div {
          padding-left: 35px;
          border-left: 1px solid #dfe2e7;
        }

        .legend svg { color: #075cff; }
        .legend .red { color: red; }

        @media (max-width: 760px) {
          .sidebar { display: none; }

          header {
            height: auto;
            padding: 20px;
          }

          header h2 { font-size: 25px; }
          .account-button { display: none; }

          main { padding: 20px; }

          .toolbar,
          .search-area,
          .pagination,
          .legend {
            align-items: stretch;
            flex-direction: column;
          }

          .subject-search { width: 100%; }
          .legend div + div { padding-left: 0; border-left: 0; }
        }
      `}</style>

      <div className="app">
        <Sidebar />

        <div className="page">
          <Header />

          <main>
            <section className="toolbar">
              <div className="search-area">
                <label className="subject-search">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by subject code or subject name..."
                  />
                  <Search size={19} />
                </label>

                <button className="search-button">Search</button>
              </div>

              <button className="add-button" onClick={addSubject}>
                <Plus size={20} />
                Add Subject
              </button>
            </section>

            <section className="table-card">
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      {[
                        "Subject Code",
                        "Subject Name",
                        "Department",
                        "Semester",
                        "Assigned Professor",
                      ].map((heading) => (
                        <th key={heading}>
                          {heading}
                          <ChevronsUpDown />
                        </th>
                      ))}
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredSubjects.map(
                      ([code, name, department, semester, professor], index) => (
                        <tr key={code}>
                          <td>{index + 1}</td>
                          <td>{code}</td>
                          <td>{name}</td>
                          <td>{department}</td>
                          <td>{semester}</td>
                          <td>{professor}</td>

                          <td>
                            <div className="actions">
                              <button
                                className="assign-button"
                                onClick={() => assignProfessor(index)}
                              >
                                <UserPlus size={17} />
                                Assign Professor
                              </button>

                              <button
                                className="icon-button"
                                onClick={() => editSubject(index)}
                                aria-label="Edit subject"
                              >
                                <Pencil size={17} />
                              </button>

                              <button
                                className="icon-button deactivate"
                                onClick={() => deactivateSubject(index)}
                                aria-label="Deactivate subject"
                              >
                                <CircleSlash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )}

                    {!filteredSubjects.length && (
                      <tr>
                        <td className="empty" colSpan="7">
                          No subjects found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <footer className="pagination">
                <div className="page-summary">
                  <label>
                    Rows per page:
                    <select defaultValue="10">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                  </label>

                  <span>1-{filteredSubjects.length} of 42</span>
                </div>

                <div className="pages">
                  <button><ChevronLeft size={17} /></button>
                  <button className="current">1</button>
                  <button>2</button>
                  <button>3</button>
                  <button>4</button>
                  <button>5</button>
                  <span>...</span>
                  <button>5</button>
                  <button><ChevronRight size={17} /></button>
                </div>
              </footer>
            </section>

            <section className="legend">
              <div>
                <CircleSlash2 className="red" size={18} />
                <span>
                  <strong>Deactivate:</strong> This will deactivate the subject
                  and hide it from active listings.
                </span>
              </div>

              <div>
                <Pencil size={18} />
                <span>
                  <strong>Edit:</strong> Update subject details.
                </span>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}