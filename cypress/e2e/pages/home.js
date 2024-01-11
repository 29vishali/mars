const departing = '#departing';
const returning = '#returning';
const promotionalCode = '#promotional_code';
const logo = 'a[href="/VisalakshiChidambaram"]';

export const selectDeaprting = (departingMonth) => {
  cy.get(departing).select(departingMonth);
};

export const verifyLogo = () =>{
  cy.get(logo).contains(' MarsAir');
}
export const selectArriving = (returningMonth) => {
  cy.get(returning).select(returningMonth);
};

export const selectDates = (departing, returning) => {
  selectDeaprting(departing);
  selectArriving(returning);
}

export const clickSearch = () => {
  cy.get("input").contains("Search").should("be.visible").click();
}

export const enterPromotionalCode = (promoCode) => {
  cy.get(promotionalCode).type(promoCode);
}

export const homePageLoad = () => {
  cy.get(departing).should("be.visible");
  cy.get(returning).should("be.visible");
  cy.get("input").contains("Search").should("be.visible");
  cy.get(promotionalCode).should("be.visible");
}
