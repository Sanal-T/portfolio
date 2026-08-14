"""
Application configuration.

All secrets and environment-specific values are loaded from environment
variables (via a local .env file in development). Never hardcode credentials
here — this file only defines *how* config is loaded, not the values.
"""

from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # General
    environment: str = "development"
    allowed_origins: str = "http://localhost:8000,http://127.0.0.1:8000"

    # Email service (SMTP)
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = ""
    smtp_use_tls: bool = True

    # Where contact-form messages should be delivered
    contact_recipient_email: str = ""
    contact_sender_email: str = ""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @property
    def allowed_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    """Cached settings instance — env is read once per process."""
    return Settings()
