/* =========================================================
   VITALLOOP — AI HEALTHCARE ASSISTANT
   Safe rule-based prototype
   No diagnosis / no medical API
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const chatArea =
    document.querySelector("#chat-area") ||
    document.querySelector(".chat-area");

  const input =
    document.querySelector("#chat-input") ||
    document.querySelector(".chat-input input");

  const sendButton =
    document.querySelector("#send-message") ||
    document.querySelector(".chat-input button");

  if (!chatArea || !input) return;


  /* ---------------------------------------------------------
     ADD MESSAGE
     --------------------------------------------------------- */

  function addMessage(text, type = "bot") {

    const message =
      document.createElement("div");

    message.className =
      `chat-message ${type}`;

    message.textContent = text;

    chatArea.appendChild(message);

    chatArea.scrollTop =
      chatArea.scrollHeight;

    return message;

  }


  /* ---------------------------------------------------------
     TYPING EFFECT
     --------------------------------------------------------- */

  function showTyping() {

    const typing =
      document.createElement("div");

    typing.className =
      "chat-message bot ai-typing";

    typing.innerHTML =
      "<span>●</span> <span>●</span> <span>●</span>";

    chatArea.appendChild(typing);

    chatArea.scrollTop =
      chatArea.scrollHeight;

    return typing;

  }


  /* ---------------------------------------------------------
     SAFE RESPONSE ENGINE
     --------------------------------------------------------- */

  function getResponse(message) {

    const text =
      message.toLowerCase().trim();


    /* Emergency */

    const emergencyWords = [
      "emergency",
      "accident",
      "unconscious",
      "not breathing",
      "severe bleeding",
      "chest pain",
      "breathing difficulty",
      "बहुत खून",
      "बेहोश",
      "सांस नहीं"
    ];


    if (
      emergencyWords.some(
        word => text.includes(word)
      )
    ) {

      return (
        "This may require urgent medical attention. " +
        "Please contact local emergency services or " +
        "go to the nearest emergency department immediately. " +
        "VitalLoop's assistant cannot diagnose or manage an emergency."
      );

    }


    /* Blood */

    if (
      text.includes("blood") ||
      text.includes("blood group") ||
      text.includes("donor") ||
      text.includes("blood bank") ||
      text.includes("blood centre") ||
      text.includes("blood center")
    ) {

      return (
        "VitalLoop can help users discover and coordinate " +
        "with relevant blood resources. Actual blood collection, " +
        "testing, storage, compatibility decisions and issue " +
        "are handled by authorized blood centres and qualified " +
        "healthcare professionals."
      );

    }


    /* Blood donation */

    if (
      text.includes("donate") ||
      text.includes("donation") ||
      text.includes("donor")
    ) {

      return (
        "Blood donation should be done through an authorized " +
        "blood centre or approved donation camp. Eligibility " +
        "and screening are decided by trained healthcare staff."
      );

    }


    /* Medicine */

    if (
      text.includes("medicine") ||
      text.includes("tablet") ||
      text.includes("dose") ||
      text.includes("दवा")
    ) {

      return (
        "VitalLoop can provide general medicine information, " +
        "but it should not replace a doctor or pharmacist. " +
        "Do not start, stop or change a medicine based only " +
        "on an AI response."
      );

    }


    /* Symptoms */

    if (
      text.includes("fever") ||
      text.includes("headache") ||
      text.includes("cough") ||
      text.includes("pain") ||
      text.includes("symptom")
    ) {

      return (
        "Symptoms can have many possible causes. " +
        "VitalLoop can provide general educational information, " +
        "but a qualified healthcare professional should evaluate " +
        "persistent, worsening or concerning symptoms."
      );

    }


    /* Reports */

    if (
      text.includes("report") ||
      text.includes("blood test") ||
      text.includes("lab")
    ) {

      return (
        "Medical reports should be interpreted in context " +
        "by a qualified healthcare professional. VitalLoop " +
        "can help explain general medical terms but does not " +
        "provide a diagnosis."
      );

    }


    /* Greeting */

    if (
      text === "hi" ||
      text === "hello" ||
      text === "hey" ||
      text.includes("namaste")
    ) {

      return (
        "Hello! I'm VitalLoop Assistant. " +
        "I can help you navigate blood resources, " +
        "healthcare information and basic health education."
      );

    }


    /* Help */

    if (
      text.includes("help") ||
      text.includes("what can you do")
    ) {

      return (
        "I can help with general healthcare information, " +
        "blood-resource navigation, donation education, " +
        "medicine information and basic report terminology. " +
        "I cannot diagnose conditions or replace a healthcare professional."
      );

    }


    /* Default */

    return (
      "I can provide general healthcare information and " +
      "help you navigate VitalLoop features. For diagnosis, " +
      "treatment decisions or urgent medical concerns, please " +
      "consult a qualified healthcare professional."
    );

  }


  /* ---------------------------------------------------------
     SEND MESSAGE
     --------------------------------------------------------- */

  async function sendMessage() {

    const message =
      input.value.trim();

    if (!message) return;


    /* User message */

    addMessage(
      message,
      "user"
    );


    input.value = "";

    input.focus();


    /* Typing */

    const typing =
      showTyping();


    await new Promise(
      resolve =>
        setTimeout(resolve, 650)
    );


    typing.remove();


    /* AI response */

    const response =
      getResponse(message);


    addMessage(
      response,
      "bot"
    );

  }


  /* ---------------------------------------------------------
     BUTTON
     --------------------------------------------------------- */

  if (sendButton) {

    sendButton.addEventListener(
      "click",
      sendMessage
    );

  }


  /* ---------------------------------------------------------
     ENTER KEY
     --------------------------------------------------------- */

  input.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        sendMessage();

      }

    }
  );


  /* ---------------------------------------------------------
     QUICK QUESTIONS
     --------------------------------------------------------- */

  document
    .querySelectorAll(
      "[data-ai-question]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          input.value =
            button.dataset.aiQuestion || "";

          sendMessage();

        }
      );

    });


  /* ---------------------------------------------------------
     TYPING STYLE
     --------------------------------------------------------- */

  const style =
    document.createElement("style");

  style.textContent = `

    .ai-typing {
      display: flex;
      gap: 5px;
      align-items: center;
      width: fit-content;
    }

    .ai-typing span {
      animation: aiDot 1.2s infinite;
      opacity: 0.35;
    }

    .ai-typing span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .ai-typing span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes aiDot {

      0%,
      60%,
      100% {
        opacity: 0.3;
        transform: translateY(0);
      }

      30% {
        opacity: 1;
        transform: translateY(-3px);
      }

    }

    .chat-area {
      overflow-y: auto;
      scroll-behavior: smooth;
    }

  `;

  document.head.appendChild(style);

});
