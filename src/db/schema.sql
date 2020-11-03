-- SCHEMA FOR USERS
CREATE TABLE IF NOT EXISTS users (
    id INTEGER,
    username VARCHAR,
    pw VARCHAR,
    PRIMARY KEY (id)
);

INSERT INTO users(id, username, pw) VALUES (1, 'admin', 'welove3103');
INSERT INTO users(id, username, pw) VALUES (2, 'bob', 'qwerty');
INSERT INTO users(id, username, pw) VALUES (3, 'charlie', 'password');

-- SCHEMA FOR E-COMMERCE ITEM
CREATE TABLE IF NOT EXISTS products (
    id INTEGER,
    item_name VARCHAR,
    price NUMERIC,
    promo_code VARCHAR,
    internal_comments VARCHAR,
    PRIMARY KEY (id)
);

INSERT INTO products(id, item_name, price, promo_code, internal_comments) 
    VALUES (1, 'Fan', 10.5, '3103ISTHEBEST', '');
INSERT INTO products(id, item_name, price, promo_code, internal_comments) 
    VALUES (2, 'Wardrobe', 5.5, '3103ISTHEBEST', '');

-- SCHEMA FOR REVIEWS
CREATE TABLE IF NOT EXISTS reviews(
    id INTEGER,
    user_id INTEGER, 
    review VARCHAR,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
