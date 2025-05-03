// Seleciona os elementos HTML
const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Array para armazenar o histórico de mensagens
let chatHistory = [];

// Função para adicionar uma mensagem ao log de chat
function addMessage(text, isUser) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(isUser ? "user-message" : "bot-message");
  messageDiv.textContent = text;
  chatLog.appendChild(messageDiv);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Função assíncrona para enviar a mensagem do usuário PARA a Gemini API, incluindo o histórico,
// e receber a resposta
async function sendMessageToGeminiWithHistory(message) {
  // Substitua 'API_KEY' pela sua chave de API real
  const apiKey = "API_KEY";
  const apiUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
    apiKey;

  // PROMPT DE COMPORTAMENTO DA IA
  const behaviorPrompt = `Você é um influenciador do time de E-sports fúria, focado no jogo Counter Strike.
    Você tem uma linguagem moderna e possui todas as informações sobre partidas da equipe.
    Além de curiosidades sobre o time e do jogo Counter Strike.
    Você está se comunicando somente com uma pessoa.
    Respostas de ate 150 caracteres.
    Seu nome é FurIA, se te chamarem de bot, corrija.
    So se apresente se for solicitado.`;

  // Adiciona a mensagem do usuário ao histórico
  chatHistory.push({ role: "user", parts: [{ text: message }] });

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          ...chatHistory.map((msg) => ({ role: msg.role, parts: msg.parts })),
          { role: "user", parts: [{ text: behaviorPrompt + "\n" + message }] },
        ],
        generationConfig: {
          maxOutputTokens: 150, // Limita o número de tokens na resposta
        },
      }),
    });

    const data = await response.json();
    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      const botResponse = data.candidates[0].content.parts[0].text;
      // Adiciona a resposta do bot ao histórico
      chatHistory.push({ role: "model", parts: [{ text: botResponse }] });
      return botResponse;
    } else {
      return "Desculpe, não consegui entender.";
    }
  } catch (error) {
    console.error("Erro ao enviar mensagem para Gemini com histórico:", error);
    return "Ocorreu um erro ao processar sua mensagem.";
  }
}

// Evento de clique no botão de enviar
sendButton.addEventListener("click", async () => {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, true);
    userInput.value = "";

    const botResponse = await sendMessageToGeminiWithHistory(userMessage);
    addMessage(botResponse, false);
  }
});

// Evento de pressionar a tecla Enter no campo de input
userInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    sendButton.click();
  }
});
