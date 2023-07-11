
-- Get All Book Reviews
select 
	br.book_review_id, 
	u.user_id, 
	u.first_name, 
	u.last_name, 
	u.profile_pic_id, 
	br.rating, 
	br.review_description, 
	br.update_date 
from book_review br 
inner join "user" u on u.user_id = br.user_id and u.is_active = true 
where br.book_id = $1 and br.is_active = true;

-- Get Book Ratings
select 
	bra.overall_rating, 
	bra.number_of_reviews, 
	sum(case when br.rating = 5 then 1 else 0 end) as five_count, 
	sum(case when br.rating = 4 then 1 else 0 end) as four_count, 
	sum(case when br.rating = 3 then 1 else 0 end) as three_count, 
	sum(case when br.rating = 2 then 1 else 0 end) as two_count, 
	sum(case when br.rating = 1 then 1 else 0 end) as one_count 
from book_rating bra 
left join book_review br on br.book_id = bra.book_id and br.is_active = true 
where bra.book_id = $1 and bra.is_active = true 
group by bra.overall_rating, bra.number_of_reviews;

-- Get All User Book Reviews
select 
	b.book_id, 
	b.book_title, 
	b.cover_pic_id, 
	br.rating, 
	br.review_description, 
	br.update_date 
from book_review br 
inner join book b on b.book_id = br.book_id and b.is_active = true 
where br.user_id = $1 and br.is_active = true;

-- Get User Book Review
select 
	b.cover_pic_id, 
	br.rating, 
	br.review_description, 
	br.update_date 
from book_review br 
inner join book b on b.book_id = br.book_id and b.is_active = true 
where br.user_id = $1 and br.book_id = $2 and br.is_active = true;

-- Create Review
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
	$1, 
	$2, 
	$3, 
	$4, 
	true, 
	current_timestamp, 
	current_timestamp
);

update user_review 
set number_of_reviews = number_of_reviews + 1, books_read = books_read + 1, update_date = current_timestamp 
where user_id = $1 and is_active = true;

update book_rating 
set number_of_reviews = number_of_reviews + 1, overall_rating = $2, update_date = current_timestamp 
where book_id = $1 and is_active = true;

-- Delete Review
update book_review 
set is_active = false, update_date = current_timestamp 
where user_id = $1 and is_active = true;

update user_review 
set number_of_reviews = number_of_reviews - 1, update_date = current_timestamp 
where user_id = $1 and is_active = true;

update book_rating 
set number_of_reviews = number_of_reviews - 1, overall_rating = $2, update_date = current_timestamp 
where book_id = $1 and is_active = true;



select * from book_review br;
select * from book_rating br;
select * from user_review ur;



