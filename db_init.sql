CREATE DATABASE guestbook;
USE guestbook;

CREATE TABLE guest(
	id INT auto_increment,
    first VARCHAR(255),
    last VARCHAR(255),
    job VARCHAR(255),
    company VARCHAR(255),
    linkedin VARCHAR(255),
    email VARCHAR(255),
    meet VARCHAR(255),
    other VARCHAR(255),
    message VARCHAR(255),
    mailing VARCHAR(255),
    format VARCHAR(255),
    created_at DATETIME DEFAULT NOW(),
    
	PRIMARY KEY(id)
);

INSERT INTO guest (first, last, job, company, linkedin, email, meet, other, message, mailing, format) VALUES 
	("Shiroko", "Sunaookami", "Biker", "Abydos", "https://notarealsite.com", "Shirosuna465@aby.com", "meetup", "", "", "yes", "html"),
    ("Hastune", "Miku", "Singer", "Crypton", "https://piapro.net/intl/en.html", "mikuhatsune01@vo.com", "other", "digital meetup", "Hello, nice to see you again.", "no", "text");