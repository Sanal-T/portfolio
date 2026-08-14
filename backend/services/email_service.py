"""
Email delivery service.

Business logic for sending contact-form submissions lives here, kept out of
the route handler. Uses SMTP credentials from environment variables — never
hardcode secrets in this file.
"""

import smtplib
from email.message import EmailMessage
from email.utils import formataddr

from config import Settings


class EmailDeliveryError(Exception):
    """Raised when the email fails to send."""


def send_contact_email(name: str, email: str, message: str, settings: Settings) -> None:
    """
    Send a contact-form submission to the portfolio owner's inbox.

    Raises EmailDeliveryError if sending fails, so the route layer can
    translate that into a clean JSON error response.
    """
    if not (settings.smtp_host and settings.smtp_username and settings.smtp_password):
        raise EmailDeliveryError("Email service is not configured.")

    if not settings.contact_recipient_email:
        raise EmailDeliveryError("No recipient email configured.")

    msg = EmailMessage()
    msg["Subject"] = f"Portfolio contact form — {name}"
    msg["From"] = formataddr((name, settings.contact_sender_email or settings.smtp_username))
    msg["To"] = settings.contact_recipient_email
    msg["Reply-To"] = email

    msg.set_content(
        f"New message from the portfolio contact form.\n\n"
        f"Name: {name}\n"
        f"Email: {email}\n\n"
        f"Message:\n{message}\n"
    )

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
            if settings.smtp_use_tls:
                server.starttls()
            server.login(settings.smtp_username, settings.smtp_password)
            server.send_message(msg)
    except Exception as exc:
        raise EmailDeliveryError("Failed to send email.") from exc
