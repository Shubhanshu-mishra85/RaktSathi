# Security & Privacy

## RaktSathi — Intelligent Blood Emergency Coordination Network

RaktSathi is a healthcare technology prototype designed to improve emergency blood-resource discovery, coordination, verification, and request tracking.

Security, privacy, and responsible handling of healthcare-related information are important parts of the project.

---

## 1. Project Status

RaktSathi is currently a prototype/demo system developed for Smart India Hackathon (SIH).

The current prototype may use browser-based storage such as `localStorage` for demonstration purposes.

It is **not a production healthcare system** and should not be treated as a substitute for authorized healthcare facilities, blood centres, emergency services, or professional medical advice.

---

## 2. Data Responsibility

RaktSathi may demonstrate collection of information such as:

- Patient/requester name
- Contact number
- Blood group
- Blood component
- Required units
- District/city
- Healthcare facility
- Requirement type
- Required date
- Additional request information
- Donor-network information in the prototype

Users should provide only the information necessary for the intended coordination workflow.

---

## 3. Sensitive Information

Healthcare-related information can be sensitive.

The production version of RaktSathi should implement appropriate:

- Authentication
- Authorization
- Encryption in transit
- Encryption at rest
- Secure database storage
- Access controls
- Audit logging
- Data retention policies
- Secure API communication
- Input validation
- Rate limiting
- Secure session management

The current prototype does not claim to provide all of these production-level controls.

---

## 4. No Medical Decision Making

RaktSathi does not independently:

- Diagnose patients
- Prescribe medicines
- Determine blood compatibility
- Approve blood transfusions
- Test blood
- Store blood
- Transport blood
- Release blood
- Perform transfusions

Medical decisions and blood-related clinical processes must remain with qualified healthcare professionals and authorized facilities.

---

## 5. Blood Availability Verification

Information displayed by RaktSathi should not be interpreted as a guarantee of blood availability.

Availability, eligibility, compatibility, and final allocation must be confirmed by the relevant authorized blood centre or healthcare facility.

The platform is intended to support discovery and coordination, not to replace official verification.

---

## 6. Prototype Storage

Some prototype modules may store demonstration data locally in the user's browser.

For example:

```text
localStorage
├── Emergency Request
├── Blood Request
└── Donor Network Information
