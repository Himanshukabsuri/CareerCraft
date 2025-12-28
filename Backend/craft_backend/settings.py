REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
}
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_HEADERS = [
    "authorization",
    "content-type",
    "accept",
    "origin",
]