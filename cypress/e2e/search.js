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
  it("search with valid departing and arrival month with no promotional code", () => {
    HomePage.homePageLoad();
    HomePage.selectDeaprting("July");
    HomePage.selectArriving("December (two years from now)");
    HomePage.clickSearch();
    SearchPage.verifySearchResult("Seats available!");
    SearchPage.verifySearchResult("Call now on 0800 MARSAIR to book!");
  });
  it("search with valid departing and arrival month with promotional code", () => {
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

describe("Promotional Code Validation", () => {
  const successTestCases = [
    {
      case: "upper and lower case characters", 
      promotionalCode: "Ad7-FjR-209"
    },
    {
      case: "first three digits adds up to less than 10", 
      promotionalCode: "AD6-FJR-309"
    },
    {
      case: "special characters", //currently this is failing due to bug
      promotionalCode: "A$6-FJR!-309"
    },
    {
      case: "first three digits adds up to exactly 10", //currently this is failing due to bug
      promotionalCode: "AD6-FJR-400"
    },
    {
      case: "first three digits adds up to more than 10", //currently this is failing due to bug
      promotionalCode: "AD6-FJR-411"
    },
  ];

  const failureTestCases = [
    {
      case: "wrong format",  //currently this is failing due to bug
      promotionalCode: "Ad7*FjR-209"
    },
  ];
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl")); // this also ensures that all the input fields are cleared at the start of each test
  });
  successTestCases.forEach((successTestCases) => {
    it(`should succeed when promtional code has ${successTestCases.case}`, () => {
      HomePage.homePageLoad();
      HomePage.selectDeaprting("July");
      HomePage.selectArriving("December (two years from now)");
      HomePage.enterPromotionalCode(successTestCases.promotionalCode);
      HomePage.clickSearch();
      SearchPage.verifySearchResult("Seats available!");
      SearchPage.verifySearchResult("Call now on 0800 MARSAIR to book!");
      SearchPage.verifySearchResult(`Promotional code ${successTestCases.promotionalCode} used:`);
    });
  });
  failureTestCases.forEach((failureTestCases) => {
    it(`should show error when promtional code has ${failureTestCases.case}`, () => {
      HomePage.homePageLoad();
          HomePage.selectDeaprting("July");
          HomePage.selectArriving("December (two years from now)");
          HomePage.enterPromotionalCode(failureTestCases.promotionalCode);
          HomePage.clickSearch();
          SearchPage.verifySearchResult("Seats available!");
          SearchPage.verifySearchResult("Call now on 0800 MARSAIR to book!");
          SearchPage.verifySearchResult(
            `Sorry, code ${failureTestCases.promotionalCode} is not valid`
          );
    });
  });
});
