
-- Get Genres
select 
	g.genre_id, 
	g.genre_title, 
	g.is_fiction 
from genres g 
where g.is_active = true 
order by g.display_order;



select * from genres g;
