# Security & Privacy — VitalLoop

VitalLoop is a healthcare technology prototype focused on blood-resource discovery, request coordination and health information access.

## Important Safety Principles

- VitalLoop does not collect, test, store, transport or release blood.
- Blood collection, testing, storage and issue are handled by authorized blood centres and healthcare facilities.
- VitalLoop does not guarantee blood availability.
- Donor discovery is a coordination feature and does not guarantee donor availability.
- Final blood compatibility and transfusion decisions must be made by qualified healthcare professionals.
- Users should never pay an individual donor directly for blood.
- Any applicable processing or service charges should be handled only through an authorized blood centre or healthcare facility.
- Prototype data shown in this repository is demonstration data and must not be treated as real-time blood inventory.

## Data Privacy

The prototype should not be used to collect real patient medical information.

For a production deployment:

- Use HTTPS.
- Encrypt sensitive data in transit and at rest.
- Apply authentication and authorization.
- Store only necessary personal and healthcare information.
- Use secure backend APIs instead of exposing sensitive data in frontend code.
- Maintain audit logs for sensitive operations.
- Follow applicable Indian healthcare, privacy and data-protection requirements.

## Emergency Disclaimer

VitalLoop is not a replacement for emergency medical services, doctors, hospitals or authorized blood centres.

In a medical emergency, contact the appropriate emergency service or healthcare facility immediately.

## Reporting a Security Issue

If you discover a security vulnerability in this prototype, please report it privately to the project maintainers rather than publicly exposing sensitive information.

## Project Status

This repository is an educational/SIH prototype. Features such as real-time blood inventory, verified donor matching, identity verification and secure patient records require a properly secured backend and authorized healthcare integrations before production use.
