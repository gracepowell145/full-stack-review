INSERT INTO meme_user(
    username, 
    email,
    password,
    profile_picture
) VALUES(
    ${username},
    ${email},
    ${hash},
    ${profile_picture}
)
returning user_id, user_name, email, profile_picture;