CREATE TABLE fcm_token (
    token varchar(100) NOT NULL,
    user_id varchar(50) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (token),
    CONSTRAINT fk_fcm_user_id FOREIGN KEY (user_id) REFERENCES accounts(id) 
);

-- DESCRIBE accounts;