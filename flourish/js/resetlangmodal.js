const resetLanguageModal = () => {
    setDefaultModal()
    collapseAllAccordionItems()
    document.querySelectorAll('.lang-filter').forEach(item => item.classList.remove('active'))
    document.getElementById('all-languages-filter').classList.add('active')
    document.getElementById('search-lang-modal').value = ''
    document.getElementById('flourish-search-input').value = ''
    $('#search-list').fadeOut()
}

document.getElementById('flourish-more-languages-btn').addEventListener('click', () => {
    resetLanguageModal()
})