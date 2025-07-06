# EverAfter APIs

authRouter
Post /signup
Post /login
Post /logout

profileRouter
get /profile/view
patch /profile/edit
patch /profile/password

connectionRequestRouter
post /request/send/:status/:userId
post /request/review/:status/:requestId

userRouter
get /connections
get /user/requests/received
get /feed- get you the profiles of other users on platform

Status : accepted, ignore, interested, rejected


# notes
/feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)
/feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)
/feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)
/feed?page=4&limit=10 => 21-30 => .skip(20) & .limit(10)

skip = (page-1)*limit;