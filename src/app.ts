function verificarSituacaoDoJogo(btn_jogo: HTMLButtonElement[], playerAtual: string, numeroDeJogadas: number, fimDeJogo: HTMLDivElement): void {
    const combinacoes: Array<Array<number>> = [
        [0, 1, 2], // linha 1
        [3, 4, 5], // linha 2
        [6, 7, 8], // linha 3
        [0, 3, 6], // coluna 1
        [1, 4, 7], // coluna 2
        [2, 5, 8], // coluna 3
        [0, 4, 8], // diagonal principal
        [2, 4, 6]  // diagonal secundária
    ];
    
    for (const [a, b, c] of combinacoes) {
        if (
            btn_jogo[a].value !== '' &&
            btn_jogo[a].value === btn_jogo[b].value &&
            btn_jogo[b].value === btn_jogo[c].value
        ) {
            const textoFimDeJogo: HTMLHeadElement = fimDeJogo.querySelector('h2') as HTMLHeadElement;
            const btnJogarNovamente: HTMLButtonElement = fimDeJogo.querySelector('button') as HTMLButtonElement;
    
            textoFimDeJogo.innerHTML = `Fim de jogo,<br>${playerAtual} venceu!`
    
            fimDeJogo.style.display = 'flex';
    
            btnJogarNovamente.addEventListener('click', function() {
                location.reload();
            });
        } else if (numeroDeJogadas == 9) {
            const textoFimDeJogo: HTMLHeadElement = fimDeJogo.querySelector('h2') as HTMLHeadElement;
            const btnJogarNovamente: HTMLButtonElement = fimDeJogo.querySelector('button') as HTMLButtonElement;
    
            textoFimDeJogo.innerHTML = `Fim de jogo,<br>Deu empate!`
    
            fimDeJogo.style.display = 'flex';
    
            btnJogarNovamente.addEventListener('click', function() {
                location.reload();
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const iniciarJogo: HTMLButtonElement = document.getElementById('btn-iniciar') as HTMLButtonElement;
    const pararJogo: HTMLButtonElement = document.getElementById('btn-parar') as HTMLButtonElement;
    const fimDeJogo: HTMLDivElement = document.getElementById('fim-de-jogo') as HTMLDivElement;
    const containerJogo: HTMLDivElement = document.querySelector('.jogo') as HTMLDivElement;

    let jogoIniciado: boolean = false;

    let numeroDeJogadas: number = 0;

    if(!jogoIniciado){
        containerJogo.addEventListener('click', function() {
            if (!jogoIniciado){
                const alerta: HTMLDivElement = document.getElementById('alerta') as HTMLDivElement;
                const alertaH2: HTMLHeadElement = alerta.querySelector('h2') as HTMLHeadElement;

                alertaH2.innerHTML = 'Clique em iniciar<br>para começar a jogar!'

                alerta.style.display = 'flex';

                setTimeout(() => {
                    alerta.classList.add('mostrar');
                }, 10)

                setTimeout(() => {
                    alerta.classList.remove('mostrar');

                    setTimeout(() => {
                        alerta.style.display = 'none';
                    }, 300)
                }, 1100)
            }
        })
    }

    iniciarJogo.addEventListener('click', function() {
        iniciarJogo.disabled = true;
        jogoIniciado = true;
        const btn_jogo: HTMLButtonElement[] = Array.from(document.querySelectorAll('.btn-jogo')) as HTMLButtonElement[];

        let playerAtual: string = 'Jogador 1';

        btn_jogo?.forEach(btn => {
            btn.addEventListener('click', function() {
                numeroDeJogadas += 1;
                if(playerAtual == 'Jogador 1'){
                    btn.innerText = 'X';
                    btn.value = 'x';
                    btn.disabled = true;
                    verificarSituacaoDoJogo(btn_jogo, playerAtual, numeroDeJogadas, fimDeJogo);
                    playerAtual = 'Jogador 2';
                } else if(playerAtual == 'Jogador 2'){
                    btn.innerText = 'O';
                    btn.value = 'O';
                    btn.disabled = true;
                    verificarSituacaoDoJogo(btn_jogo, playerAtual, numeroDeJogadas, fimDeJogo);
                    playerAtual = 'Jogador 1';
                }
            })
        });
    });

    pararJogo.addEventListener('click', function() {
        location.reload();
    });
});