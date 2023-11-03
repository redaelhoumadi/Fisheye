// Fonction asynchrone récupère un photographe et ses médias à partir du fichier JSON basé sur l'ID du photographe.
async function getPhotographerById(id) {
    // Effectue une requête fetch pour obtenir les données des photographes à partir du fichier JSON.
    const response = await fetch('data/photographers.json');
    // Parse les données JSON de la réponse.
    const photographersData = await response.json();
    // Récupère les tableaux de photographes et de médias à partir des données parsées.
    const photographers = photographersData.photographers;
    const photographermedia = photographersData.media;
    // Cherche le photographe spécifique avec l'ID donné dans le tableau des photographes.
    const photographer = photographers.find((photographer) => photographer.id === id);
    // Filtrer les médias pour obtenir uniquement ceux qui appartiennent au photographe spécifique.
    let media = photographermedia.filter((item) => item.photographerId === id);
    // Retourne le photographe et ses médias sous forme d'objet.
    return { photographer, media};
}

// Fonction asynchrone prend un objet photographe en tant que paramètre et affiche ses informations.
async function displayPhotographer(photographer) {
    // Sélectionne l'élément du DOM avec la classe "photograph-header".
    const headerSection = document.querySelector(".photograph-header");
    // Utilise le modèle de photographe (photographerTemplate) pour créer le DOM de la carte du photographe.
    const photographerModel = photographerTemplate(photographer);
    // Appelle la méthode getUserCardDOM du modèle de photographe pour obtenir l'élément DOM de la carte du photographe.
    const userCardDOM = photographerModel.getUserCardDOM();
    // Ajoute l'élément DOM de la carte du photographe à la section d'en-tête de la page web.
    headerSection.appendChild(userCardDOM);
}

// Fonction asynchrone prend l'objet photographe en paramètre et affiche le nom du photographe dans le formulaire.
async function displayNameForm(photographer) {
    // Sélectionne l'élément du DOM avec la classe "form_title".
    const formTitle = document.querySelector(".form_title");
    // Utilise le modèle de photographe (photographerTemplate) pour créer le DOM du nom du photographe dans le formulaire.
    const formTitleModel = photographerTemplate(photographer);
    // Appelle la méthode getnameFormDom du modèle de photographe pour obtenir l'élément DOM.
    const formTitleCardDOM = formTitleModel.getnameFormDom();
    // Ajoute l'élément DOM à l'élément du DOM avec la classe "form_title".
    formTitle.appendChild(formTitleCardDOM);
}

// Fonction asynchrone affiche les likes 
async function displayTotalLikes(media) {
    // Extracte les nombres de likes de tous les médias.
    likes = media.map(media => media.likes);
    // Initialise une variable pour stocker le total des likes.
    let inilikes = 0;
    // Calcule le total des likes en utilisant la méthode reduce().
    let totalLikes = likes.reduce((accumulator, currentValue) => accumulator + currentValue, inilikes);
    // Sélectionne l'élément DOM où le total des likes sera affiché.
    const totalLikesSection = document.querySelector(".photographer_likes_price");
    // Sélectionne l'élément DOM où le total des likes sera affiché.
    const labelTotallikes = document.getElementById('total-likes')
    // Sélectionne l'élément DOM pour afficher le total des likes avec le coeur.
    const likeHeart = document.querySelector(".likeheart")
    // Met à jour le texte de l'élément DOM avec le total des likes calculé.
    labelTotallikes.textContent = totalLikes;
    // Ajoute total des likes et le coeur à l'élément DOM.
    totalLikesSection.appendChild(likeHeart);
    
    // Fonction incremente les likes 
    function toggleLike(event) {
        // Récupérer l'élément HTML qui a déclenché l'événement (le bouton cliqué)
        const likeButton = event.target;
        // Récupérer l'identifiant unique du bouton
        var postId = likeButton.id;
        // Récupérer l'élément HTML qui affiche le nombre de likes pour ce post
        var likesElement = document.getElementById(postId + "-likes");
        // Récupérer le nombre actuel de likes en tant que nombre entier
        var currentLikes = parseInt(likesElement.textContent);
        // Vérifier si le bouton a la classe "liked"
        if (likeButton.classList.contains("liked")) {
          // Si le bouton a la classe "liked", décrémenter le nombre de likes et retirer la classe "liked"
          currentLikes--;
          totalLikes--;
          likeButton.classList.remove("liked");
        } else {
          // Si le bouton n'a pas la classe "liked", incrémenter le nombre de likes et ajouter la classe "liked"
          currentLikes++;
          totalLikes++;
          likeButton.classList.add("liked");
        }
        // Mettre à jour le texte de l'élément HTML avec le nouveau nombre de likes pour ce post
        likesElement.textContent = currentLikes;
        // Mettre à jour le texte de l'élément HTML avec le total des likes
        labelTotallikes.textContent = totalLikes;
    }
    // Ajouter un gestionnaire d'événements à tous les éléments avec la classe "like-button"
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(function(button) {
        button.addEventListener('click', toggleLike)
    });
}

// fonction assynchrone affiche les médias du photographe.
async function displayMedia(media) {
    // Sélectionne l'élément DOM où les médias du photographe seront affichés.
    const mediaSection = document.querySelector(".photographer_media");
    // Parcourt tous les médias.
    media.forEach((media) => {
        // Crée un modèle de média en utilisant la fonction phototographerMedia.
        const mediaModel = phototographerMedia(media);
        // Récupère l'élément DOM du média en appelant la méthode getMediaCardDOM du modèle de média.
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        // Ajoute l'élément DOM du média à la section des médias.
        mediaSection.appendChild(mediaCardDOM);
    });
}

// fonction asynchrone filtre et trie les médias.
async function displayByFiltre(media) {
    // Sélectionne l'élément de menu déroulant.
    const selectElement = document.querySelector('.filter');
    // Ajoute un écouteur d'événements pour le changement de la sélection dans le menu déroulant.
    selectElement.addEventListener('change', (event) => {
        // Récupère la valeur sélectionnée dans le menu déroulant.
        let selectedValue = selectElement.value;
        // Copie les médias pour éviter de modifier l'ordre des médias d'origine.
        let mediaOreder = [...media];
        // Trie les médias en fonction de la valeur sélectionnée.
        if (selectedValue == 2) {
            mediaOreder.sort((a, b) => a.title.localeCompare(b.title));
        } else if (selectedValue == 1) {
            mediaOreder.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else {
            mediaOreder.sort((a, b) => b.likes - a.likes);
        }
        // Efface le contenu de la section des médias.
        document.querySelector(".photographer_media").innerHTML = '';
        // Affiche les médias triés dans la section des médias.
        displayMedia(mediaOreder);
        // Met à jour le total des likes en fonction des médias triés.
        displayTotalLikes(mediaOreder);
        displayLightbox()
    });
}

function displayLightbox() {
    // Sélectionner tous les éléments avec la classe 'media'
    const allMedias = document.querySelectorAll('.media');
    
    // Sélectionner les éléments de la lightbox
    const lightWrapper = document.querySelector('.lightbox_wrapper');
    const mediaProvider = document.querySelector('.lightbox_media');
    const btnPrevious = document.querySelector('.prev');
    const btnNext = document.querySelector('.next');
    const btnClose = document.querySelector('.close');
    let currentIndex = 0; // Indice de l'élément actuellement affiché dans la lightbox

    // Attacher un événement de clic à chaque élément avec la classe 'media'
    allMedias.forEach((media, index) => {
        media.addEventListener('click', () => {
            // Afficher la lightbox et mettre à jour l'indice de l'élément actuellement affiché
            lightWrapper.style.display = 'flex';
            currentIndex = index;
            lightboxCard(media); // Appeler la fonction lightboxCard avec l'élément cliqué
        });
    });

    // Fonction pour afficher le contenu de la lightbox en fonction du type de média (image ou vidéo)
    function lightboxCard(media) {
        // Sélectionner l'image et la vidéo à l'intérieur de l'élément media
        const currentImage = media.querySelector('img');
        const currentVideo = media.querySelector('source');
        const mediaContainer = document.createElement('div'); // Créer un conteneur pour le média
        const titleProvider = document.createElement('div'); // Créer un conteneur pour le titre du média
        titleProvider.classList.add('lightbox_title'); // Ajouter une classe pour le style CSS
        
        // Vérifier si l'élément media est une image
        if (currentImage) {
            const img = document.createElement('img');
            img.src = currentImage.src;
            img.setAttribute('alt', 'image agrandie');
            titleProvider.innerHTML = currentImage.alt; // Utiliser le texte alternatif de l'image comme titre
            mediaContainer.appendChild(img);
            mediaContainer.appendChild(titleProvider);
            mediaProvider.appendChild(mediaContainer);
        }
        // Si l'élément media est une vidéo
        else {
            const video = document.createElement('video');
            const source = document.createElement('source');
            source.src = currentVideo.src;
            titleProvider.innerHTML = currentVideo.title; // Utiliser le titre de la vidéo comme titre
            mediaContainer.appendChild(video);
            mediaContainer.appendChild(titleProvider);
            mediaProvider.appendChild(mediaContainer);
            video.appendChild(source);
            video.play(); // Lire la vidéo automatiquement
            video.setAttribute('controls', ''); // Afficher les contrôles de lecture
        }
    }

    // Fonction pour fermer la lightbox
    function closeLightbox() {
        lightWrapper.style.display = 'none';
        mediaProvider.innerHTML = ''; // Vider le contenu de la lightbox
    }

    // Fonction pour afficher le média précédent dans la lightbox
    function prevMedia() {
        mediaProvider.innerHTML = '';
        currentIndex = (currentIndex - 1 + allMedias.length) % allMedias.length;
        lightboxCard(allMedias[currentIndex]);
    }

    // Fonction pour afficher le média suivant dans la lightbox
    function nextMedia() {
        mediaProvider.innerHTML = '';
        currentIndex = (currentIndex + 1) % allMedias.length;
        lightboxCard(allMedias[currentIndex]);
    }

    // Gérer les événements des touches du clavier
    document.addEventListener('keydown', (event) => {
        const keyPressed = event.key;

        if (keyPressed === 'Escape') {
            closeLightbox();
        } else if (keyPressed === 'ArrowLeft') {
            prevMedia();
        } else if (keyPressed === 'ArrowRight') {
            nextMedia();
        } else {
            console.error('Erreur de direction');
        }
    });

    // Attacher les fonctions aux événements des boutons et du clavier
    btnClose.addEventListener('click', () => closeLightbox());
    btnPrevious.addEventListener('click', () => prevMedia());
    btnNext.addEventListener('click', () => nextMedia());
}

// fonction asynchrone orchestre l'affichage du photographe, du formulaire de nom, des médias, du filtrage des médias et du total des likes.
async function display(photographer, media) {
    // Appelle la fonction pour afficher les informations du photographe dans l'en-tête de la page.
    displayPhotographer(photographer);
    // Appelle la fonction pour afficher le nom du photographe dans le formulaire.
    displayNameForm(photographer);
    // Appelle la fonction pour afficher les médias du photographe.
    displayMedia(media);
    // Appelle la fonction pour filtrer et trier les médias en fonction de la sélection de l'utilisateur.
    displayByFiltre(media);
    // Appelle la fonction pour afficher le total des likes des médias du photographe.
    displayTotalLikes(media);
    displayLightbox(media)
}

// Fonction asynchrone d'initialisation au chargement de la page
async function init() {
    // Récupère l'ID du photographe à partir de l'URL.
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id");

    // Récupère les données du photographe et de ses médias en fonction de l'ID.
    const { photographer, media } = await getPhotographerById(parseInt(id));

    // Appelle la fonction pour afficher le photographe, ses médias et gérer les fonctionnalités liées aux médias.
    display(photographer, media);
}

// Appelle la fonction d'initialisation au chargement de la page.
init();

