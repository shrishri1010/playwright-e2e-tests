import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {
  test.beforeEach("Go to Login Page", async ({ page }) => {
    //launch URL and Assert title and header
    await page.goto(
      "https://katalon-demo-cura.herokuapp.com/profile.php#login",
    );
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service"); //expect() function for Assertion
  });

  test("Should load homepage with correct title", async ({ page }) => {
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByRole("textbox", { name: "Password" }).first().click();
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThissisNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await page.pause();
  });

  test("Should prevent login with incorrect credentials", async ({ page }) => {
    //launch URL and Assert title and header
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John DoeWWW");
    await page.getByRole("textbox", { name: "Password" }).first().click();
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("hissisNotAPasswordfdsf");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Login failed! Please ensure")).toBeVisible();
  });
});
