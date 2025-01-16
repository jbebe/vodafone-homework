const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tagIds = ['Sports', 'Business', 'Tech', 'Economy'];
  const authorNames = ['Test User A', 'Test User B'];

  const authors = [];
  const tags = [];

  for (const id of tagIds) {
    const tag = await prisma.tag.create({
      data: { id },
    });
    tags.push(tag);
  }

  for (const name of authorNames) {
    const author = await prisma.author.create({
      data: { name },
    });
    authors.push(author);
  }

  for (let i = 0; i < 3; ++i) {
    const postTagIds = tags
      .filter((_, idx) => idx + i < (tags.length + 3) / 2)
      .map((x) => ({ id: x.id }));
    const post = await prisma.post.create({
      data: {
        title: `Title ${i + 1}`,
        headline: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        body: 'Etiam tincidunt fermentum felis, quis luctus lectus suscipit nec. '.repeat(
          20,
        ),
        created_at: `2023-02-1${i}T00:01:00Z`,
        tags: {
          connect: postTagIds,
        },
      },
    });

    for (let j = 0; j < 2; ++j) {
      await prisma.comment.create({
        data: {
          body:
            j % 2 == 0
              ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
              : 'Etiam tincidunt fermentum felis, quis luctus lectus suscipit nec.',
          author: {
            connect: {
              id: authors[j % 2].id,
            },
          },
          created_at: `2023-02-1${j}T00:01:00Z`,
          post: {
            connect: {
              id: post.id,
            },
          },
        },
      });
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
