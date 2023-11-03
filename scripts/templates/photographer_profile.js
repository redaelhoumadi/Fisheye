// Fonction template informations du photographe
function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price,  } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const photographerHeader = document.createElement( 'div' );
        photographerHeader.classList.add( 'photograph_header_container' );

        const photographerInformations = document.createElement( 'div' );
        photographerInformations.classList.add( 'photograph_informations' );

        const photographerContact = document.createElement( 'div' );

        photographerContact.classList.add( 'photographer_contact');
        const photographerContactBtn = document.createElement( 'button' );
        photographerContactBtn.classList.add('contact_button');
        photographerContactBtn.textContent = 'Contactez-moi';
        photographerContactBtn.onclick = displayModal;
        photographerContactBtn.setAttribute('arial-label', 'Contactez le photograph '+name);

        const photographerPicture = document.createElement('div');
        photographerPicture.classList.add('photographer_picture');

        const photographerLikesPrice = document.createElement( 'div' );
        photographerLikesPrice.classList.add( 'photographer_likes_price' );

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name)

        const h1 = document.createElement( 'h1' );
        h1.textContent = name;

        const h2 = document.createElement( 'h2' );
        h2.textContent = city +', '+ country;

        const h3 = document.createElement( 'h3' );
        h3.textContent = tagline;

        const h5 = document.createElement( 'h5' );
        h5.textContent = price +'€ / jour';

        photographerInformations.appendChild(h1);
        photographerInformations.appendChild(h2);
        photographerInformations.appendChild(h3);
        photographerContact.appendChild(photographerContactBtn);
        photographerPicture.appendChild(img);
        photographerLikesPrice.appendChild(h5);
        
        photographerHeader.appendChild(photographerInformations);
        photographerHeader.appendChild(photographerContact);
        photographerHeader.appendChild(photographerPicture);
        document.body.appendChild(photographerLikesPrice);

        return (photographerHeader);
    }

    // Fonction affiche le nom du photographe
    function getnameFormDom(){
        const nameForm = document.createElement('h2');
        nameForm.textContent = name;
        return (nameForm);
    }
    return { getUserCardDOM, getnameFormDom}
}

// Fonction template media du photographe
function phototographerMedia(data) {
    const { title, image, likes, photographerId, video, id} = data;
    const images = `assets/images/${photographerId}/${image}`;
    const videos = `assets/images/${photographerId}/${video}`;

    function getMediaCardDOM() {
        const photographerMedia = document.createElement( 'article' );
        photographerMedia.classList.add( 'photograph_media' );

        const mediaInformations = document.createElement( 'div' );
        mediaInformations.classList.add( 'media_informations' );

        const mediaLikes = document.createElement( 'div' );
        mediaLikes.classList.add( 'likes' );

        if (data.video){
            const vdo = document.createElement('video');
            const source = document.createElement('source');
            const elementMedia = document.createElement('div');
            elementMedia.classList.add("media");
            source.setAttribute("title", title);
            source.setAttribute("src", videos);
            source.setAttribute("type", "video/mp4");
            elementMedia.appendChild(vdo);
            
            photographerMedia.appendChild(elementMedia);
            vdo.appendChild(source);
        }
        else{
            const img = document.createElement('img');
            const elementMedia = document.createElement('div');
            elementMedia.classList.add("media");
            img.setAttribute("src", images);
            img.setAttribute("alt", title);
            img.setAttribute("id", id);
            elementMedia.appendChild(img);
            photographerMedia.appendChild(elementMedia);
        }
        
        const h2 = document.createElement( 'h2' );
        h2.classList.add('title_media')
        h2.textContent= title;
        
        const h3 = document.createElement( 'h3' );
        h3.textContent= likes;
        h3.setAttribute( 'id', id + "-likes" );

        const btnLike = document.createElement( 'button' );
        btnLike.classList.add( 'like-button' );
        btnLike.setAttribute('id', id);
        btnLike.classList.add( 'fa-solid' );
        btnLike.classList.add( 'fa-heart' );
        btnLike.classList.add( 'heart__icon--full' );
        btnLike.setAttribute( 'aria-label', 'like'); 
        photographerMedia.appendChild(mediaInformations);
        mediaInformations.appendChild(h2);
        
        mediaLikes.appendChild(h3);
        mediaLikes.appendChild(btnLike);
        mediaInformations.appendChild(mediaLikes);
        photographerMedia.appendChild(mediaInformations);

        return (photographerMedia);

    }
    return { getMediaCardDOM}

}