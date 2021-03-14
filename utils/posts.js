import matter from "gray-matter";
import fs from "fs";

export function getPosts() {
  // Get all posts folders located in `content/posts`
  // Filter any posts leading with underscore (used for WIP posts)
  return fs
    .readdirSync(`${process.cwd()}/content/posts`)
    .filter(filename => filename[0] !== "_")
    .map((filename) => filename.replace(".md", ""));
}

// Get day in format: Month day, Year. e.g. April 19, 2020
function getFormattedDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

export function getSortedPosts() {
  const posts = getPosts()
    .map((filename) => {
      // Get raw content from file
      const markdownWithMetadata = fs
        .readFileSync(`content/posts/${filename}.md`)
        .toString();

      // Parse markdown, get frontmatter data, excerpt and content.
      const { data, excerpt, content } = matter(markdownWithMetadata);

      const frontmatter = {
        ...data,
        date: getFormattedDate(data.date),
      };

      return {
        slug: filename,
        frontmatter,
        excerpt,
        content,
      };
    })
    .sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );

  return posts;
}

export function getPostsSlugs() {
  const posts = getPosts();

  const paths = posts.map((filename) => ({
    params: {
      slug: filename,
    },
  }));

  return paths;
}

export function getPostBySlug(slug) {
  const posts = getSortedPosts();

  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);

  const { frontmatter, content, excerpt } = posts[postIndex];

  const previousPost = posts[postIndex + 1];
  const nextPost = posts[postIndex - 1];

  return { frontmatter, post: { content, excerpt }, previousPost, nextPost };
}
