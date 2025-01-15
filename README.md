## Work log
(decisions, explanations, etc.)

1. Created a git(hub) repo
2. Set the basic structure by creating a server and client folder
   * The SPA is developed independently so I moved the FE out of the scope
3. Picked NestJS as the framework because...
   * it has a slightly bigger marketshare than Express
   * maintained, good documentation
   * compared to Express, has better DX, it's less boilerplate
4. Removed integration/unit tests because of the lack of complexity in the project
   * kept e2e tests to verify the project when it's done
5. Picked prisma as the ORM
   * because of the [3 well-known libs](https://npmtrends.com/prisma-vs-sequelize-vs-typeorm) prisma has the best stats (last update date, stars)
   * The note "*try to separate it at least in a different file!*" imply that I have to persist the data so I picked the simplest db that prisma supports: SQLite
6. Reverse-engineered the schema from the responses and created a migration file
   * Some of the properties were dead giveaways for 1-to-many and many-to-many relations
7. Creating `/api/posts`
   * PrismClient is injected into PostService
   * PostService queries all posts and returns it to the controller
8. Did **not** pick Automapper to map db entities to response objects because...
   * although I noticed that `created_at` and `tags` have different output than what prisma stores so it has to be transformed
   * and Mapping response objects by hand is unprofessional
   * but setting up the mapper without TypeScript is way beyond my tolerance level
9. TBD Add e2e tests to cover all endpoints & bad inputs
10. TBD Set appropriate headers
