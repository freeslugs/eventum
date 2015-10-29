#!/bin/sh

# flask settings
export HOST=0.0.0.0
export PORT=5000
export DEBUG=TRUE
export SECRET_KEY="CHANGEME" #INSERT_YOUR_KEY

# google related credentials
export INSTALLED_APP_CLIENT_SECRET_PATH=client_secrets.json
export CREDENTIALS_PATH=config/credentials.json
export GOOGLE_AUTH_ENABLED=FALSE # Mark this true to enable authentication
export CLIENT_SECRETS_PATH=config/client_secrets.json

# Cross-site request forgery settings
export CSRF_ENABLED=TRUE
export CSRF_SESSION_KEY= # FILL

# calendar settings
export PRIVATE_CALENDAR_ID= # FILL
export PUBLIC_CALENDAR_ID= # FILL

# mongo db settings
export MONGO_DATABASE=eventum

# logging settings
export LOG_FILE_MAX_SIZE=256   # in MB
export APP_LOG_NAME=log/app.log
export WERKZEUG_LOG_NAME=log/werkzeug.log
