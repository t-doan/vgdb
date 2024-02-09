-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

 insert into "users"("username", "password", "createdAt", "profileImage", "bio", "gamePlayed","currentPlay")
   values ('anon', '$argon2id$v=19$m=4096,t=3,p=1$12xftBgJHkA4dxDw83oLoQ$0s1qPfr6jaD2w5wN3mV8B119yP7vor3A/QtxvR1mx70', '2024-01-30', 'https://s.yimg.com/ny/api/res/1.2/i3.EB.NtJdHgrcSxznQe4Q--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzU-/https://media.zenfs.com/en_US/News/BGR_News/scared-surprised-cat-face.jpg',
   'First time here', 4, '{Tetris, Baldur''s Gate 3, Candy Crush}');

  insert into "list"("type", "userId")
  values('favorite', 1);

  -- insert into "listGames"("listId", "gameId")
  -- values(1, '{4200, 3498, 32}');
