import React, { useMemo, useState } from "react";
import {
  BarChart3,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  Home,
  Lock,
  LogOut,
  RotateCcw,
  Search,
  Settings,
  Upload,
  User,
  Users,
} from "lucide-react";

const initialStudents = [
  ["ENR2024001", "Aarav Sharma", "Computer Science", "5", "2022-2026", "Registered"],
  ["ENR2024002", "Diya Patel", "Electronics & Comm.", "3", "2023-2027", "Registered"],
  ["ENR2024003", "Rohan Verma", "Mechanical Engg.", "7", "2021-2025", "Registered"],
  ["ENR2024004", "Sneha Iyer", "Computer Science", "5", "2022-2026", "Registered"],
  ["ENR2024005", "Karan Mehta", "Civil Engineering", "3", "2022-2027", "Pending"],
  ["ENR2024006", "Meera Nair", "Information Tech.", "1", "2024-2028", "Pending"],
  ["ENR2024007", "Arjun Desai", "Electrical Engg.", "5", "2022-2026", "Registered"],
  ["ENR2024008", "Pooja Singh", "Electronics & Comm.", "3", "2023-2027", "Not Registered"],
  ["ENR2024009", "Vikram Joshi", "Mechanical Engg.", "7", "2021-2025", "Not Registered"],
  ["ENR2024010", "Neha Kapoor", "Information Tech.", "1", "2024-2028", "Pending"],
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
        <ChevronDown className={open ? "rotate" : ""} size={15} />
      </button>

      {open && (
        <div className="submenu">
          {group.items.map(([name, Icon]) => (
            <button
              className={`nav-child ${
                name === "Student Master" ? "selected" : ""
              }`}
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

      <label className="side-search">
        <input placeholder="Search..." />
        <Search size={18} />
      </label>

      <button className="dashboard">
        <Home size={20} />
        Dashboard
      </button>

      {sidebarGroups.map((group) => (
        <SidebarGroup group={group} key={group.title} />
      ))}

      <button className="profile">
        <User size={20} />
        <strong>Profile</strong>
      </button>
    </aside>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div>
        <h2>Student Master</h2>

        <div className="breadcrumbs">
          <span>Dashboard</span>
          <ChevronRight />
          <span>Academic Management</span>
          <ChevronRight />
          <span>Student Master</span>
        </div>
      </div>

      <div className="account">
        <div className="notification">
          <Bell size={25} />
          <b>3</b>
        </div>

        <div className="avatar">AU</div>

        <button className="account-button" onClick={() => setOpen(!open)}>
          <span>
            Welcome,
            <strong>Admin User</strong>
          </span>
          <ChevronDown size={16} />
        </button>

        {open && (
          <div className="account-menu">
            <button><User /> My Profile</button>
            <button><Settings /> Account Settings</button>
            <button><Lock /> Change Password</button>
            <button className="logout"><LogOut /> Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

const summaryCards = [
  {
    title: "Total Students",
    value: "1,248",
    text: "All students in the system",
    color: "#075cff",
    icon: Users,
  },
  {
    title: "Registered Students",
    value: "1,102",
    text: "Students with registered status",
    color: "#069c52",
    icon: FileText,
    watermark: Check,
  },
  {
    title: "Pending Registrations",
    value: "146",
    text: "Students not yet registered",
    color: "#ff7000",
    icon: Clock3,
  },
];

function SummaryCard({ card }) {
  const Icon = card.icon;
  const Watermark = card.watermark || card.icon;

  return (
    <article className="summary-card" style={{ "--color": card.color }}>
      <div className="summary-icon">
        <Icon size={29} />
      </div>

      <div>
        <span>{card.title}</span>
        <strong>{card.value}</strong>
      </div>

      <p>{card.text}</p>
      <Watermark className="watermark" />
    </article>
  );
}

export default function App() {
  const [students] = useState(initialStudents);
  const [query, setQuery] = useState("");
  const [batch, setBatch] = useState("");
  const [semester, setSemester] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");

  const displayedStudents = useMemo(() => {
    const search = query.toLowerCase().trim();

    return students.filter(
      ([enrollment, name, studentDepartment, studentSemester, studentBatch, studentStatus]) =>
        `${enrollment} ${name}`.toLowerCase().includes(search) &&
        (!batch || studentBatch === batch) &&
        (!semester || studentSemester === semester) &&
        (!status || studentStatus === status) &&
        (!department || studentDepartment === department)
    );
  }, [students, query, batch, semester, status, department]);

  function resetFilters() {
    setQuery("");
    setBatch("");
    setSemester("");
    setStatus("");
    setDepartment("");
  }

  return (
    <>
      <style>{`
        :root {
          font-family: Inter, Arial, sans-serif;
          color: #071744;
          background: #fff;
        }

        * { box-sizing: border-box; }
        body { margin: 0; }
        button, input, select { color: inherit; font: inherit; }
        button { cursor: pointer; }

        .app {
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          width: 265px;
          flex: none;
          padding: 25px 20px;
          background: linear-gradient(120deg, #fffdf9, #f8efe7);
        }

        .sidebar h1 {
          margin: 0 13px 29px;
          font: 700 36px Georgia, serif;
          letter-spacing: 1px;
        }

        .side-search {
          height: 45px;
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 0 15px;
          border: 1px solid #dde1e8;
          border-radius: 8px;
          background: white;
        }

        .side-search input {
          min-width: 0;
          flex: 1;
          border: 0;
          outline: 0;
          background: transparent;
        }

        .side-search svg { color: #71809e; }

        .dashboard, .profile, .nav-heading, .nav-child {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 15px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          text-align: left;
        }

        .dashboard, .profile {
          padding: 14px 9px;
          font-weight: 600;
        }

        .nav-group { margin: 10px 0; }

        .nav-heading {
          padding: 12px 9px;
        }

        .nav-heading strong {
          flex: 1;
          font-size: 13px;
        }

        .nav-heading svg:last-child {
          transition: transform .2s;
        }

        .nav-heading svg.rotate {
          transform: rotate(180deg);
        }

        .submenu {
          animation: reveal .2s ease;
        }

        @keyframes reveal {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-child {
          padding: 11px 10px 11px 31px;
          font-size: 13px;
        }

        .nav-child:hover,
        .dashboard:hover,
        .profile:hover {
          background: #f5e8dd;
        }

        .nav-child.selected {
          background: #f0e1d5;
          font-weight: 700;
        }

        .profile { margin-top: 7px; }

        .page {
          min-width: 0;
          flex: 1;
        }

        header {
          height: 119px;
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
          top: 59px;
          right: 0;
          width: 180px;
          overflow: hidden;
          border: 1px solid #e1e3e7;
          border-radius: 10px;
          background: white;
          box-shadow: 0 10px 25px #00000014;
        }

        .account-menu button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 13px 18px;
          border: 0;
          background: white;
          font-size: 13px;
          text-align: left;
        }

        .account-menu svg {
          width: 17px;
          height: 17px;
        }

        .account-menu .logout {
          border-top: 1px solid #eee;
          color: red;
        }

        main {
          padding: 23px 29px 35px;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        .summary-card {
          position: relative;
          min-height: 139px;
          display: grid;
          grid-template-columns: 63px 1fr;
          gap: 17px;
          overflow: hidden;
          padding: 20px;
          border: 1px solid color-mix(in srgb, var(--color) 20%, white);
          border-radius: 11px;
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--color) 5%, white),
            white
          );
        }

        .summary-icon {
          width: 59px;
          height: 59px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background: var(--color);
          color: white;
          box-shadow: 0 8px 17px color-mix(in srgb, var(--color) 25%, transparent);
        }

        .summary-card span {
          display: block;
          margin: 6px 0 10px;
          font-size: 13px;
        }

        .summary-card strong {
          display: block;
          font-size: 29px;
        }

        .summary-card p {
          grid-column: 1 / 3;
          margin: 0;
          font-size: 14px;
        }

        .watermark {
          position: absolute;
          right: 20px;
          bottom: 23px;
          width: 52px;
          height: 52px;
          color: var(--color);
          opacity: .25;
        }

        .controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin: 31px 0 22px;
        }

        .file-buttons, .filters {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .file-buttons button, .reset-button {
          height: 43px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 17px;
          border: 1px solid #079b50;
          border-radius: 6px;
          background: white;
          color: #079b50;
          font-weight: 600;
        }

        .file-buttons .upload-button {
          background: #079b50;
          color: white;
        }

        .filters > span {
          margin-right: 2px;
          font-size: 12px;
        }

        .filters select {
          height: 43px;
          min-width: 123px;
          padding: 0 13px;
          border: 1px solid #dfe3e9;
          border-radius: 6px;
          background: white;
        }

        .reset-button {
          border-color: #dfe3e9;
          color: #071744;
        }

        .table-search {
          width: 352px;
          height: 44px;
          display: flex;
          align-items: center;
          margin-bottom: 18px;
          padding: 0 15px;
          border: 1px solid #dde2e9;
          border-radius: 7px;
        }

        .table-search input {
          min-width: 0;
          flex: 1;
          border: 0;
          outline: 0;
          background: transparent;
        }

        .table-card {
          overflow: hidden;
          border: 1px solid #e0e3e7;
          border-radius: 10px;
        }

        .table-scroll { overflow-x: auto; }

        table {
          width: 100%;
          min-width: 950px;
          border-collapse: collapse;
          font-size: 13px;
        }

        th {
          height: 44px;
          padding: 0 18px;
          background: linear-gradient(90deg, #fffaf6, #faf6f2);
          text-align: left;
        }

        th svg {
          width: 14px;
          margin-left: 7px;
          vertical-align: middle;
        }

        td {
          height: 46px;
          padding: 0 18px;
          border-top: 1px solid #e3e6e9;
        }

        .status {
          display: inline-block;
          min-width: 87px;
          padding: 6px 10px;
          border-radius: 5px;
          font-weight: 600;
          text-align: center;
        }

        .registered {
          background: #e5f6ec;
          color: #008c4c;
        }

        .pending {
          background: #fff2e4;
          color: #f16a00;
        }

        .not-registered {
          min-width: 118px;
          background: #ffe7e8;
          color: #e71d29;
        }

        .empty {
          height: 200px;
          color: #758099;
          text-align: center;
        }

        .pagination {
          min-height: 61px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 10px 18px;
          border-top: 1px solid #e3e6e9;
        }

        .page-summary, .page-summary label, .pages {
          display: flex;
          align-items: center;
        }

        .page-summary {
          gap: 24px;
          color: #56647f;
          font-size: 12px;
        }

        .page-summary label { gap: 16px; }

        .page-summary select {
          width: 84px;
          height: 40px;
          padding: 0 12px;
          border: 1px solid #dfe3e9;
          border-radius: 6px;
          background: white;
        }

        .pages { gap: 12px; }

        .pages button {
          min-width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border: 1px solid #e0e4ea;
          border-radius: 6px;
          background: white;
        }

        .pages button:first-child,
        .pages button:last-child {
          border: 0;
        }

        .pages .current {
          border-color: transparent;
          background: #e6f6ed;
          color: #008d4c;
          font-weight: 700;
        }

        @media (max-width: 1100px) {
          .summary-grid { grid-template-columns: 1fr; }
          .controls { align-items: flex-start; flex-direction: column; }
          .filters { flex-wrap: wrap; }
        }

        @media (max-width: 720px) {
          .sidebar { display: none; }
          header { height: auto; padding: 20px; }
          header h2 { font-size: 25px; }
          .account-button { display: none; }
          main { padding: 20px; }
          .file-buttons { flex-wrap: wrap; }
          .table-search { width: 100%; }
          .pagination { align-items: flex-start; flex-direction: column; }
          .pages { width: 100%; overflow-x: auto; }
        }
      `}</style>

      <div className="app">
        <Sidebar />

        <div className="page">
          <Header />

          <main>
            <section className="summary-grid">
              {summaryCards.map((card) => (
                <SummaryCard card={card} key={card.title} />
              ))}
            </section>

            <section className="controls">
              <div className="file-buttons">
                <button className="upload-button">
                  <Upload size={18} />
                  Upload Excel
                </button>

                <button>
                  <Download size={18} />
                  Download Template
                </button>
              </div>

              <div className="filters">
                <span>Sort By:</span>

                <select value={batch} onChange={(event) => setBatch(event.target.value)}>
                  <option value="">Batch</option>
                  <option>2021-2025</option>
                  <option>2022-2026</option>
                  <option>2022-2027</option>
                  <option>2023-2027</option>
                  <option>2024-2028</option>
                </select>

                <select value={semester} onChange={(event) => setSemester(event.target.value)}>
                  <option value="">Semester</option>
                  <option>1</option>
                  <option>3</option>
                  <option>5</option>
                  <option>7</option>
                </select>

                <select value={status} onChange={(event) => setStatus(event.target.value)}>
                  <option value="">Status</option>
                  <option>Registered</option>
                  <option>Pending</option>
                  <option>Not Registered</option>
                </select>

                <select value={department} onChange={(event) => setDepartment(event.target.value)}>
                  <option value="">Department</option>
                  <option>Computer Science</option>
                  <option>Electronics & Comm.</option>
                  <option>Mechanical Engg.</option>
                  <option>Civil Engineering</option>
                  <option>Information Tech.</option>
                  <option>Electrical Engg.</option>
                </select>

                <button className="reset-button" onClick={resetFilters}>
                  <RotateCcw size={18} />
                  Reset
                </button>
              </div>
            </section>

            <label className="table-search">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by enrollment no. or name..."
              />
              <Search size={18} />
            </label>

            <section className="table-card">
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      {[
                        "Enrollment No.",
                        "Name",
                        "Department",
                        "Semester",
                        "Batch",
                        "Registration Status",
                      ].map((heading) => (
                        <th key={heading}>
                          {heading}
                          <ChevronsUpDown />
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {displayedStudents.map(
                      ([enrollment, name, dept, sem, studentBatch, studentStatus]) => (
                        <tr key={enrollment}>
                          <td>{enrollment}</td>
                          <td>{name}</td>
                          <td>{dept}</td>
                          <td>{sem}</td>
                          <td>{studentBatch}</td>
                          <td>
                            <span
                              className={`status ${studentStatus
                                .toLowerCase()
                                .replace(" ", "-")}`}
                            >
                              {studentStatus}
                            </span>
                          </td>
                        </tr>
                      )
                    )}

                    {!displayedStudents.length && (
                      <tr>
                        <td className="empty" colSpan="6">
                          No students found.
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

                  <span>1-{displayedStudents.length} of 1,248</span>
                </div>

                <div className="pages">
                  <button><ChevronLeft size={18} /></button>
                  <button className="current">1</button>
                  <button>2</button>
                  <button>3</button>
                  <span>...</span>
                  <button>125</button>
                  <button><ChevronRight size={18} /></button>
                </div>
              </footer>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}