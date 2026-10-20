const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.join(__dirname, "../src/index.html"),
  "utf8"
);

describe("VSO frontend", () => {
  test("renders the application title", () => {
    expect(html).toContain("<title>VSO Helm Test</title>");
  });

  test("shows a successful deployment message", () => {
    expect(html).toContain("Deployment successful");
  });

  test("shows the healthy application status", () => {
    expect(html).toContain("Application status: Healthy");
  });

  test("mentions Kubernetes and Helm", () => {
    expect(html).toContain("Kubernetes");
    expect(html).toContain("Helm");
  });
});
