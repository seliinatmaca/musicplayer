const prevButton = document.getElementById("prev")

const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')

const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

// index şarkı için
let index

//dongu
let loop =true



//sarkı listesi
const songsList = [
    {
        name: "Dilemma",
        link: "assets/dilemma.mp3",
        artist: "Greenday",
        image: "assets/greendaydilemma.jpeg",
    },
    {
        name: "American İdiots",
        link: "assets/american idiots.mp3",
        artist: "greendayidiot",
        image: "assets/greendayidiot.png",
    },
    {
        name: "No coke",
        link: "assets/no coke.mp3",
        artist: "Dr.Alban",
        image: "assets/dr.alban.jpeg",
    },
    {
        name: "Oh My God",
        link: "assets/oh my god.mp3",
        artist: "inna",
        image: "assets/inna.jpeg",
    },
  
]

// zaman formatı ayarlayalım
const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput/60)
    minute = minute <10 ? "0"+minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0"+second : second
    return `${minute}:${second}`
}

// sarkıyı çalma
const playAudio = () => {
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
}

//sarkı atama
const setSong = (arrayIndex) =>{
    let {name,link,artist, image} = songsList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    audio.onloadedmetadata = () =>{

        maxDuration.innerHTML = timeFormatter(audio.duration)
    }
    playListContainer.classList.add("hide")
     playAudio()
    
}

// sıradakini çal
const nextSong = () =>{
    if (loop){
        if (index == (songsList.length - 1)) {
            index = 0
        } else {
            index+=1
        }
        setSong(index)
    } else {
        let randIndex = Math.floor(Math.random() * songsList.length)
        setSong(randIndex)
    }

}

playListButton.addEventListener('click', ()=>{
    playListContainer.classList.remove('hide')
})

closeButton.addEventListener('click',()=>{
playListContainer.classList.add('hide')
})

const pauseAudio = () => {
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
    //
}, 1000);

progressBar.addEventListener("click", (event) => {
    let coordStart = progressBar.getBoundingClientRect().left

    let coordEnd = event.clientX
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progressBar * 100 + "%"

    audio.currentTime = progress * audio.duration
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
})





const previousSong = () =>{
    pauseAudio()
    if (index > 0) {
index-=1
    } else {
        index = songsList.length - 1
    }
    setSong(index)
    
    playAudio()
}

repeatButton.addEventListener('click',()=>{
    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        audio.loop = false
    } else {
        repeatButton.classList.add('active')
        audio.loop = true
    }
})

shuffleButton.addEventListener('click',()=>{
    if (shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        audio.loop = true
    } else {
        shuffleButton.classList.add('active')
        audio.loop = false
    }
})

const initializePlaylist = () => {
    for (let i in songsList) {
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container"> 
          <img src="${songsList[i].image}"/>
        </div>
        <div class="playlist-song-details">
          <span id="playlist-song-name">
            ${songsList[i].name}
          </span>
          <span id="playlist-song-artist-album">
            ${songsList[i].artist}
          </span>
        </div>
        </li>`
    }
}

//tıklama yakalama
nextButton.addEventListener('click', nextSong)

pauseButton.addEventListener('click',pauseAudio)

playButton.addEventListener('click',playAudio)

prevButton.addEventListener('click',previousSong)



//sarkı bitisini yakala
audio.onended = () =>{
    nextSong()
}
audio.addEventListener('timeupdate', ()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})



//ekran yuklenildiğinde
window.onload = () => {
    index = 0
    setSong(index)
    // durdur ve sarkı listesini oluştur}

    pauseAudio()
    initializePlaylist()
}






