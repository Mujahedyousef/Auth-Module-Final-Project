"user strict";
const acl = (action) => {
    return (req, res, next) => {
        try {
            if (req.User.actions.includes(action)) {
                next();
            } else {
                next('access denied')
            }
        } catch (e) {

        }
    }
}
module.exports = acl;