
create table if not exists user_transaction(
	user_transaction_id varchar(36) primary key, 
	creation_date timestamp
);

create table if not exists "user"(
	user_id serial primary key, 
	email varchar(200), 
	"password" varchar(200), 
	first_name varchar(200), 
	last_name varchar(200), 
	profile_pic_id smallint, 
	is_active boolean, 
	update_date timestamp, 
	creation_date timestamp, 
	user_transaction_id varchar(36) references user_transaction(user_transaction_id)
);

create table if not exists user_history(
	user_history_id serial primary key,
	user_id integer references "user"(user_id), 
	email varchar(200), 
	"password" varchar(200), 
	first_name varchar(200), 
	last_name varchar(200), 
	profile_pic_id smallint, 
	is_active boolean, 
	update_date timestamp, 
	creation_date timestamp, 
	user_transaction_id varchar(36) references user_transaction(user_transaction_id)
);

create table if not exists user_review(
	user_review_id serial primary key,
	user_id integer references "user"(user_id), 
	number_of_reviews integer, 
	books_read integer, 
	is_active boolean, 
	update_date timestamp, 
	creation_date timestamp
);


create table if not exists genres(
	genre_id serial primary key, 
	genre_title varchar(200), 
	is_fiction boolean, 
	display_order integer, 
	is_active boolean, 
	creation_date timestamp
);


/*create table if not exists author(
	author_id serial primary key, 
	author_name varchar(60), 
	author_pic_id smallint, 
	genre_id smallint references genres(genre_id), 
	description varchar(2000), 
	is_active boolean, 
	update_date timestamp, 
	creation_date timestamp
);
author_id integer references author(author_id), 
*/


create table if not exists book_transaction(
	book_transaction_id varchar(36) primary key, 
	creation_date timestamp
);

create table if not exists book(
	book_id serial primary key, 
	book_title varchar(200), 
	author_name varchar(200), 
	publishing_date timestamp, 
	publishing_date_display varchar(30), 
	page_count smallint, 
	genre_id smallint references genres(genre_id), 
	link varchar(2000), 
	cover_pic_id smallint, 
	description varchar(2000), 
	is_active boolean, 
	update_date timestamp, 
	creation_date timestamp, 
	book_transaction_id varchar(36) references book_transaction(book_transaction_id)
);

create table if not exists book_history(
	book_history_id serial primary key, 
	book_id integer references book(book_id), 
	book_title varchar(200), 
	author_name varchar(200), 
	publishing_date timestamp, 
	publishing_date_display varchar(30), 
	page_count smallint, 
	genre_id smallint references genres(genre_id), 
	link varchar(2000), 
	cover_pic_id smallint, 
	description varchar(2000), 
	is_active boolean, 
	update_date timestamp, 
	creation_date timestamp, 
	book_transaction_id varchar(36) references book_transaction(book_transaction_id)
);

create table if not exists book_rating(
	book_rating_id serial primary key, 
	book_id integer references book(book_id), 
	overall_rating real, 
	number_of_reviews integer, 
	is_active boolean, 
	update_date timestamp, 
	creation_date timestamp
);

create table if not exists book_review(
	book_review_id serial primary key, 
	book_id integer references book(book_id), 
	user_id integer references "user"(user_id), 
	rating smallint, 
	review_description varchar(10000), 
	is_active boolean, 
	update_date timestamp, 
	creation_date timestamp
);


create table if not exists list(
	list_id serial primary key, 
	user_id integer references "user"(user_id), 
	list_name varchar(200), 
	list integer[], 
	deletable boolean, 
	is_active boolean, 
	update_date timestamp, 
	creation_date timestamp
);




