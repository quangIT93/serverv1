CREATE TABLE chat_address (
    chat_id INTEGER NOT NULL,
    address varchar(255) default null,
    latitude decimal(8, 6) default null,
    longitude decimal(9, 6) default null,
    PRIMARY KEY (chat_id),
    FOREIGN KEY (chat_id) REFERENCES chats (id) ON UPDATE CASCADE ON DELETE CASCADE
)

