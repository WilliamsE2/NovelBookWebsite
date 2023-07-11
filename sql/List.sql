
-- Get Lists *not used*
select 
	row_number () over (order by l.list_id), 
	l.list_id, 
	l.list_name, 
	l.list, 
	l.deletable 
from list l 
where l.user_id = $1 and l.is_active = true;

-- Get List's Books *not used*
select 
	b.book_id, 
	b.book_title, 
	b.author_name, 
	coalesce(br.rating, 0) 
from book b 
left join book_review br on br.book_id = b.book_id and br.user_id = $1 
where b.book_id in $2;

-- Combined, get lists and books
select 
	row_number () over (order by l.list_id), 
	l.list_id, 
	l.list_name, 
	json_agg(json_build_object('book_id', b.book_id, 'book_title', b.book_title, 'author_name', b.author_name, 'rating', coalesce(br.rating, 0))) as book_list, 
	l.deletable 
from list l 
cross join unnest(l.list) as listId 
inner join book b on b.book_id = listId 
left join book_review br on br.book_id = b.book_id and br.user_id = $1 
where l.user_id = $1 and l.is_active = true 
group by l.list_id 
union all 
select 
	row_number () over (order by l2.list_id), 
	l2.list_id, 
	l2.list_name, 
	json_agg(json_build_object('book_id', -1, 'book_title', '', 'author_name', '', 'rating', '')) as book_list, 
	l2.deletable 
from list l2 
where l2.user_id = $1 and l2.is_active = true and l2.list = '{}' 
group by l2.list_id;

select row_number() over (order by list_id), * from (
	select 
		l.list_id, 
		l.list_name, 
		json_agg(json_build_object('book_id', b.book_id, 'book_title', b.book_title, 'cover_pic_id', b.cover_pic_id, 'author_name', b.author_name, 'rating', coalesce(br.rating, 0))) as book_list, 
		l.deletable 
	from list l 
	cross join unnest(l.list) as listId 
	inner join book b on b.book_id = listId 
	left join book_review br on br.book_id = b.book_id and br.user_id = $1 and br.is_active = true 
	where l.user_id = $1 and l.is_active = true 
	group by l.list_id 
	union all 
	select 
		l2.list_id, 
		l2.list_name, 
		json_agg(json_build_object('book_id', -1, 'book_title', '', 'cover_pic_id', '', 'author_name', '', 'rating', '')) as book_list, 
		l2.deletable 
	from list l2 
	where l2.user_id = $1 and l2.is_active = true and l2.list = '{}' 
	group by l2.list_id
) lists;

-- Create List
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
	$1, 
	$2, 
	'{}', 
	true, 
	true, 
	current_timestamp, 
	current_timestamp
);

-- Create List with Book
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
	$1, 
	$2, 
	$3, 
	true, 
	true, 
	current_timestamp, 
	current_timestamp
);

-- Delete List
update list 
set is_active = false 
where user_id = $1 and list_id = $2;

-- Add Book to List
update list 
set list = array_append(list, $3) 
where user_id = $1 and list_id = $2;

-- Remove Book from List
update list 
set list = array_remove(list, $3) 
where user_id = $1 and list_id = $2;



select * from list;




