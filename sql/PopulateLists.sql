
-- User 1
insert into list
(
	user_id, 
	list_name, 
	list, 
	deletable, 
	is_active, 
	update_date, 
	creation_date
)
values
(
	1, 
	'Read', 
	'{1, 2, 3}', 
	false, 
	true, 
	current_timestamp, 
	current_timestamp
);

insert into list
(
	user_id, 
	list_name, 
	list, 
	deletable, 
	is_active, 
	update_date, 
	creation_date
)
values
(
	1, 
	'My Reading List', 
	'{4, 6}', 
	false, 
	true, 
	current_timestamp, 
	current_timestamp
);

insert into list
(
	user_id, 
	list_name, 
	list, 
	deletable, 
	is_active, 
	update_date, 
	creation_date
)
values
(
	1, 
	'Favorites', 
	'{3}', 
	true, 
	true, 
	current_timestamp, 
	current_timestamp
);


select * from list;




