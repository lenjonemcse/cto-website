/*
 * accordionomatic.js
 *
 * Automatically build an USWDS accordion based on simple DOM sections, such as
 * those generated by Markdown. It automatically detects the heading level to
 * use in the accordion button by looking at the first heading level it finds.
 *
 * This generates accordion items in the format:
 *
 * <h3 class="usa-accordion__heading">
 *   <button class="usa-accordion__button" aria-expanded="false" aria-controls="accordionomatic-item-X">
 *     Heading goes here
 *   </button>
 * </h3>
 * <div id="accordionomatic-item-X" class="usa-accordion__content">
 *   Content goes here
 * </div>
 *
 * Designate the area where you want the accordion by wrapping it in a div with
 * class "accordionomatic". See these examples:
 *
 * --------------- HTML example ---------------
 * <div class="accordionomatic">
 *   <h3>Accordion heading 1</h3>
 *   <p>Content for accordion 1</p>
 *   <h3>Accordion heading 2</h3>
 *   <p>Content for accordion 2</p>
 * </div>
 * --------------------------------------------
 *
 * ------------- Markdown example -------------
 * {::nomarkdown}
 * <div class="accordionomatic">
 * {:/}
 *
 * ### Accordion heading 1
 * Content for accordion 1
 *
 * ### Accordion heading 2
 * Content for accordion 2
 *
 * {::nomarkdown}
 * </div> <!-- end accordionomatic -->
 * {:/}
 * --------------------------------------------
 *
**/

(function () {
  $(".accordionomatic").each(function (parentIndex) {
    const $accordionWrapper = $('<div class="usa-accordion" aria-multiselectable="true"></div>');
    const headingLevel = $(this).children(":header").first().prop("tagName")
    $(this).children(headingLevel).each(function (childIndex) {
      const $heading = $(this);
      const $content = $(this).nextUntil(headingLevel);
      $heading.addClass('usa-accordion__heading');
      $heading.wrapInner(`<button class="usa-accordion__button" aria-expanded="false" aria-controls="accordionomatic-${parentIndex}-${childIndex}"></button>`);
      $heading.appendTo($accordionWrapper);
      const $contentWrapper = $(`<div id="accordionomatic-${parentIndex}-${childIndex}" class="usa-accordion__content"></div>`);
      $content.appendTo($contentWrapper);
      $contentWrapper.appendTo($accordionWrapper);
    });
    $(this).append($accordionWrapper);
  });
})();