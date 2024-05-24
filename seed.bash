#!/bin/bash
set -euo pipefail

# Function to install jq if not already installed
install_jq() {
    if command -v jq >/dev/null 2>&1; then
        echo "jq is already installed."
    else
        echo "jq is not installed. Installing jq..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            brew install jq
        else
            echo "Unsupported OS. Please install jq manually."
            exit 1
        fi
    fi
}

# Used to parse curl output below
install_jq


create_user1_output=$(curl -s -X POST http://localhost:3000/api/v3/user/auth/local/register \
  -H "Content-Type: application/json" \
  -d '{
        "username": "testuser1",
        "email": "kevin@detail.dev",
        "password": "password",
        "confirmPassword": "password"
      }')

login_user1_output=$(curl -s -X POST http://localhost:3000/api/v3/user/auth/local/login \
  -H "Content-Type: application/json" \
  -d '{
        "username": "testuser1",
        "password": "password"
      }')

USER1_API_TOKEN=$(echo "$login_user1_output" | jq -r '.data.apiToken')
USER1_ID=$(echo "$login_user1_output" | jq -r '.data.id')
CLIENT="$USER1_ID-Testing"

create_group_output=$(curl -s -X POST http://localhost:3000/api/v3/groups \
    -H "Content-Type: application/json" \
    -H "x-api-user: $USER1_ID" \
    -H "x-api-key: $USER1_API_TOKEN" \
    -H "x-client: $USER1_ID-Testing" \
    -d '{
          "name": "First group",
          "type": "party",
          "privacy": "private"
        }')
GROUP1_ID=$(echo "$create_group_output" | jq -r '.data.id')

create_challenge_output=$(curl -s -X POST http://localhost:3000/api/v3/challenges \
    -H "Content-Type: application/json" \
    -H "x-api-user: $USER1_ID" \
    -H "x-api-key: $USER1_API_TOKEN" \
    -H "x-client: $USER1_ID-Testing" \
    -d "{
          \"group\": \"$GROUP1_ID\",
          \"name\": \"First challenge\",
          \"shortName\": \"First challenge\",
          \"summary\": \"This is a first challenge\",
          \"description\": \"This is a detailed description of the first challenge\",
          \"official\": false,
          \"prize\": 0
        }")

CHALLENGE1_ID=$(echo "$create_challenge_output" | jq -r '.data.id')

create_chat_id=$(curl -s -X POST http://localhost:3000/api/v3/groups/$GROUP1_ID/chat \
    -H "Content-Type: application/json" \
    -H "x-api-user: $USER1_ID" \
    -H "x-api-key: $USER1_API_TOKEN" \
    -H "x-client: $USER1_ID-Testing" \
    -d '{
          "message": "This is my first chat ever"
        }')

CHAT1_UUID=$(echo "$create_chat_id" | jq -r '.data.message.uuid')

echo "user 1's id is $USER1_ID"
echo "user 1's api token is $USER1_API_TOKEN"
echo "the client is $CLIENT"
echo "UUID of chat is $CHAT1_UUID"
echo "Group 1's id is $GROUP1_ID"
echo "Challenge 1's id is $CHALLENGE1_ID"


