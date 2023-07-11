
-- Initial Transaction
insert into user_transaction 
(
	user_transaction_id, 
	creation_date
)
values
(
	'8480251a-fc56-4311-90f7-e35d86b52564', 
	current_timestamp
);

-- 1
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
	'erwilliams331@gmail.com', 
	'dummy', 
	'Evan', 
	'Williams', 
	1, 
	true, 
	current_timestamp, 
	current_timestamp, 
	'8480251a-fc56-4311-90f7-e35d86b52564'
);

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
	1, 
	'erwilliams331@gmail.com', 
	'dummy', 
	'Evan', 
	'Williams', 
	1, 
	true, 
	current_timestamp, 
	current_timestamp, 
	'8480251a-fc56-4311-90f7-e35d86b52564'
);

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
	1, 
	0, 
	0, 
	true, 
	current_timestamp, 
	current_timestamp
);

-- 2
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
	'brynwilliams829@gmail.com', 
	'dummy', 
	'Brynn', 
	'Williams', 
	2, 
	true, 
	current_timestamp, 
	current_timestamp, 
	'8480251a-fc56-4311-90f7-e35d86b52564'
);

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
	2, 
	'brynwilliams@gmail.com', 
	'dummy', 
	'Brynn', 
	'Williams', 
	2, 
	true, 
	current_timestamp, 
	current_timestamp, 
	'8480251a-fc56-4311-90f7-e35d86b52564'
);

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
	2, 
	0, 
	0, 
	true, 
	current_timestamp, 
	current_timestamp
);

-- 3
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
	'jakeplutz@gmail.com', 
	'dummy', 
	'Jacob', 
	'Plutz', 
	3, 
	true, 
	current_timestamp, 
	current_timestamp, 
	'8480251a-fc56-4311-90f7-e35d86b52564'
);

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
	3, 
	'jakeplutz@gmail.com', 
	'dummy', 
	'Jacob', 
	'Plutz', 
	3, 
	true, 
	current_timestamp, 
	current_timestamp, 
	'8480251a-fc56-4311-90f7-e35d86b52564'
);

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
	3, 
	0, 
	0, 
	true, 
	current_timestamp, 
	current_timestamp
);

-- 4
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
	'tylerquinn@gmail.com', 
	'dummy', 
	'Tyler', 
	'Quinn', 
	1, 
	true, 
	current_timestamp, 
	current_timestamp, 
	'8480251a-fc56-4311-90f7-e35d86b52564'
);

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
	4, 
	'tylerquinn@gmail.com', 
	'dummy', 
	'Tyler', 
	'Quinn', 
	1, 
	true, 
	current_timestamp, 
	current_timestamp, 
	'8480251a-fc56-4311-90f7-e35d86b52564'
);

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
	4, 
	0, 
	0, 
	true, 
	current_timestamp, 
	current_timestamp
);




select * from "user";
select * from user_history;
select * from user_transaction;
select * from user_review;



