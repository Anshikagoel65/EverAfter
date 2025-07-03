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
post /request/send/interested/:userId
post /request/send/ignored/:userId
post /request/review/accepted/:requestId
post /request/review/rejected/:requestId

userRouter
get /connections
get /requests/received
get /feed- get you the profiles of other users on platform

Status : accepted, ignore, interested, rejected