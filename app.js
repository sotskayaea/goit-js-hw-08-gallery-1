const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  galleryMarkupList: document.querySelector('.gallery'),
  lightbox : document.querySelector('.lightbox'),
  lightboxImage : document.querySelector('.lightbox__image'),
  closeModalBtn : document.querySelector('button[data-action="close-lightbox"]'),
  lightboxOverlay : document.querySelector('.lightbox__overlay'),
}

const galleryMarkupItems = createGalleryItems(galleryItems);
refs.galleryMarkupList.addEventListener('click' , onClickOnPicture)
refs.galleryMarkupList.insertAdjacentHTML('afterbegin' , galleryMarkupItems);

function createGalleryItems (items){
  return items.map(({preview , original , description}) => {
    return `<li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"
    >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
    </a>
</li>
`
  }).join('');
}

const prevDef = document.querySelectorAll('a');
prevDef.forEach(function (prevDef) {
  prevDef.onclick = function(event) {
    event.preventDefault();
  }
});

function onClickOnPicture (event){
  if(!event.target.classList.contains('gallery__image')){
    return
  }
  refs.lightboxImage.src = event.target.dataset.source
  refs.lightboxImage.alt = event.target.alt
  refs.lightbox.classList.add('is-open')
  onCloseModalWindow();
  onSwitchPicture();
}



function onCloseModalWindow (){
  refs.closeModalBtn.addEventListener('click' , () => {
    closeModalWindow();
  });
  refs.lightboxOverlay.addEventListener('click' , () => {
    closeModalWindow();
  });
  document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape'){
      closeModalWindow();
    }
  });
}

function closeModalWindow (){
  refs.lightbox.classList.remove('is-open')
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
  refs.closeModalBtn.removeEventListener('click',closeModalWindow);
  refs.lightboxOverlay.removeEventListener('click',closeModalWindow);
  document.removeEventListener('click',closeModalWindow);
}

function onSwitchPicture (){
  document.addEventListener('keydown', (event)=>{

    let currentIndex = 0;
    galleryItems.forEach(img => {
      if (img.original === refs.lightboxImage.src) {
        currentIndex = galleryItems.indexOf(img);
      }
    });

    let nextIndex = currentIndex + 1;
    let previousIndex = currentIndex - 1;
    if (event.code === 'ArrowRight') {
      if (nextIndex >= galleryItems.length) {
        nextIndex = 0;
      }
      refs.lightboxImage.src = galleryItems[nextIndex].original;
      refs.lightboxImage.alt = galleryItems[nextIndex].description;
    }
    if (event.code === 'ArrowLeft') {
      if (previousIndex < 0) {
        previousIndex = galleryItems.length - 1;
      }
      refs.lightboxImage.src = galleryItems[previousIndex].original;
      refs.lightboxImage.alt = galleryItems[previousIndex].description;
    }
  })
}

