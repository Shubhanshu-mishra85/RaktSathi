/* =========================================================
   RaktSathi - Smart Healthcare Assistant
   Prototype Rule-Based Assistant
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initAssistant();
});


function initAssistant() {

  const form =
    document.getElementById("assistantForm");

  const input =
    document.getElementById("assistantInput");

  const messages =
    document.getElementById("assistantMessages");

  if (!form || !input || !messages) return;


  /* =======================================================
     FORM SUBMIT
     ======================================================= */

  form.addEventListener("submit", event => {
    event.preventDefault();

    const text =
      input.value.trim();

    if (!text) return;

    addMessage(
      text,
      "user"
    );

    input.value = "";

    setTimeout(() => {

      const response =
        generateResponse(text);

      addMessage(
        response,
        "assistant"
      );

    }, 350);
  });


  /* =======================================================
     QUICK ACTIONS
     ======================================================= */

  document
    .querySelectorAll("[data-assistant-query]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const query =
            button.dataset.assistantQuery;

          if (!query) return;

          addMessage(
            query,
            "user"
          );

          setTimeout(() => {

            addMessage(
              generateResponse(query),
              "assistant"
            );

          }, 350);
        }
      );
    });
}


/* =========================================================
   RESPONSE ENGINE
   ========================================================= */

function generateResponse(text) {

  const query =
    text.toLowerCase().trim();


  /* Emergency */
  if (
    query.includes("emergency") ||
    query.includes("urgent") ||
    query.includes("critical")
  ) {
    return `
      <strong>Emergency Blood Coordination</strong><br><br>

      Agar blood ki urgent requirement hai, RaktSathi
      ke Emergency Request module me request create karein.

      <br><br>

      Workflow:
      <strong>
      Request → Match → Coordinate → Verify → Resolve
      </strong>

      <br><br>

      Current availability ko authorized blood centre
      ya healthcare facility se verify karna zaroori hai.
    `;
  }


  /* Find blood */
  if (
    query.includes("find blood") ||
    query.includes("blood availability") ||
    query.includes("blood chahiye") ||
    query.includes("blood kaha")
  ) {
    return `
      <strong>Find Blood Resources</strong><br><br>

      Aap blood group, component, district/city aur
      blood centre ke basis par available resource information
      search kar sakte hain.

      <br><br>

      RaktSathi availability guarantee nahi karta.
      Final availability aur eligibility authorized facility
      se verify karein.

      <br><br>

      <a href="find-blood.html">
        Open Resource Discovery →
      </a>
    `;
  }


  /* Blood request */
  if (
    query.includes("request") ||
    query.includes("blood request") ||
    query.includes("request kaise")
  ) {
    return `
      <strong>Create Blood Request</strong><br><br>

      Blood requirement ke liye patient/requester details,
      blood group, component, units, district aur healthcare
      facility enter karke request create ki ja sakti hai.

      <br><br>

      Request ke baad ek unique Request ID generate hoti hai.

      <br><br>

      <a href="blood-request.html">
        Create Request →
      </a>
    `;
  }


  /* Track request */
  if (
    query.includes("track") ||
    query.includes("status") ||
    query.includes("request id")
  ) {
    return `
      <strong>Request Tracking</strong><br><br>

      Apni Request ID ka use karke prototype me
      request status check kiya ja sakta hai.

      <br><br>

      Current prototype request information ko
      same device ke browser storage me maintain karta hai.

      <br><br>

      <a href="blood-request.html">
        Track Request →
      </a>
    `;
  }


  /* Donor */
  if (
    query.includes("donor") ||
    query.includes("donate") ||
    query.includes("donation")
  ) {
    return `
      <strong>Smart Donor Network</strong><br><br>

      RaktSathi potential donor discovery aur coordination
      ko support karne ka prototype workflow provide karta hai.

      <br><br>

      Donor eligibility, screening aur actual blood donation
      authorized healthcare/blood-centre professionals ke
      under hota hai.

      <br><br>

      <a href="donor.html">
        Open Donor Network →
      </a>
    `;
  }


  /* Camps */
  if (
    query.includes("camp") ||
    query.includes("blood camp")
  ) {
    return `
      <strong>Blood Camp Discovery</strong><br><br>

      RaktSathi camp discovery module me camp name,
      organizer, date, time aur location information
      display ki ja sakti hai.

      <br><br>

      Camp details ko participation se pehle organizer
      ya authorized facility se verify karein.

      <br><br>

      <a href="camps.html">
        Explore Camps →
      </a>
    `;
  }


  /* Blood groups */
  if (
    query.includes("blood group") ||
    query.includes("blood groups") ||
    query.includes("a+") ||
    query.includes("b+") ||
    query.includes("o+") ||
    query.includes("ab+")
  ) {
    return `
      <strong>Blood Groups</strong><br><br>

      Main ABO blood groups hain:

      <br><br>

      A, B, AB aur O.

      <br>

      Inke saath Rh factor ke basis par
      positive (+) ya negative (-) classification hoti hai.

      <br><br>

      Blood compatibility ka final decision
      qualified healthcare professionals karte hain.
    `;
  }


  /* RaktSathi */
  if (
    query.includes("raktsathi") ||
    query.includes("what is raktsathi") ||
    query.includes("about")
  ) {
    return `
      <strong>RaktSathi</strong><br><br>

      RaktSathi ek Intelligent Blood Emergency Coordination
      Network prototype hai.

      <br><br>

      Iska focus emergency blood requirements ko potential
      resources, donor networks, healthcare facilities aur
      verification workflows ke saath coordinate karna hai.

      <br><br>

      <strong>
      From Blood Search to Blood Coordination.
      </strong>
    `;
  }


  /* Medicine */
  if (
    query.includes("medicine") ||
    query.includes("dawai") ||
    query.includes("medication")
  ) {
    return `
      <strong>Medicine & Care Information</strong><br><br>

      RaktSathi general healthcare navigation aur
      information support karta hai.

      <br><br>

      Ye assistant diagnosis ya prescription provide nahi karta.

      <br><br>

      Medicine-related decisions ke liye qualified
      healthcare professional se consult karein.

      <br><br>

      <a href="medicine.html">
        Healthcare Support →
      </a>
    `;
  }


  /* Help */
  if (
    query === "help" ||
    query.includes("what can you do") ||
    query.includes("how can you help")
  ) {
    return `
      <strong>RaktSathi Assistant</strong><br><br>

      Main in modules ke baare me guide kar sakta hoon:

      <br><br>

      • Find Blood Resources<br>
      • Emergency Blood Request<br>
      • Request Tracking<br>
      • Smart Donor Network<br>
      • Blood Camps<br>
      • Blood Group Information<br>
      • Medicine & Care Information<br>
      • RaktSathi Project Information
    `;
  }


  /* Default */
  return `
    <strong>I'm here to help.</strong><br><br>

    Aap mujhse blood availability, emergency request,
    donor network, request tracking, blood camps,
    blood groups ya RaktSathi ke baare me pooch sakte hain.

    <br><br>

    Example:
    <br>
    “Find blood”
    <br>
    “Create blood request”
    <br>
    “Track my request”
    <br>
    “What is RaktSathi?”
  `;
}


/* =========================================================
   MESSAGE DISPLAY
   ========================================================= */

function addMessage(
  message,
  sender
) {

  const container =
    document.getElementById(
      "assistantMessages"
    );

  if (!container) return;

  const messageElement =
    document.createElement("div");

  messageElement.className =
    `assistant-message ${sender}`;

  if (sender === "assistant") {
    messageElement.innerHTML =
      message;
  } else {
    messageElement.textContent =
      message;
  }

  container.appendChild(
    messageElement
  );

  container.scrollTop =
    container.scrollHeight;
}
