import User from "./User";
import Post from "./Post";

// User.hasOne(Post, { foreignKey: "userId", as: "post" })
// Post.belongsTo(User, { foreignKey: "userId", as: "user" });
// export { User, Post };

User.hasMany(Post, { foreignKey: "userId", as: "posts" })
Post.belongsTo(User, { foreignKey: "userId", as: "user" });
export { User, Post };

// User.belongsToMany(Post, {through: "UserPosts", as: "posts", foreignKey: "userId"})

// Post.belongsToMany(User, {through: "UserPosts", as: "users", foreignKey: "postId"})

// export {User, Post}