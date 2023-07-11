
-- Login --

-- User Credentials
select u."password" from "user" u 
where u.email = $1;



-- Register --

-- Check Duplicate Email
select u.email from "user" u 
where u.email = $1 and u.is_active = true;


-- Create User
insert into "user" 
(
	email, 
	"password", 
	first_name, 
	last_name, 
	profile_pic_id, 
	is_active, 
	update_date, 
	creation_date, 
	user_transaction_id
)
values
(
	$1, 
	$2, 
	$3, 
	$4, 
	1, 
	true, 
	current_timestamp, 
	current_timestamp, 
	$5
)
returning *;

insert into user_history 
(
	user_id, 
	email, 
	"password", 
	first_name, 
	last_name, 
	profile_pic_id, 
	is_active, 
	update_date, 
	creation_date, 
	user_transaction_id
)
values
(
	$1, 
	$2, 
	$3, 
	$4,
	$5
	1, 
	true, 
	current_timestamp, 
	current_timestamp, 
	$6
)
returning *;

insert into user_review
(
	user_id, 
	number_of_reviews, 
	books_read, 
	is_active, 
	update_date, 
	creation_date
)
values
(
	$1, 
	0, 
	0, 
	true, 
	current_timestamp, 
	current_timestamp
)
returning *;


-- Account
select 
	u.first_name, 
	u.last_name, 
	u.profile_pic_id, 
	u.creation_date, 
	ur.number_of_reviews, 
	ur.books_read 
from "user" u 
inner join user_review ur on ur.user_id = u.user_id 
where u.user_id = $1;


-- Edit Account
select 
	u.email, 
	u."password", 
	u.first_name, 
	u.last_name, 
	u.profile_pic_id 
from "user" u 
where u.user_id = $1;

-- Update Profile Pic
update "user" 
set profile_pic_id = $1 
where user_id = $2;

-- Update Name
update "user" 
set first_name = $1, last_name = $2 
where user_id = $3;

-- Update Email
update "user" 
set email = $1 
where user_id = $2;

-- Check Duplicate Email
select count(*) 
from "user" u 
where u.email = $1 and u.is_active = true;

-- Update Password
update "user" 
set "password" = $1 
where user_id = $2;



select * from "user";





