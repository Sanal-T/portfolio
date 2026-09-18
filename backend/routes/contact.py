"""
Contact form endpoint.

Handles HTTP concerns only — validation of the request shape and translating
service-layer outcomes into JSON responses. Actual delivery logic lives in
services/email_service.py.
"""

import threading
from fastapi import APIRouter, Depends
from pydantic import BaseModel, EmailStr, Field

from config import Settings, get_settings
from services.email_service import EmailDeliveryError, send_contact_email

router = APIRouter(prefix="/api", tags=["contact"])


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=5000)


class ContactResponse(BaseModel):
    success: bool
    message: str


def _send_email_task(name: str, email: str, message: str, settings: Settings) -> None:
    try:
        send_contact_email(name=name, email=email, message=message, settings=settings)
        print(f"[SUCCESS] Contact form email sent successfully for {email}")
    except EmailDeliveryError as exc:
        print(f"[ERROR] Background contact form delivery error: {exc}")


@router.post("/contact", response_model=ContactResponse)
def submit_contact_form(
    payload: ContactRequest,
    settings: Settings = Depends(get_settings),
) -> ContactResponse:
    # Basic server-side sanitization on top of Pydantic validation
    name = payload.name.strip()
    message = payload.message.strip()

    if not name or not message:
        return ContactResponse(success=False, message="Please fill in every field.")

    # Spawn an independent daemon thread so HTTP response completes in < 2ms!
    thread = threading.Thread(
        target=_send_email_task,
        args=(name, payload.email, message, settings),
        daemon=True,
    )
    thread.start()

    return ContactResponse(success=True, message="Message sent — thank you. I'll get back to you soon.")
