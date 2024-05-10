// Obtém referências para os elementos HTML
var audioPlayer = document.getElementById('audioPlayer');
var playBtn = document.getElementById('playBtn');
var pauseBtn = document.getElementById('pauseBtn');
var progressBar = document.querySelector('.player-control-progress-2');
var backwardBtn = document.querySelector('.fas.fa-backward');
var forwardBtn = document.querySelector('.fas.fa-forward');

// Variável para controlar o arquivo de áudio atual
var currentFile = "";

// Função para iniciar a reprodução de uma música
function playSong(file) {
    // Verifica se o arquivo é diferente do arquivo atual
    if (currentFile !== file) {
        // Define a origem do áudio para o novo arquivo
        audioPlayer.src = file;
        currentFile = file;
    }

    // Inicia a reprodução do áudio
    audioPlayer.play();

    // Atualiza o layout dos botões
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline';

    // Reinicia a barra de progresso
    progressBar.style.width = '0%';
}

// Função para pausar a reprodução de uma música
function pauseSong() {
    // Pausa a reprodução do áudio
    audioPlayer.pause();

    // Atualiza o layout dos botões
    playBtn.style.display = 'inline';
    pauseBtn.style.display = 'none';
}

// Função para atualizar a barra de progresso com base no tempo de reprodução
function updateProgressBar() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = progress + '%';
}

// Adiciona um ouvinte de eventos para atualizar a barra de progresso durante a reprodução
audioPlayer.addEventListener('timeupdate', updateProgressBar);

// Adiciona um ouvinte de eventos para o evento 'ended' (quando a música termina)
audioPlayer.addEventListener('ended', () => {
    // Quando a música atual terminar, inicia a reprodução de uma música aleatória
    playRandomSong();
});

// Adiciona um ouvinte de eventos para o botão "Play"
playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    playSong(currentFile);
    return false;
});

// Adiciona um ouvinte de eventos para o botão "Pause"
pauseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    pauseSong();
    return false;
});

// Adiciona um ouvinte de eventos para o botão "Voltar"
backwardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Implemente a lógica para ir para a música anterior
    // (por exemplo, selecionando aleatoriamente uma música)
    playRandomSong();
    return false;
});

// Adiciona um ouvinte de eventos para o botão "Avançar"
forwardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Implemente a lógica para ir para a próxima música
    // (por exemplo, selecionando aleatoriamente uma música)
    playRandomSong();
    return false;
});

// Adiciona ouvintes de eventos para cada elemento com a classe 'main-col'
document.querySelectorAll('.main-col').forEach(item => {
    item.addEventListener('click', event => {
        // Obtém os atributos da música a partir do elemento clicado
        let file = item.getAttribute('data-file');
        let image = item.getAttribute('data-image');
        let artist = item.getAttribute('data-artist');
        let song = item.getAttribute('data-song');

        // Atualiza a seção do artista exibida no reprodutor
        let playerArtistComponent = document.getElementsByClassName('player-artist');
        playerArtistComponent[0].innerHTML = `<img src="${image}" />
                                            <h3>${artist}<br/><span>${song}</span></h3>`;

        // Inicia a reprodução da música
        playSong(file);
    });
});

// Função para reproduzir uma música aleatória
function playRandomSong() {
    // Implemente a lógica para reproduzir uma música aleatória
    // (por exemplo, selecionando aleatoriamente uma música da lista)
    var randomIndex = Math.floor(Math.random() * document.querySelectorAll('.main-col').length);
    var randomSong = document.querySelectorAll('.main-col')[randomIndex];
    var file = randomSong.getAttribute('data-file');

    // Atualiza a seção do artista exibida no reprodutor
    let playerArtistComponent = document.getElementsByClassName('player-artist');
    playerArtistComponent[0].innerHTML = `<img src="${randomSong.getAttribute('data-image')}" />
                                        <h3>${randomSong.getAttribute('data-artist')}<br/><span>${randomSong.getAttribute('data-song')}</span></h3>`;

    // Inicia a reprodução da música aleatória
    playSong(file);
}
