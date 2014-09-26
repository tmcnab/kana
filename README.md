var corpus = [];


$('ul span[lang="ja"]').parent().each(function (i, item) {
    var text = $(item).clone().children().remove().end().text().replace(/、|–|\(|\)/g,'').trim();

    $(item).find('a').each(function (j, tag) {
        corpus.push({ word:tag.textContent, meaning:text });
    });
});
