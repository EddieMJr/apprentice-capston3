-- CREATE TABLE IF NOT EXISTS accounts (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     firstName VARCHAR(255) NOT NULL,
--     lastName VARCHAR(255) NOT NULL,
--     username VARCHAR(255) NOT NULL UNIQUE,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL,
--     xp INT NOT NULL DEFAULT 0,
--     totalAttempts INT NOT NULL DEFAULT 0
-- );


-- -- INSERT INTO accounts (firstName, lastName, username, password, xp, totalAttempts)
-- -- VALUES
-- -- ('Jack', 'Miller', 'JackieM', 'spidermanFan95!', 120, 15),
-- -- ('Mary', 'Smith', 'ssmith', 'gilmoreGirl68!!', 300, 40);

-- -- SHOW TABLES;

-- SELECT * FROM accounts;

-- ALTER TABLE accounts
-- ADD COLUMN role VARCHAR(255) NOT NULL DEFAULT 'user';

-- INSERT INTO accounts (firstName, lastName, username, email, password, xp, totalAttempts)
-- VALUES
-- ("Amy", "Gutierrez", "amyG", "amyg@example.com", "$2b$10$uT1MZLJH0t2FpNcV7JqKauz6q8N3PVxFrRg5jB7RR3D1gr5pPDn9e", 25, 7),
-- ("Niaria", "Rice", "theOnlyNRice", "nrice@example.com", "$2b$10$uT1MZLJH0t2FpNcV7JqKauz6q8N3PVxFrRg5jB7RR3D1gr5pPDn9e", 25, 7),
-- ("Edgardo", "Torres", "ETnotTheAlien", "et@example.com", "$2b$10$uT1MZLJH0t2FpNcV7JqKauz6q8N3PVxFrRg5jB7RR3D1gr5pPDn9e", 5, 2);

-- UPDATE accounts
-- SET role = 'admin'
-- WHERE username = 'eddiemjr';

-- UPDATE accounts
-- SET role = 'admin'
-- WHERE username = 'MrET';

-- UPDATE accounts
-- SET role = 'admin'
-- WHERE username = 'amy_account';

SELECT * FROM accounts;