require('dotenv').config();

// Now you can access your variables anywhere like this:
const port = process.env.PORT || 3000;
console.log(`Server will run on port: ${port}`);
const schema = `
CREATE DATABASE college_management;

USE college_management;

CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS batches (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    batch_name VARCHAR(20) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_master (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    college_id VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    semester INT NOT NULL,
    section VARCHAR(10) NOT NULL,
    batch_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_batch
        FOREIGN KEY (batch_id)
        REFERENCES batches(id)
);

CREATE TABLE IF NOT EXISTS student_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    student_master_id BIGINT NOT NULL,
    college_id VARCHAR(20) NOT NULL,
    department VARCHAR(50) NOT NULL,
    semester INT NOT NULL,
    section VARCHAR(10) NOT NULL,
    batch_id BIGINT NOT NULL,
    total_xp INT DEFAULT 0,
    current_level INT DEFAULT 1,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (student_master_id) REFERENCES student_master(id),
    FOREIGN KEY (batch_id) REFERENCES batches(id)
);

CREATE TABLE IF NOT EXISTS professor_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    employee_id VARCHAR(20) NOT NULL UNIQUE,
    department VARCHAR(50) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_professor_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS coding_challenges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    task_id BIGINT,
    problem_statement TEXT,
    difficulty ENUM('beginner','intermediate','advance'),
    starter_code TEXT,
    expected_output TEXT
);

CREATE TABLE IF NOT EXISTS student_progress (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT,
    module_id BIGINT,
    status ENUM('locked','unlocked','completed'),
    completion_percentage INT
);

CREATE TABLE IF NOT EXISTS course_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS academic_subjects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    subject_code VARCHAR(20) UNIQUE NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    semester INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category_id BIGINT,
    difficulty VARCHAR(50),
    thumbnail_url VARCHAR(500),
    estimated_hours INT,
    status ENUM ('locked','unlocked','completed'),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_courses_category
    FOREIGN KEY (category_id)
    REFERENCES course_categories(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS course_professors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    professor_id BIGINT NOT NULL,
    assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_course_professors_course
    FOREIGN KEY (course_id)
    REFERENCES courses(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT fk_course_professors_professor
    FOREIGN KEY (professor_id)
    REFERENCES professor_profiles(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS academic_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    batch_id BIGINT NOT NULL,
    semester INT NOT NULL,
    total_marks DECIMAL(10,2) NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    cgpa DECIMAL(4,2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_academic_records_student
    FOREIGN KEY (student_id)
    REFERENCES student_master(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT fk_academic_records_batch
    FOREIGN KEY (batch_id)
    REFERENCES batches(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS academic_record_details (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    academic_record_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    marks_obtained DECIMAL(5,2) NOT NULL,
    maximum_marks DECIMAL(5,2) NOT NULL,

    CONSTRAINT fk_record_details_record
    FOREIGN KEY (academic_record_id)
    REFERENCES academic_records(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT fk_record_details_subject
    FOREIGN KEY (subject_id)
    REFERENCES academic_subjects(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS submissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    task_id BIGINT NOT NULL,
    score DECIMAL(5,2),
    status VARCHAR(50) NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_submissions_student
    FOREIGN KEY (student_id)
    REFERENCES student_master(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS xp_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    xp_points INT NOT NULL,
    source VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_xp_logs_student
    FOREIGN KEY (student_id)
    REFERENCES student_master(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS modules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    sequence_order INT NOT NULL,
    xp_reward INT DEFAULT 0,
    estimated_time INT DEFAULT 0,

    CONSTRAINT fk_modules_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    module_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    task_type ENUM(
        'Quiz',
        'Assignment',
        'Coding Challenge',
        'Project',
        'Capstone'
    ) NOT NULL,
    xp_reward INT DEFAULT 0,
    FOREIGN KEY (module_id) REFERENCES modules(id)
);

CREATE TABLE IF NOT EXISTS quizzes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    task_id BIGINT NOT NULL,
    total_marks INT NOT NULL,
    pass_percentage INT NOT NULL,
    time_limit INT NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);

CREATE TABLE IF NOT EXISTS quiz_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quiz_id BIGINT NOT NULL,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer VARCHAR(1) NOT NULL,
    difficulty ENUM(
        'beginner',
        'moderate'
    ) NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);





CREATE TABLE IF NOT EXISTS resources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    module_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    resource_type ENUM(
        'PDF',
        'PPT',
        'Video',
        'Document',
        'Link'
    ) NOT NULL,
    uploaded_by BIGINT NOT NULL,
    FOREIGN KEY (module_id) REFERENCES modules(id)
);



CREATE TABLE IF NOT EXISTS learning_paths (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS enrollments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_enrollment_student
        FOREIGN KEY (student_id)
        REFERENCES student_master(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_enrollment_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS chatbot_documents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    uploaded_by INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_chatbot_document_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_chatbot_document_user
        FOREIGN KEY (uploaded_by)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS badges (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS student_badges (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    badge_id BIGINT NOT NULL,
    earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (badge_id) REFERENCES badges(id)
);

CREATE TABLE IF NOT EXISTS ai_generations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    professor_id BIGINT NOT NULL,
    content_type ENUM(
        'Quiz',
        'Assignment',
        'Summary',
        'Question Bank'
    ) NOT NULL,
    prompt LONGTEXT NOT NULL,
    generated_content LONGTEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_ai_generation_professor
        FOREIGN KEY (professor_id)
        REFERENCES professor_profiles(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS certificates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    certificate_file VARCHAR(500) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_certificate_student
        FOREIGN KEY (student_id)
        REFERENCES student_master(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS achievements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    achievement_date DATE NOT NULL,
    supporting_file VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_achievement_student
        FOREIGN KEY (student_id)
        REFERENCES student_master(id)
        ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS path_courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    path_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    sequence_order INT NOT NULL,

    CONSTRAINT fk_path_course_path
        FOREIGN KEY (path_id)
        REFERENCES learning_paths(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_path_course_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS publications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    paper_title VARCHAR(500) NOT NULL,
    journal_name VARCHAR(255) NOT NULL,
    publication_date DATE NOT NULL,
    doi_link VARCHAR(500),
    pdf_file VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_publication_student
        FOREIGN KEY (student_id)
        REFERENCES student_master(id)
        ON DELETE CASCADE
);
`;

