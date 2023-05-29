CREATE TABLE search_history (
    account_id VARCHAR(50) NOT NULL,
    keyword VARCHAR(255) NOT NULL,
    count INT NOT NULL DEFAULT 1,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (account_id, keyword)
    FOREIGN KEY (account_id) REFERENCES accounts (id)
)