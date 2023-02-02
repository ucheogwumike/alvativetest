const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const auth =
  (...requiredRole) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', async function (err, user, info) {
        if (err || info || !user) return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));

        req.user = user;
        if (requiredRole.length) {
          const { roleName } = req.user;

          const hasSelfRequired = requiredRole.some((role) => role === 'self');
          const hasRequiredRole = requiredRole.some((role) => role === roleName);

          if (!hasRequiredRole && !hasSelfRequired) {
            return reject(new ApiError(httpStatus.FORBIDDEN, 'You are not authorize to the required level'));
          }
          if (!hasRequiredRole && hasSelfRequired && Number(req.params.userId) !== user.id) {
            return reject(new ApiError(httpStatus.FORBIDDEN, 'You are not authorize to the required level'));
          }
        }

        next();
      })(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
