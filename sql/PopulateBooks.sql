
select * from book_transaction;
select * from book;
select * from book_history;


-- Initial Transaction
insert into book_transaction 
(
	book_transaction_id, 
	creation_date
)
values
(
	'9e95dd6a-0cb9-11ee-be56-0242ac120002', 
	current_timestamp
);


-- 1
insert into book
(
	book_title, 
	author_name, 
	publishing_date, 
	publishing_date_display, 
	page_count, 
	genre_id, 
	link, 
	cover_pic_id, 
	description, 
	is_active, 
	update_date, 
	creation_date, 
	book_transaction_id
)
values
(
	'Harry Potter and the Deathly Hallows', 
	'J.K. Rowling', 
	'July 21, 2007', 
	'July 21, 2007', 
	607, 
	4, 
	'https://www.amazon.com/Harry-Potter-Deathly-Hallows-Book/dp/0545139708', 
	1, 
	'Readers beware. The brilliant, breathtaking conclusion to J.K. Rowling''s spellbinding series is not for the faint of heart -- such revelations, battles, and betrayals await in Harry Potter and the Deathly Hallows that no fan will make it to the end unscathed. Luckily, Rowling has prepped loyal readers for the end of her series by doling out increasingly dark and dangerous tales of magic and mystery, shot through with lessons about honor and contempt, love and loss, and right and wrong. Fear not, you will find no spoilers in our review -- to tell the plot would ruin the journey, and Harry Potter and the Deathly Hallows is an odyssey the likes of which Rowling''s fans have not yet seen, and are not likely to forget. But we would be remiss if we did not offer one small suggestion before you embark on your final adventure with Harry -- bring plenty of tissues. The heart of Book 7 is a hero''s mission -- not just in Harry''s quest for the Horcruxes, but in his journey from boy to man -- and Harry faces more danger than that found in all six books combined, from the direct threat of the Death Eaters and you-know-who, to the subtle perils of losing faith in himself. Attentive readers would do well to remember Dumbledore''s warning about making the choice between "what is right and what is easy," and know that Rowling applies the same difficult principle to the conclusion of her series. While fans will find the answers to hotly speculated questions about Dumbledore, Snape, and you-know-who, it is a testament to Rowling''s skill as a storyteller that even the most astute and careful reader will be taken by surprise.', 
	true, 
	current_timestamp, 
	current_timestamp, 
	'9e95dd6a-0cb9-11ee-be56-0242ac120002'
);

insert into book_history
(
	book_id, 
	book_title, 
	author_name, 
	publishing_date, 
	publishing_date_display, 
	page_count, 
	genre_id, 
	link, 
	cover_pic_id, 
	description, 
	is_active, 
	update_date, 
	creation_date, 
	book_transaction_id
)
values
(
	1, 
	'Harry Potter and the Deathly Hallows', 
	'J.K. Rowling', 
	'July 21, 2007', 
	'July 21, 2007', 
	607, 
	4, 
	'https://www.amazon.com/Harry-Potter-Deathly-Hallows-Book/dp/0545139708', 
	1, 
	'Readers beware. The brilliant, breathtaking conclusion to J.K. Rowling''s spellbinding series is not for the faint of heart -- such revelations, battles, and betrayals await in Harry Potter and the Deathly Hallows that no fan will make it to the end unscathed. Luckily, Rowling has prepped loyal readers for the end of her series by doling out increasingly dark and dangerous tales of magic and mystery, shot through with lessons about honor and contempt, love and loss, and right and wrong. Fear not, you will find no spoilers in our review -- to tell the plot would ruin the journey, and Harry Potter and the Deathly Hallows is an odyssey the likes of which Rowling''s fans have not yet seen, and are not likely to forget. But we would be remiss if we did not offer one small suggestion before you embark on your final adventure with Harry -- bring plenty of tissues. The heart of Book 7 is a hero''s mission -- not just in Harry''s quest for the Horcruxes, but in his journey from boy to man -- and Harry faces more danger than that found in all six books combined, from the direct threat of the Death Eaters and you-know-who, to the subtle perils of losing faith in himself. Attentive readers would do well to remember Dumbledore''s warning about making the choice between "what is right and what is easy," and know that Rowling applies the same difficult principle to the conclusion of her series. While fans will find the answers to hotly speculated questions about Dumbledore, Snape, and you-know-who, it is a testament to Rowling''s skill as a storyteller that even the most astute and careful reader will be taken by surprise.', 
	true, 
	current_timestamp, 
	current_timestamp, 
	'9e95dd6a-0cb9-11ee-be56-0242ac120002'
);

insert into book_rating
(
	book_id, 
	overall_rating, 
	number_of_reviews, 
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
insert into book
(
	book_title, 
	author_name, 
	publishing_date, 
	publishing_date_display, 
	page_count, 
	genre_id, 
	link, 
	cover_pic_id, 
	description, 
	is_active, 
	update_date, 
	creation_date, 
	book_transaction_id
)
values
(
	'Atomic Habits', 
	'James Clear', 
	'October 18, 2018', 
	'October 18, 2018', 
	320, 
	21, 
	'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299', 
	2, 
	'No matter your goals, Atomic Habits offers a proven framework for improving -- every day. James Clear, one of the world''s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you''re having trouble changing your habits, the problem isn''t you. The problem is your system. Bad habits repeat themselves again and again not because you don''t want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you''ll get a proven system that can take you to new heights. Clear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field.', 
	true, 
	current_timestamp, 
	current_timestamp, 
	'9e95dd6a-0cb9-11ee-be56-0242ac120002'
);

insert into book_history
(
	book_id, 
	book_title, 
	author_name, 
	publishing_date, 
	publishing_date_display, 
	page_count, 
	genre_id, 
	link, 
	cover_pic_id, 
	description, 
	is_active, 
	update_date, 
	creation_date, 
	book_transaction_id
)
values
(
	2, 
	'Atomic Habits', 
	'James Clear', 
	'October 18, 2018', 
	'October 18, 2018', 
	320, 
	21, 
	'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299', 
	2, 
	'No matter your goals, Atomic Habits offers a proven framework for improving -- every day. James Clear, one of the world''s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you''re having trouble changing your habits, the problem isn''t you. The problem is your system. Bad habits repeat themselves again and again not because you don''t want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you''ll get a proven system that can take you to new heights. Clear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field.', 
	true, 
	current_timestamp, 
	current_timestamp, 
	'9e95dd6a-0cb9-11ee-be56-0242ac120002'
);

insert into book_rating
(
	book_id, 
	overall_rating, 
	number_of_reviews, 
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
insert into book
(
	book_title, 
	author_name, 
	publishing_date, 
	publishing_date_display, 
	page_count, 
	genre_id, 
	link, 
	cover_pic_id, 
	description, 
	is_active, 
	update_date, 
	creation_date, 
	book_transaction_id
)
values
(
	'Superabudance', 
	'Marian L. Tupy and Gale L. Pooley', 
	'August 31, 2022', 
	'August 31, 2022', 
	580, 
	17, 
	'https://www.amazon.com/Superabundance-Population-Innovation-Flourishing-Infinitely/dp/1952223393', 
	3, 
	'Generations of people have been taught that population growth makes resources scarcer. In 2021, for example, one widely publicized report argued, “The world''s rapidly growing population is consuming the planet''s natural resources at an alarming rate . . . the world currently needs 1.6 Earths to satisfy the demand for natural resources . . . [a figure that] could rise to 2 planets by 2030.” But is that true? After analyzing the prices of hundreds of commodities, goods, and services spanning two centuries, Marian Tupy and Gale Pooley found that resources became more abundant as the population grew. That was especially true when they looked at “time prices,” which represent the length of time that people must work to buy something. To their surprise, the authors also found that resource abundance increased faster than the population―a relationship that they call “superabundance.” On average, every additional human being created more value than he or she consumed. This relationship between population growth and abundance is deeply counterintuitive, yet it is true. Why? More people produce more ideas, which lead to more inventions. People then test those inventions in the marketplace to separate the useful from the useless. At the end of that process of discovery, people are left with innovations that overcome shortages, spur economic growth, and raise standards of living. But large populations are not enough to sustain superabundance―just think of the poverty in China and India before their respective economic reforms. To innovate, people must be allowed to think, speak, publish, associate, and disagree. They must be allowed to save, invest, trade, and profit. In a word, they must be free.', 
	true, 
	current_timestamp, 
	current_timestamp, 
	'9e95dd6a-0cb9-11ee-be56-0242ac120002'
);

insert into book_history
(
	book_id, 
	book_title, 
	author_name, 
	publishing_date, 
	publishing_date_display, 
	page_count, 
	genre_id, 
	link, 
	cover_pic_id, 
	description, 
	is_active, 
	update_date, 
	creation_date, 
	book_transaction_id
)
values
(
	3, 
	'Superabudance', 
	'Marian L. Tupy and Gale L. Pooley', 
	'August 31, 2022', 
	'August 31, 2022', 
	580, 
	17, 
	'https://www.amazon.com/Superabundance-Population-Innovation-Flourishing-Infinitely/dp/1952223393', 
	3, 
	'Generations of people have been taught that population growth makes resources scarcer. In 2021, for example, one widely publicized report argued, “The world''s rapidly growing population is consuming the planet''s natural resources at an alarming rate . . . the world currently needs 1.6 Earths to satisfy the demand for natural resources . . . [a figure that] could rise to 2 planets by 2030.” But is that true? After analyzing the prices of hundreds of commodities, goods, and services spanning two centuries, Marian Tupy and Gale Pooley found that resources became more abundant as the population grew. That was especially true when they looked at “time prices,” which represent the length of time that people must work to buy something. To their surprise, the authors also found that resource abundance increased faster than the population―a relationship that they call “superabundance.” On average, every additional human being created more value than he or she consumed. This relationship between population growth and abundance is deeply counterintuitive, yet it is true. Why? More people produce more ideas, which lead to more inventions. People then test those inventions in the marketplace to separate the useful from the useless. At the end of that process of discovery, people are left with innovations that overcome shortages, spur economic growth, and raise standards of living. But large populations are not enough to sustain superabundance―just think of the poverty in China and India before their respective economic reforms. To innovate, people must be allowed to think, speak, publish, associate, and disagree. They must be allowed to save, invest, trade, and profit. In a word, they must be free.', 
	true, 
	current_timestamp, 
	current_timestamp, 
	'9e95dd6a-0cb9-11ee-be56-0242ac120002'
);

insert into book_rating
(
	book_id, 
	overall_rating, 
	number_of_reviews, 
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
insert into book
(
	book_title, 
	author_name, 
	publishing_date, 
	publishing_date_display, 
	page_count, 
	genre_id, 
	link, 
	cover_pic_id, 
	description, 
	is_active, 
	update_date, 
	creation_date, 
	book_transaction_id
)
values
(
	'The Lord of the Rings', 
	'J.R.R. Tolkien', 
	'July 29, 1954', 
	'July 29, 1954', 
	1248, 
	4, 
	'https://www.amazon.com/Lord-Rings-Illustrated-J-R-R-Tolkien/dp/0358653037', 
	4, 
	'Since it was first published in 1954, The Lord of the Rings has been a book people have treasured. Steeped in unrivaled magic and otherworldliness, Tolkien''s sweeping fantasy and epic adventure has touched the hearts of young and old alike. More than 150 million copies of its many editions have been sold around the world, and occasional collectors’ editions become prized and valuable items of publishing. This one-volume, jacketed hardcover edition contains the complete text, fully corrected and reset, which is printed in red and black and features, for the very first time, thirty color illustrations, maps and sketches drawn by Tolkien himself as he composed this epic work. These include the pages from the Book of Mazarbul, marvelous facsimiles created by Tolkien to accompany the famous ‘Bridge of Khazad-dum’ chapter. Also appearing are two removable fold-out maps drawn by Christopher Tolkien revealing all the detail of Middle-earth. Sympathetically packaged to reflect the classic look of the first edition, this new edition of the bestselling hardback will prove irresistible to collectors and new fans alike.', 
	true, 
	current_timestamp, 
	current_timestamp, 
	'9e95dd6a-0cb9-11ee-be56-0242ac120002'
);

insert into book_history
(
	book_id, 
	book_title, 
	author_name, 
	publishing_date, 
	publishing_date_display, 
	page_count, 
	genre_id, 
	link, 
	cover_pic_id, 
	description, 
	is_active, 
	update_date, 
	creation_date, 
	book_transaction_id
)
values
(
	4, 
	'The Lord of the Rings', 
	'J.R.R. Tolkien', 
	'July 29, 1954', 
	'July 29, 1954', 
	1248, 
	4, 
	'https://www.amazon.com/Lord-Rings-Illustrated-J-R-R-Tolkien/dp/0358653037', 
	4, 
	'Since it was first published in 1954, The Lord of the Rings has been a book people have treasured. Steeped in unrivaled magic and otherworldliness, Tolkien''s sweeping fantasy and epic adventure has touched the hearts of young and old alike. More than 150 million copies of its many editions have been sold around the world, and occasional collectors’ editions become prized and valuable items of publishing. This one-volume, jacketed hardcover edition contains the complete text, fully corrected and reset, which is printed in red and black and features, for the very first time, thirty color illustrations, maps and sketches drawn by Tolkien himself as he composed this epic work. These include the pages from the Book of Mazarbul, marvelous facsimiles created by Tolkien to accompany the famous ‘Bridge of Khazad-dum’ chapter. Also appearing are two removable fold-out maps drawn by Christopher Tolkien revealing all the detail of Middle-earth. Sympathetically packaged to reflect the classic look of the first edition, this new edition of the bestselling hardback will prove irresistible to collectors and new fans alike.', 
	true, 
	current_timestamp, 
	current_timestamp, 
	'9e95dd6a-0cb9-11ee-be56-0242ac120002'
);

insert into book_rating
(
	book_id, 
	overall_rating, 
	number_of_reviews, 
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


-- 5
insert into book
(
	book_title, 
	author_name, 
	publishing_date, 
	publishing_date_display, 
	page_count, 
	genre_id, 
	link, 
	cover_pic_id, 
	description, 
	is_active, 
	update_date, 
	creation_date, 
	book_transaction_id
)
values
(
	'1776', 
	'David McCullough', 
	'June 27, 2006', 
	'June 27, 2006', 
	386, 
	15, 
	'https://www.amazon.com/1776-David-McCullough/dp/0743226720', 
	5, 
	'In this masterful book, David McCullough tells the intensely human story of those who marched with General George Washington in the year of the Declaration of Independence—when the whole American cause was riding on their success, without which all hope for independence would have been dashed and the noble ideals of the Declaration would have amounted to little more than words on paper. Based on extensive research in both American and British archives, 1776 is a powerful drama written with extraordinary narrative vitality. It is the story of Americans in the ranks, men of every shape, size, and color, farmers, schoolteachers, shoemakers, no-accounts, and mere boys turned soldiers. And it is the story of the King’s men, the British commander, William Howe, and his highly disciplined redcoats who looked on their rebel foes with contempt and fought with a valor too little known. Written as a companion work to his celebrated biography of John Adams, David McCullough’s 1776 is another landmark in the literature of American history.', 
	true, 
	current_timestamp, 
	current_timestamp, 
	'9e95dd6a-0cb9-11ee-be56-0242ac120002'
);

insert into book_history
(
	book_id, 
	book_title, 
	author_name, 
	publishing_date, 
	publishing_date_display, 
	page_count, 
	genre_id, 
	link, 
	cover_pic_id, 
	description, 
	is_active, 
	update_date, 
	creation_date, 
	book_transaction_id
)
values
(
	5, 
	'1776', 
	'David McCullough', 
	'June 27, 2006', 
	'June 27, 2006', 
	386, 
	15, 
	'https://www.amazon.com/1776-David-McCullough/dp/0743226720', 
	5, 
	'In this masterful book, David McCullough tells the intensely human story of those who marched with General George Washington in the year of the Declaration of Independence—when the whole American cause was riding on their success, without which all hope for independence would have been dashed and the noble ideals of the Declaration would have amounted to little more than words on paper. Based on extensive research in both American and British archives, 1776 is a powerful drama written with extraordinary narrative vitality. It is the story of Americans in the ranks, men of every shape, size, and color, farmers, schoolteachers, shoemakers, no-accounts, and mere boys turned soldiers. And it is the story of the King’s men, the British commander, William Howe, and his highly disciplined redcoats who looked on their rebel foes with contempt and fought with a valor too little known. Written as a companion work to his celebrated biography of John Adams, David McCullough’s 1776 is another landmark in the literature of American history.', 
	true, 
	current_timestamp, 
	current_timestamp, 
	'9e95dd6a-0cb9-11ee-be56-0242ac120002'
);

insert into book_rating
(
	book_id, 
	overall_rating, 
	number_of_reviews, 
	is_active, 
	update_date, 
	creation_date
)
values
(
	5, 
	0, 
	0, 
	true, 
	current_timestamp, 
	current_timestamp
);


-- 6
insert into book
(
	book_title, 
	author_name, 
	publishing_date, 
	publishing_date_display, 
	page_count, 
	genre_id, 
	link, 
	cover_pic_id, 
	description, 
	is_active, 
	update_date, 
	creation_date, 
	book_transaction_id
)
values
(
	'Silence of the Lambs', 
	'Thomas Harris', 
	'August 29, 1988', 
	'August 29, 1988', 
	432, 
	8, 
	'https://www.amazon.com/Silence-Lambs-Thomas-Harris/dp/0099532921', 
	6, 
	'An FBI trainee. A psychopath locked up for unspeakable crimes. And a serial killer getting ever closer to his latest victim...FBI rookie Clarice Starling turns to Dr. Hannibal Lecter, monster cannibal held in a hospital for the criminally insane, for insight into the deadly madman she must find. As Dr. Lecter invites her into the darkest chambers of his mind, he forces her to confront her own childhood demons as the price of understanding, an unspeakable tuition he exacts to teach her how the monster thinks. And time is running out...', 
	true, 
	current_timestamp, 
	current_timestamp, 
	'9e95dd6a-0cb9-11ee-be56-0242ac120002'
);

insert into book_history
(
	book_id, 
	book_title, 
	author_name, 
	publishing_date, 
	publishing_date_display, 
	page_count, 
	genre_id, 
	link, 
	cover_pic_id, 
	description, 
	is_active, 
	update_date, 
	creation_date, 
	book_transaction_id
)
values
(
	6, 
	'Silence of the Lambs', 
	'Thomas Harris', 
	'August 29, 1988', 
	'August 29, 1988', 
	432, 
	8, 
	'https://www.amazon.com/Silence-Lambs-Thomas-Harris/dp/0099532921', 
	6, 
	'An FBI trainee. A psychopath locked up for unspeakable crimes. And a serial killer getting ever closer to his latest victim...FBI rookie Clarice Starling turns to Dr. Hannibal Lecter, monster cannibal held in a hospital for the criminally insane, for insight into the deadly madman she must find. As Dr. Lecter invites her into the darkest chambers of his mind, he forces her to confront her own childhood demons as the price of understanding, an unspeakable tuition he exacts to teach her how the monster thinks. And time is running out...', 
	true, 
	current_timestamp, 
	current_timestamp, 
	'9e95dd6a-0cb9-11ee-be56-0242ac120002'
);

insert into book_rating
(
	book_id, 
	overall_rating, 
	number_of_reviews, 
	is_active, 
	update_date, 
	creation_date
)
values
(
	6, 
	0, 
	0, 
	true, 
	current_timestamp, 
	current_timestamp
);




select * from book_transaction;
select * from book;
select * from book_history;
select * from book_rating;



-- Template
/*
insert into book
(
	book_title, 
	author_name, 
	publishing_date, 
	page_count, 
	genre_id, 
	link, 
	cover_pic_id, 
	description, 
	is_active, 
	update_date, 
	creation_date, 
	book_transaction_id
)
values
(
	'', 
	'', 
	'', 
	1, 
	1, 
	'', 
	1, 
	'', 
	true, 
	current_timestamp, 
	current_timestamp, 
	'9e95dd6a-0cb9-11ee-be56-0242ac120002'
);

insert into book_history
(
	book_id, 
	book_title, 
	author_name, 
	publishing_date, 
	page_count, 
	genre_id, 
	link, 
	cover_pic_id, 
	description, 
	is_active, 
	update_date, 
	creation_date, 
	book_transaction_id
)
values
(
	1, 
	'', 
	'', 
	'', 
	1, 
	1, 
	'', 
	1, 
	'', 
	true, 
	current_timestamp, 
	current_timestamp, 
	'9e95dd6a-0cb9-11ee-be56-0242ac120002'
);
*/





