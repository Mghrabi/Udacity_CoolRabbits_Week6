/* Replace with your SQL commands */
CREATE TABLE students_sessions (
    id SERIAL UNIQUE,
    studentId INT NOT NULL,
    sessionId INT NOT NULL,
    FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (sessionId) REFERENCES sessions(id) ON DELETE CASCADE,
    PRIMARY KEY(studentId, sessionId)
);