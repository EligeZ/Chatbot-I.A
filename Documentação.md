Documentação do Código do Chatbot FurIA Código está na sessão master

Este documento descreve o código-fonte de um chatbot web interativo chamado "FurIA", desenvolvido para fãs da equipe de e-sports FurIA, com foco no jogo Counter-Strike. O chatbot utiliza a API do Gemini (2.0 Flash) para responder a perguntas dos usuários com informações sobre o time e o cenário de CS:GO.

Arquivos:

style.css: Estilos visuais do chatbot e da página, para diversos dispositivos. index.html: Estrutura HTML da página, incluindo a área de chat, entrada de texto, botão de enviar, cabeçalho com logo e rodapé com links sociais. chatbot.js: Lógica JavaScript para interatividade do chatbot, comunicação com a API do Gemini (enviando histórico) e manipulação do DOM.

chatbot.js - Funcionalidades Principais:

Seleção de Elementos: Obtém referências aos elementos HTML da área de chat, entrada de texto e botão de enviar.

chatHistory (Array): Armazena o histórico de mensagens da conversa (usuário e bot) como objetos { role: "user" | "model", parts: [{ text: "mensagem" }] }.

addMessage(text, isUser): Adiciona uma mensagem (do usuário ou do bot) à área de exibição do chat (chat-log).

sendMessageToGeminiWithHistory(message) (async): Envia a message do usuário para a API do Gemini, incluindo todo o chatHistory para manter o contexto da conversa. Utiliza um prompt de comportamento para instruir a IA a agir como um influenciador da FurIA. Adiciona a mensagem do usuário ao chatHistory. Faz uma requisição POST para a API do Gemini com a mensagem atual e o histórico. Processa a resposta da API e extrai o texto da resposta do bot. Adiciona a resposta do bot ao chatHistory. Retorna a resposta do bot.

EventListener do Botão "Enviar": Ao clicar no botão, obtém a mensagem do usuário. Adiciona a mensagem do usuário à área de chat. Chama sendMessageToGeminiWithHistory para enviar a mensagem (com o histórico) para a API e obter a resposta do bot. Adiciona a resposta do bot à área de chat. EventListener da Tecla "Enter": Permite enviar a mensagem pressionando a tecla Enter no campo de entrada.

Orientação de Uso:

Configuração:

Certifique-se de ter uma chave de API válida para o Gemini e substitua "API_KEY" pela sua chave real na função sendMessageToGeminiWithHistory.

Execução:

Abra o arquivo index.html em seu navegador web. A interface do chatbot FurIA será exibida.

Interação:

Digite sua pergunta ou mensagem sobre o time FurIA ou Counter-Strike no campo de texto "Digite sua mensagem...". Clique no botão "Enviar" ou pressione a tecla Enter. A sua mensagem aparecerá na área de chat, seguida pela resposta do "FurIA" (gerada pela API do Gemini). O chatbot manterá o histórico da conversa, e as respostas subsequentes levarão em consideração as mensagens anteriores.
