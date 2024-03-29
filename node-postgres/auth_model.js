
const config = require('./db.config.js');

const Pool = require('pg').Pool
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.db,
  password: config.password,
  port: config.port,
});

const getUserPassword = (body) => {
    const { email } = body;
    return new Promise(function(resolve, reject) {
        pool.query('select u.user_id, u."password" from "user" u where u.email = $1;', 
            [email], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows); // needs update to [0]
        });
    }) 
};

const createUser = (body) => {
    return new Promise(function(resolve, reject) {
        const { email, password, firstName, lastName } = body;
        pool.query('insert into "user" (email, password, first_name, last_name, profile_pic_id, is_active, creation_date) values ($1, $2, $3, $4, 1, true, current_timestamp) returning *;', 
            [email, password, firstName, lastName], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(`A new user has been registered: ${results.rows[0]}`);
        });
    })
};

const getDuplicateEmail = (body) => {
    const { email } = body;
    return new Promise(function(resolve, reject) {
        pool.query('select count(*) from "user" u where u.email = $1 and u.is_active = true;', 
            [email], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    }) 
};

const getAllBooks = () => {
    return new Promise(function(resolve, reject) {
        pool.query('select b.book_id, b.book_title, b.cover_pic_id, b.author_name, b.genre_id, coalesce(br.overall_rating, 0) as overall_rating from book b left join book_rating br on br.book_id = b.book_id and br.is_active = true where b.is_active = true order by book_id;', 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    })
};

const getHomeBooks = () => {
    return new Promise(function(resolve, reject) {
        pool.query('select b.book_id, b.book_title, b.cover_pic_id, b.author_name from book b order by b.book_id asc limit 4;', 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    })
};

const getRecommendedBooks = (body) => {
    const { bookId, genreId } = body;
    return new Promise(function(resolve, reject) {
        pool.query('select b.book_id, b.book_title, b.cover_pic_id, b.author_name, b.genre_id from book b where b.book_id != $1 order by case b.genre_id when $2 then 1 else 2 end, random() limit 4;', 
            [bookId, genreId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    })
};

const getBook = (body) => {
    const { bookId } = body;
    return new Promise(function(resolve, reject) {
        pool.query('select b.cover_pic_id, b.book_title, b.author_name, b.publishing_date_display, b.page_count, b.genre_id, g.genre_title, b.description, b.link from book b inner join genres g on g.genre_id = b.genre_id where b.book_id = $1;', 
            [bookId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    }) 
};

const getUserBookReview = (body) => {
    return new Promise(function(resolve, reject) {
        const { userId, bookId } = body;
        pool.query('select b.cover_pic_id, br.rating, br.review_description, br.update_date from book_review br inner join book b on b.book_id = br.book_id and b.is_active = true where br.user_id = $1 and br.book_id = $2 and br.is_active = true;', 
            [userId, bookId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    })
};

const createReview = (body) => {
    return new Promise(function(resolve, reject) {
        const { bookId, userId, userRating, userReviewContent } = body;
        pool.query('insert into book_review(book_id, user_id, rating, review_description, is_active, update_date, creation_date) values($1, $2, $3, $4, true, current_timestamp, current_timestamp);', 
            [bookId, userId, userRating, userReviewContent], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};

const updateUserReviewStats = (body) => {
    return new Promise(function(resolve, reject) {
        const { userId } = body;
        pool.query('update user_review set number_of_reviews = number_of_reviews + 1, books_read = books_read + 1, update_date = current_timestamp where user_id = $1 and is_active = true;', 
            [userId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};

const updateBookRatingStats = (body) => {
    return new Promise(function(resolve, reject) {
        const { bookId, userRating, overallRating, numberOfReviews } = body;
        const newOverallRating = overallRating + ((userRating - overallRating) / (numberOfReviews + 1));
        pool.query('update book_rating set number_of_reviews = number_of_reviews + 1, overall_rating = $2, update_date = current_timestamp where book_id = $1 and is_active = true;', 
            [bookId, newOverallRating], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};

const deleteReview = (body) => {
    return new Promise(function(resolve, reject) {
        const { userId } = body;
        pool.query('update book_review set is_active = false, update_date = current_timestamp where user_id = $1 and is_active = true;', 
            [userId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};

const reduceUserReviewStats = (body) => {
    return new Promise(function(resolve, reject) {
        const { userId } = body;
        pool.query('update user_review set number_of_reviews = number_of_reviews - 1, update_date = current_timestamp where user_id = $1 and is_active = true;', 
            [userId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};

const reduceBookRatingStats = (body) => {
    return new Promise(function(resolve, reject) {
        const { bookId, userRating, overallRating, numberOfReviews } = body;
        const newOverallRating = ((overallRating * numberOfReviews) - userRating) / (numberOfReviews - 1);
        pool.query('update book_rating set number_of_reviews = number_of_reviews - 1, overall_rating = $2, update_date = current_timestamp where book_id = $1 and is_active = true;', 
            [bookId, newOverallRating], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};

const getAllBookReviews = (body) => {
    return new Promise(function(resolve, reject) {
        const { bookId } = body;
        pool.query('select  br.book_review_id, u.user_id, u.first_name, u.last_name, u.profile_pic_id, br.rating, br.review_description, br.update_date from book_review br inner join "user" u on u.user_id = br.user_id and u.is_active = true where br.book_id = $1 and br.is_active = true;', 
            [bookId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    })
};

const getBookRatings = (body) => {
    return new Promise(function(resolve, reject) {
        const { bookId } = body;
        pool.query('select bra.overall_rating, bra.number_of_reviews, sum(case when br.rating = 5 then 1 else 0 end) as five_count, sum(case when br.rating = 4 then 1 else 0 end) as four_count, sum(case when br.rating = 3 then 1 else 0 end) as three_count, sum(case when br.rating = 2 then 1 else 0 end) as two_count, sum(case when br.rating = 1 then 1 else 0 end) as one_count from book_rating bra left join book_review br on br.book_id = bra.book_id and br.is_active = true where bra.book_id = $1 and bra.is_active = true group by bra.overall_rating, bra.number_of_reviews;', 
            [bookId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};

const getListsBookDropdown = (body) => {
    return new Promise(function(resolve, reject) {
        const { userId, bookId } = body;
        pool.query('select l.list_id, l.list_name, l.list, (select $2 = any(l.list)) as in_list from list l where l.user_id = $1 and l.is_active = true order by l.list_id;', 
            [userId, bookId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    })
};

const getLists = (body) => {
    return new Promise(function(resolve, reject) {
        const { userId } = body;
        pool.query('select row_number() over (order by list_id), * from (select l.list_id, l.list_name, json_agg(json_build_object(\'book_id\', b.book_id, \'book_title\', b.book_title, \'cover_pic_id\', b.cover_pic_id, \'author_name\', b.author_name, \'rating\', coalesce(br.rating, 0))) as book_list, l.deletable from list l cross join unnest(l.list) as listId inner join book b on b.book_id = listId left join book_review br on br.book_id = b.book_id and br.user_id = $1 and br.is_active = true where l.user_id = $1 and l.is_active = true group by l.list_id union all select l2.list_id, l2.list_name, json_agg(json_build_object(\'book_id\', -1, \'book_title\', \'\', \'cover_pic_id\', \'\', \'author_name\', \'\', \'rating\', \'\')) as book_list, l2.deletable from list l2 where l2.user_id = $1 and l2.is_active = true and l2.list = \'{}\' group by l2.list_id) lists;', 
            [userId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    })
};

const createList = (body) => {
    return new Promise(function(resolve, reject) {
        const { userId, newListName } = body;
        pool.query('insert into list(user_id, list_name, list, deletable, is_active, update_date, creation_date) values($1, $2, \'{}\', true, true, current_timestamp, current_timestamp);', 
            [userId, newListName], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};

const createListWithBook = (body) => {
    return new Promise(function(resolve, reject) {
        const { userId, newListName, bookId } = body;
        const bookArray = '{'.concat('', bookId).concat('','}');
        pool.query('insert into list(user_id, list_name, list, deletable, is_active, update_date, creation_date) values($1, $2, $3, true, true, current_timestamp, current_timestamp);', 
            [userId, newListName, bookArray], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};

const deleteList = (body) => {
    return new Promise(function(resolve, reject) {
        const { userId, deleteListId } = body;
        pool.query('update list set is_active = false where user_id = $1 and list_id = $2;', 
            [userId, deleteListId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};

const addBookToList = (body) => {
    return new Promise(function(resolve, reject) {
        const { userId, listId, bookId } = body;
        pool.query('update list set list = array_append(list, $3) where user_id = $1 and list_id = $2;', 
            [userId, listId, bookId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};

const removeBookFromList = (body) => {
    return new Promise(function(resolve, reject) {
        const { userId, listId, bookId } = body;
        pool.query('update list set list = array_remove(list, $3) where user_id = $1 and list_id = $2;', 
            [userId, listId, bookId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};

const getGenres = () => {
    return new Promise(function(resolve, reject) {
        pool.query('select g.genre_id, g.genre_title, g.is_fiction from genres g where g.is_active = true order by g.display_order;', 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    })
};

const getAccount = (body) => {
    const { userId } = body;
    return new Promise(function(resolve, reject) {
        pool.query('select u.first_name, u.last_name, u.profile_pic_id, u.creation_date, ur.number_of_reviews, ur.books_read from "user" u inner join user_review ur on ur.user_id = u.user_id where u.user_id = $1;', 
            [userId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    }) 
};

const getAllUserReviews = (body) => {
    return new Promise(function(resolve, reject) {
        const { userId } = body;
        pool.query('select b.book_id, b.book_title, b.cover_pic_id, br.rating, br.review_description, br.update_date from book_review br inner join book b on b.book_id = br.book_id and b.is_active = true where br.user_id = $1 and br.is_active = true;', 
            [userId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    })
};

const getEditAccount = (body) => {
    const { userId } = body;
    return new Promise(function(resolve, reject) {
        pool.query('select u.email, u."password", u.first_name, u.last_name, u.profile_pic_id from "user" u where u.user_id = $1;', 
            [userId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    }) 
};

const updateProfilePic = (body) => {
    return new Promise(function(resolve, reject) {
        const { newProfilePic, userId } = body;
        pool.query('update "user" set profile_pic_id = $1 where user_id = $2;', 
            [newProfilePic, userId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};

const updateName = (body) => {
    return new Promise(function(resolve, reject) {
        const { newFirstName, newLastName, userId } = body;
        pool.query('update "user" set first_name = $1, last_name = $2 where user_id = $3;', 
            [newFirstName, newLastName, userId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};

const updateEmail = (body) => {
    return new Promise(function(resolve, reject) {
        const { newEmail, userId } = body;
        pool.query('update "user" set email = $1 where user_id = $2;', 
            [newEmail, userId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};

const updatePassword = (body) => {
    return new Promise(function(resolve, reject) {
        const { newPassword, userId } = body;
        pool.query('update "user" set "password" = $1 where user_id = $2;', 
            [newPassword, userId], 
            (error, results) => 
        {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        });
    })
};
  
module.exports = {
    getUserPassword, 
    createUser, 
    getDuplicateEmail, 
    getAllBooks, 
    getHomeBooks, 
    getRecommendedBooks, 
    getBook, 
    getUserBookReview, 
    createReview, 
    updateUserReviewStats, 
    updateBookRatingStats, 
    deleteReview, 
    reduceUserReviewStats, 
    reduceBookRatingStats, 
    getAllBookReviews, 
    getBookRatings, 
    getListsBookDropdown, 
    getLists, 
    createList, 
    createListWithBook, 
    deleteList, 
    addBookToList, 
    removeBookFromList, 
    getGenres, 
    getAccount, 
    getAllUserReviews, 
    getEditAccount, 
    updateProfilePic, 
    updateName, 
    updateEmail, 
    updatePassword
};
