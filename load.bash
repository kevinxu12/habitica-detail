#!/bin/bash
set -euo pipefail

usage() {
  echo "Usage: $0 --user_id=<user_id> --api_token=<api_token> --group_id=<group_id> --challenge_id=<challenge_id>"
  exit 1
}

if [ "$#" -ne 4 ]; then
  usage
fi

# Parse command line arguments
for arg in "$@"
do
  case $arg in
    --user_id=*)
      USER_ID="${arg#*=}"
      shift
      ;;
    --api_token=*)
      API_TOKEN="${arg#*=}"
      shift
      ;;
    --group_id=*)
      GROUP_ID="${arg#*=}"
      shift
      ;;
     --challenge_id=*)
      CHALLENGE_ID="${arg#*=}"
      shift
      ;;
    *)
      usage
      ;;
  esac
done

# Check if the necessary arguments are empty
if [ -z "$USER_ID" ] || [ -z "$API_TOKEN" ] || [ -z "$GROUP_ID" ] || [ -z "$CHALLENGE_ID" ]; then
  usage
fi

echo "Started execution"


get_user_output=$(curl -s -X GET http://localhost:3000/api/v3/user \
    -H "Content-Type: application/json" \
    -H "x-api-user: $USER_ID" \
    -H "x-api-key: $API_TOKEN" \
    -H "x-client: $USER_ID-Testing")
    
get_groups_output=$(curl -s -X GET "http://localhost:3000/api/v3/groups?type=party,guilds,tavern,privateGuilds"  \
    -H "Content-Type: application/json" \
    -H "x-api-user: $USER_ID" \
    -H "x-api-key: $API_TOKEN" \
    -H "x-client: $USER_ID-Testing")

# Get page 0 
get_challenges_user_page_0_output=$(curl -s -X GET "http://localhost:3000/api/v3/challenges/user?page=0"  \
    -H "Content-Type: application/json" \
    -H "x-api-user: $USER_ID" \
    -H "x-api-key: $API_TOKEN" \
    -H "x-client: $USER_ID-Testing")
    
get_challenges_groups_output=$(curl -s -X GET "http://localhost:3000/api/v3/challenges/groups/$GROUP_ID"  \
    -H "Content-Type: application/json" \
    -H "x-api-user: $USER_ID" \
    -H "x-api-key: $API_TOKEN" \
    -H "x-client: $USER_ID-Testing")

get_challenges_export_csv_output=$(curl -s -X GET "http://localhost:3000/api/v3/challenges/$CHALLENGE_ID/export/csv"  \
    -H "Content-Type: application/json" \
    -H "x-api-user: $USER_ID" \
    -H "x-api-key: $API_TOKEN" \
    -H "x-client: $USER_ID-Testing")

get_groups_chat_output=$(curl -s -X GET "http://localhost:3000/api/v3/groups/$GROUP_ID/chat"  \
    -H "Content-Type: application/json" \
    -H "x-api-user: $USER_ID" \
    -H "x-api-key: $API_TOKEN" \
    -H "x-client: $USER_ID-Testing")

echo "Finished execution"
