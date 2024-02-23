
const genAccordion = (sectionId) => {
    const modalBody = document.querySelector('#all-languages-modal-body')
    modalBody.innerHTML = ''
    const accordionContainer = document.createElement('section')
    accordionContainer.id = sectionId
    accordionContainer.classList.add('row', 'flourish-accordion')
    modalBody.append(accordionContainer)

}

const genAccordionItems = (currItem, destination, needsIcons) => {
    const formatCurrItem = currItem.trim().replace(/\s/g, '-').toLowerCase()
    const accordionRow = document.createElement('div')
    accordionRow.classList.add('flourish-accordion-item')
    accordionRow.id = `${formatCurrItem}-accordion`
    accordionRow.setAttribute("data-filter-id", currItem);
    const accordionBtn = document.createElement('div')
    accordionBtn.classList.add('flourish-accordion-header')
    const header = document.createElement('h5')
    header.innerText = `${currItem}`
    const iconImg = `${formatCurrItem}.png`
    if (needsIcons) {
        const imgContainer = document.createElement('div')
        imgContainer.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'ml-2')
        imgContainer.innerHTML = `
      <img class="geo-location-icons" src="./flourish/img/${formatCurrItem}.png" alt="${formatCurrItem} icon">
      `
        imgContainer.append(header)
        accordionBtn.append(imgContainer)
    } else {
        header.classList.add('notranslate')
        accordionBtn.append(header)
    }
    const accordionPanel = document.createElement('div')
    accordionPanel.classList.add('flourish-accordion-content')
    accordionRow.append(accordionBtn, accordionPanel)
    destination.append(accordionRow)

}

const genAccordionPanels = (currItem, currItemArr, subItem) => {
    const newRow = document.createElement('div')
    newRow.classList.add('row', 'd-flex', 'flex-column', 'align-items-center', 'filter-row-style')
    if (subItem) {
        if (subItem !== 'Oceania' && subItem !== 'South America' && subItem !== 'North America' && subItem !== 'Worldwide') {
            newRow.innerHTML = `<h6>${subItem}</h6>`
        }
    }
    subItem && newRow.setAttribute("data-filter-id", `${subItem}`);
    const btnContainer = document.createElement('div')
    btnContainer.classList.add('row', 'd-flex', 'justify-content-center', 'accordion-btn-container')
    genLanguageBtns(currItemArr, btnContainer)
    newRow.append(btnContainer)
    document.querySelectorAll(`div[data-filter-id="${currItem}"]`)[0].querySelector('.flourish-accordion-content').append(newRow)
}

// accordion js
const accordionCollapseFunc = () => {
    $(document).ready(function () {
        $(".flourish-accordion-header").click(function () {
            $(this).toggleClass("active")
                .next(".flourish-accordion-content")
                .slideToggle()
                .parent()
                .siblings()
                .find(".flourish-accordion-content")
                .slideUp()
                .prev()
                .removeClass("active");
        });
    });
}

const keyInputAccordionHandler = (numResults) => {
    if (numResults < 3 && numResults > 0) {
        expandAllAccordionItems()
    } else {
        collapseAllAccordionItems()
    }
}

const expandAllAccordionItems = () => {
    $(".flourish-accordion-header").each(function () {
        $(this).addClass("active").next(".flourish-accordion-content").slideDown()
    });
}

const collapseAllAccordionItems = () => {
    $(".flourish-accordion-header").each(function () {
        $(this).removeClass('active').next(".flourish-accordion-content").slideUp()
    });
}



