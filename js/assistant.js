/* =========================================
   VITALLOOP - HEALTHCARE ASSISTANT
   Safe Demo Assistant
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const input =
        document.querySelector("#assistantInput") ||
        document.querySelector("#chatInput");

    const sendButton =
        document.querySelector("#assistantSend") ||
        document.querySelector("#sendMessage");

    const chatBox =
        document.querySelector("#assistantMessages") ||
        document.querySelector("#chatMessages");

    if (!input || !sendButton || !chatBox) {
        return;
    }


    /* -----------------------------------------
       SAFE DEMO RESPONSES
    ----------------------------------------- */

    const responses = [

        {
            keywords: ["blood", "blood group", "blood needed", "blood requirement"],
            answer:
                "I can help you discover relevant blood resources. " +
                "Please use the Blood Request page and enter the required blood group, " +
                "city and hospital/facility details. VitalLoop does not guarantee live availability."
        },

        {
            keywords: ["donor", "donation", "donate"],
            answer:
                "Potential donors can register through the Donor Registration page. " +
                "Actual donation must take place at an authorized blood centre after the required medical screening."
        },

        {
            keywords: ["camp", "blood camp", "donation camp"],
            answer:
                "You can explore the Blood Donation Camps section to see prototype camp information. " +
                "Always verify the date, location and organizer before visiting."
        },

        {
            keywords: ["emergency", "accident", "urgent"],
            answer:
                "For a medical emergency, contact local emergency services or go to the nearest appropriate healthcare facility immediately. " +
                "VitalLoop is a navigation and coordination concept, not a replacement for emergency medical care."
        },

        {
            keywords: ["medicine", "tablet", "drug"],
            answer:
                "I can provide general educational information about medicines, but I cannot diagnose conditions or prescribe medicines. " +
                "For medicine selection or changes, consult a qualified healthcare professional."
        },

        {
            keywords: ["report", "test", "lab"],
            answer:
                "Medical reports should be interpreted in context by a qualified healthcare professional. " +
                "VitalLoop can be used as an information and navigation layer, not as a diagnostic service."
        },

        {
            keywords: ["hello", "hi", "hey", "namaste"],
            answer:
                "Hello! 👋 I am the VitalLoop Assistant. I can help you navigate blood resources, donor registration, camps and general healthcare information."
        },

        {
            keywords: ["help", "what can you do"],
            answer:
                "I can help you navigate Blood Requests, Donor Registration, Blood Camps and general healthcare information. " +
                "For urgent or serious medical situations, please contact qualified healthcare professionals."
        }

    ];


    /* -----------------------------------------
       ADD MESSAGE
    ----------------------------------------- */

    function addMessage(text, sender) {

        const message = document.createElement("div");

        message.className =
            "assistant-message " +
            (sender === "user"
                ? "user-message"
                : "bot-message");

        message.innerHTML = `
            <div class="assistant-message-content">
                ${escapeHTML(text)}
            </div>
        `;

        chatBox.appendChild(message);

        chatBox.scrollTop =
            chatBox.scrollHeight;
    }


    /* -----------------------------------------
       TYPING INDICATOR
    ----------------------------------------- */

    function showTyping() {

        const typing =
            document.createElement("div");

        typing.id =
            "assistantTyping";

        typing.className =
            "assistant-message bot-message";

        typing.innerHTML = `
            <div class="assistant-message-content">
                <span>VitalLoop Assistant is typing</span>
                <span class="typing-dots">•••</span>
            </div>
        `;

        chatBox.appendChild(typing);

        chatBox.scrollTop =
            chatBox.scrollHeight;
    }


    function removeTyping() {

        const typing =
            document.querySelector(
                "#assistantTyping"
            );

        if (typing) {
            typing.remove();
        }
    }


    /* -----------------------------------------
       FIND RESPONSE
    ----------------------------------------- */

    function getResponse(message) {

        const text =
            message.toLowerCase().trim();

        for (const item of responses) {

            const matched =
                item.keywords.some(function (keyword) {

                    return text.includes(
                        keyword.toLowerCase()
                    );

                });

            if (matched) {
                return item.answer;
            }
        }

        return (
            "I can help with blood-resource discovery, " +
            "donor registration, blood camps and general healthcare navigation. " +
            "Please describe what you need in simple words."
        );
    }


    /* -----------------------------------------
       SEND MESSAGE
    ----------------------------------------- */

    function sendMessage() {

        const message =
            input.value.trim();

        if (!message) {
            return;
        }

        addMessage(
            message,
            "user"
        );

        input.value = "";

        showTyping();

        /*
          Demo delay to create a natural
          assistant interaction.
        */

        setTimeout(function () {

            removeTyping();

            addMessage(
                getResponse(message),
                "bot"
            );

        }, 650);

    }


    /* -----------------------------------------
       SEND BUTTON
    ----------------------------------------- */

    sendButton.addEventListener(
        "click",
        sendMessage
    );


    /* -----------------------------------------
       ENTER KEY
    ----------------------------------------- */

    input.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );


    /* -----------------------------------------
       QUICK QUESTIONS
    ----------------------------------------- */

    const quickButtons =
        document.querySelectorAll(
            "[data-assistant-question]"
        );

    quickButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const question =
                    button.getAttribute(
                        "data-assistant-question"
                    );

                if (!question) {
                    return;
                }

                input.value = question;

                sendMessage();

            }
        );

    });


    /* -----------------------------------------
       CLEAR CHAT
    ----------------------------------------- */

    const clearButton =
        document.querySelector(
            "#clearAssistant"
        );

    if (clearButton) {

        clearButton.addEventListener(
            "click",
            function () {

                chatBox.innerHTML = "";

                addMessage(
                    "Hello! 👋 How can I help you navigate VitalLoop today?",
                    "bot"
                );

            }
        );

    }


    /* -----------------------------------------
       INITIAL MESSAGE
    ----------------------------------------- */

    if (chatBox.children.length === 0) {

        addMessage(
            "Hello! 👋 I am the VitalLoop Assistant. Ask me about blood resources, donors, blood camps or healthcare navigation.",
            "bot"
        );

    }


    /* -----------------------------------------
       HTML ESCAPE
    ----------------------------------------- */

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;
    }


    /* -----------------------------------------
       ACCESSIBILITY
    ----------------------------------------- */

    input.setAttribute(
        "aria-label",
        "Ask VitalLoop Assistant"
    );

    sendButton.setAttribute(
        "aria-label",
        "Send message"
    );


    /* -----------------------------------------
       DEMO STATUS
    ----------------------------------------- */

    const status =
        document.querySelector(
            "#assistantStatus"
        );

    if (status) {

        status.textContent =
            "Demo Assistant • Educational Use";

    }


    console.log(
        "VitalLoop Assistant loaded successfully."
    );

});
