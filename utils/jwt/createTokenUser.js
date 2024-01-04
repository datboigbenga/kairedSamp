const createTokenUser = (user) => {
  return {id: user.id, email:user.email, userName: user.userName, role:user.role};
  // return "hey"
};

module.exports = {createTokenUser};
