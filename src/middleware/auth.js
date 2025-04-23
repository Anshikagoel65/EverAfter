const adminAuth = (req, res, next) => {
    console.log("admin auth checked...");
    const token = "xyz";
    const isAuthorized = token === "xyz";
    if(!isAuthorized){
        res.status(401).send("unauthorized request...");
    }else{
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log("user auth checked...");
    const token = "xyz";
    const isAuthorized = token === "xyz";
    if(!isAuthorized){
        res.status(401).send("unauthorized request...");
    }else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
};