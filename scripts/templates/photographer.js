// Fonction template des photographes
function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        link.setAttribute( 'href','photographer.html?id='+id );
        link.setAttribute( 'arial-label','Voir le profil du photograph '+name );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", 'photographe '+name)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = city +', '+ country;
        const h4 = document.createElement( 'h4' );
        h4.textContent = tagline;
        const h5 = document.createElement( 'h5' );
        h5.textContent = price+'€/jour';
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        return (article);
    }
    return { getUserCardDOM }
}