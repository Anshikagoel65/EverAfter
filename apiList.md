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