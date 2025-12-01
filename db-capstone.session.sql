-- CREATE TABLE IF NOT EXISTS accounts (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     firstName VARCHAR(255) NOT NULL,
--     lastName VARCHAR(255) NOT NULL,
--     username VARCHAR(255) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL,
--     xp INT NOT NULL DEFAULT 0,
--     totalAttempts INT NOT NULL DEFAULT 0
-- );


-- INSERT INTO accounts (firstName, lastName, username, password, xp, totalAttempts)
-- VALUES
-- ('Jack', 'Miller', 'JackieM', 'spidermanFan95!', 120, 15),
-- ('Mary', 'Smith', 'ssmith', 'gilmoreGirl68!!', 300, 40);

-- SHOW TABLES;

SELECT * FROM accounts;