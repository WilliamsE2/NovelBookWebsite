
insert into author
(
	author_name, 
	genres, 
	description, 
	creation_date
)
values
(
	'Thomas Sowell', 
	array[1], 
	'Greatest economist ever', 
	current_timestamp
);


insert into genres
(
	genre_title, 
	creation_date
)
values
(
	'Politics', 
	current_timestamp
);


insert into book
(
	book_title, 
	author_id, 
	publishing_date, 
	page_count, 
	genres, 
	overall_rating, 
	number_of_reviews, 
	link, 
	description, 
	update_date, 
	creation_date
)
values
(
	'Black Rednecks and White Liberals', 
	1, 
	'2005-04-30 00:00:00', 
	372, 
	array[1], 
	null, 
	0, 
	'https://www.amazon.com/Black-Rednecks-Liberals-Thomas-Sowell/dp/1594031436/ref=sr_1_1?keywords=black+rednecks+and+white+liberals+thomas+sowell&qid=1682903976&sprefix=black+redneck%2Caps%2C144&sr=8-1', 
	'This book presents the kind of eye-opening insights into the history and culture of race for which Sowell has become famous.', 
	current_timestamp, 
	current_timestamp
);


