CREATE SEQUENCE p_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE products(
    p_id CHAR(10) PRIMARY KEY DEFAULT 'PR-' || lpad(nextval('p_seq')::text, 2, '0'),
    p_name VARCHAR (150) NOT NULL,
    p_price INT NOT NULL,
    in_stock INT NOT NULL,
    extras VARCHAR(200),
    p_type char(30),
    f_name VARCHAR(50)
);


CREATE TYPE condition AS ENUM ('pending' , 'out', 'delivered', 'failed');
CREATE SEQUENCE s_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE sales(
    s_id CHAR(10) PRIMARY KEY DEFAULT 'S-' || lpad(nextval('s_seq')::text, 3, '0'),
    p_id CHAR(10) REFERENCES products(p_id),
    s_date DATE NOT NULL,
    qty INT NOT NULL,
    tel CHAR(10) NOT NULL,
    hostel VARCHAR(100),
    nickname varchar (50),
    order_is condition NOT NULL
);


CREATE SEQUENCE re_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE restocks(
    re_id CHAR(10) PRIMARY KEY DEFAULT 'RE-' || lpad(nextval('s_seq')::text, 3, '0'),
    s_date DATE NOT NULL,
    p_id CHAR(10) REFERENCES products(p_id),
    qty INT NOT NULL
);

INSERT INTO products(p_name, p_price, in_stock, extras, p_type, f_name) values('Captain Morgan Gold', '35000', '5', '750ml', 'rum', 'cpt.jpg');
INSERT INTO products(p_name, p_price, in_stock, extras, p_type, f_name) values('Uganda Waragi', '30000', '5', '750ml', 'gin', 'ugw.jpg');