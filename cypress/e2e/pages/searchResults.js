const searchResultContent = '#content';
const promoCodeContent = 'p[class="promo_code]'

export const verifySearchResult = (searchResult) => {
  cy.get(searchResultContent).contains(searchResult);
};

export const verifyPromoCodeResult = (verifyPromoCodeResult) => {
  cy.get(promoCodeContent).contains(verifyPromoCodeResult);
};