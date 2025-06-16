-- Inserting admin user with bcrypt encoded password for 'Cis@1081'
INSERT INTO users (id, username, password, email, role)
VALUES (
    1,
    'admin',
    '$2a$10$6UVHQoHhpoYZxIWHR9PSuOvjn5H1oAW9MuQBVF5Vx6c0N/TgV5Vw.',
    'admin@itinventory.com',
    'ROLE_ADMIN'
) ON CONFLICT (id) DO NOTHING; 