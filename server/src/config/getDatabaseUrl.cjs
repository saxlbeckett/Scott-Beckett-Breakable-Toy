const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/Scott-Beckett-Breakable-Toy_development",
      test: "postgres://postgres:postgres@localhost:5432/Scott-Beckett-Breakable-Toy_test",
      e2e: "postgres://postgres:postgres@localhost:5432/Scott-Beckett-Breakable-Toy_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
