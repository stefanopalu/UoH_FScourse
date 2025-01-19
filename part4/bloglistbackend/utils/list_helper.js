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

const mostBlog = (blog) => {
  const authorsCount = {}
  blog.forEach(blog => {
    if (authorsCount[blog.author]) {
      authorsCount[blog.author] += 1;
    } else {
      authorsCount[blog.author] = 1;
    }
  })

  let maxBlogs = 0;
  let maxAuthor = '';

  for (const author in authorsCount) {
    if (authorsCount[author] > maxBlogs) {
      maxBlogs = authorsCount[author];
      maxAuthor = author;
    }
  }

  return { author: maxAuthor, blogs: maxBlogs };
  }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog
}