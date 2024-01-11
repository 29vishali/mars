import * as HomePage from "./pages/home.js";
import * as SearchPage from "./pages/searchResults.js";

const validPromoCode = "AF3-FJK-418";
const invalidPromoCode = "AF3-FJK-419";

describe("HomePage Search", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl")); // this also ensures that all the input fields are cleared at the start of each test
  });

  it("Home page loaded", () => {
    HomePage.homePageLoad();
    HomePage.verifyLogo();
  });
  it("search with valid departing and arrival but with no seats", () => {
    HomePage.homePageLoad();
    HomePage.selectDeaprting("July");
    HomePage.selectArriving("July (next year)");
    HomePage.clickSearch();
    SearchPage.verifySearchResult("Sorry, there are no more seats available.");
  });
  it("search with departing and arrival dates that are less that one year", () => {
    HomePage.homePageLoad();
    HomePage.selectDeaprting("July");
    HomePage.selectArriving("December");
    HomePage.clickSearch();
    SearchPage.verifySearchResult("Unfortunately, this schedule is not possible. Please try again.");
  });
  it("search with valid departing and arrival month with no promotional code", () => {
    HomePage.homePageLoad();
    HomePage.selectDeaprting("July");
    HomePage.selectArriving("December (two years from now)");
    HomePage.clickSearch();
    SearchPage.verifySearchResult("Seats available!");
    SearchPage.verifySearchResult("Call now on 0800 MARSAIR to book!");
  });
  it("search with valid departing and arrival month with valid promotional code", () => {
    HomePage.homePageLoad();
    HomePage.selectDeaprting("July");
    HomePage.selectArriving("December (two years from now)");
    HomePage.enterPromotionalCode(validPromoCode);
    HomePage.clickSearch();
    SearchPage.verifySearchResult("Seats available!");
    SearchPage.verifySearchResult("Call now on 0800 MARSAIR to book!");
    SearchPage.verifySearchResult(`Promotional code ${validPromoCode} used:`);
  });
  it("search with valid departing and arrival month with invalid promotional code", () => {
    HomePage.homePageLoad();
    HomePage.selectDeaprting("July");
    HomePage.selectArriving("December (two years from now)");
    HomePage.enterPromotionalCode(invalidPromoCode);
    HomePage.clickSearch();
    SearchPage.verifySearchResult("Seats available!");
    SearchPage.verifySearchResult("Call now on 0800 MARSAIR to book!");
    SearchPage.verifySearchResult(
      `Sorry, code ${invalidPromoCode} is not valid`
    );
  });
});
