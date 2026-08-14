"""
Contact form endpoint.

Handles HTTP concerns only — validation of the request shape and translating
service-layer outcomes into JSON responses. Actual delivery logic lives in
services/email_service.py.
"""

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


@router.post("/contact", response_model=ContactResponse)
def submit_contact_form(
    payload: ContactRequest,
    settings: Settings = Depends(get_settings),
) -> ContactResponse:
    # Basic server-side sanitization on top of Pydantic validation —
    # never trust that frontend validation alone was sufficient.
    name = payload.name.strip()
    message = payload.message.strip()

    if not name or not message:
        return ContactResponse(success=False, message="Please fill in every field.")

    try:
        send_contact_email(name=name, email=payload.email, message=message, settings=settings)
    except EmailDeliveryError:
        return ContactResponse(
            success=False,
            message="Something went wrong while sending your message. Please try again shortly.",
        )

    return ContactResponse(success=True, message="Message sent — thank you. I'll get back to you soon.")
