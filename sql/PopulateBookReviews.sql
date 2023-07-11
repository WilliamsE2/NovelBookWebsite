
-- 1
insert into book_review
(
	book_id, 
	user_id,  
	rating, 
	review_description, 
	is_active, 
	update_date, 
	creation_date
)
values
(
	1, 
	2, 
	3, 
	'It''s hard for me to believe that I finished the Harry Potter series... I wish this series would go on forever! I don''t know how I''ve gone through my life without these books. I regret not reading it when I was younger, but I am so happy that I finally did, better late than never, right? The world built in these books is so real and tangible, it is truly a masterpiece. The characters are engaging and brilliant, and I love how the plot is so interwoven and twisted within itself, especially in this last book.', 
	true, 
	current_timestamp, 
	current_timestamp
);

update user_review 
set number_of_reviews = 1, books_read = 1, update_date = current_timestamp 
where user_id = 2;

-- 2
insert into book_review
(
	book_id, 
	user_id,  
	rating, 
	review_description, 
	is_active, 
	update_date, 
	creation_date
)
values
(
	1, 
	3, 
	5, 
	'The six-year build-up is over. The final adventure, towards which we''ve been sailing for - through six amazing Hogwarts years - is here at last. And yet again, Rowling surpasses her own standards to bring us the most adventurous book of the entire series, to conclude everything is a most dramatic way. Twist after twist after twist is going to keep the reader immersed more than ever. Be warned: once started, you won''t have a moment''s rest till your finish this one!', 
	true, 
	current_timestamp, 
	current_timestamp
);

update user_review 
set number_of_reviews = 1, books_read = 1, update_date = current_timestamp 
where user_id = 3;

-- 3
insert into book_review
(
	book_id, 
	user_id,  
	rating, 
	review_description, 
	is_active, 
	update_date, 
	creation_date
)
values
(
	1, 
	4, 
	4, 
	'I’m thrilled to say that I managed to follow through with at least one book related commitment this year, and that was to read the entire Harry Potter series for the first time. It’s tough to pick a favorite from the group, but the Deathly Hallows is a worthy contender for that coveted first spot. As the dark tension that began growing at the finish of the Goblet of Fire has come full circle, I felt this was the perfect finale to a (rightfully) highly acclaimed series. I’m so happy to have finally experienced first hand this beloved story arc that so many readers hold dear to their heart.', 
	true, 
	current_timestamp, 
	current_timestamp
);

update user_review 
set number_of_reviews = 1, books_read = 1, update_date = current_timestamp 
where user_id = 4;


-- Update Book's Rating Info
update book_rating 
set number_of_reviews = 3, overall_rating = 4, update_date = current_timestamp 
where book_id = 1;




select * from book_review br;
select * from book_rating br;
select * from user_review ur;


