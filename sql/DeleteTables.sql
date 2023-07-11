
drop table if exists
	public.book_review, 
	public.book_rating, 
	public.book_history, 
	public.book, 
	public.book_transaction, 
	public.genres, 
	public.list, 
	public.user_history, 
	public.user_review, 
	public."user", 
	public.user_transaction, 
	public.author
;

drop table if exists public.book_review;

-- Drop constraints if have to
alter table if exists "user" 
drop constraint if exists user_id;

select * from "user" u;

select * from public.author;
