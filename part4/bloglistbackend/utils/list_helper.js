const dummy = () => {
  return 1
}

const totalLikes = (blog) => {
  return blog.reduce((sum, blog) => sum + blog.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}