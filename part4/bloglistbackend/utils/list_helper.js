const dummy = () => {
  return 1
}

const totalLikes = (blog) => {
  return blog.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blog) => {
    return blog.reduce((best, current) => 
        current.likes > best.likes ? current : best
    )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}