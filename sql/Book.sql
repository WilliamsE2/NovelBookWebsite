
-- Single Book
select 
	b.cover_pic_id, 
	b.book_title, 
	b.author_name, 
	b.publishing_date_display, 
	b.page_count, 
	b.genre_id, 
	g.genre_title, 
	b.description, 
	b.link 
from book b 
inner join genres g on g.genre_id = b.genre_id 
where b.book_id = $1;

-- Get Lists for Book Dropdown
select 
	l.list_id, 
	l.list_name, 
	l.list, 
	(select $2 = any(l.list)) as in_list 
from list l 
where l.user_id = $1 and l.is_active = true 
order by l.list_id;

-- Get Recommended Books
select 
	b.book_id, 
	b.book_title, 
	b.author_name, 
	b.genre_id 
from book b 
where b.book_id != $1 
order by 
	case b.genre_id 
		when $2 then 1 
		else 2 
	end, random() 
limit 4;

-- Get Home Books
select
	b.book_id, 
	b.book_title, 
	b.cover_pic_id, 
	b.author_name
from book b 
order by b.book_id asc 
limit 4;

-- Get All Books
select 
	b.book_id, 
	b.book_title, 
	b.cover_pic_id, 
	b.author_name, 
	b.genre_id, 
	coalesce(br.overall_rating, 0) as overall_rating 
from book b 
left join book_rating br on br.book_id = b.book_id and br.is_active = true 
where b.is_active = true 
order by book_id;



select * from book;


