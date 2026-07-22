const deleteTestDb = async () => {
  const existing = Bun.file("test.sqlite");
  if (await existing.exists()) existing.delete();
  console.log("Test DB deleted");
};

deleteTestDb();
