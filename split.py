import json
import os

def split_json(file_path, output_dir, lines_per_file=10000):
    # Create the output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Open the JSON file with the correct encoding (UTF-8)
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    messages = data["messages"]
    file_number = 1
    for i in range(0, len(messages), lines_per_file):
        split_data = {"messages": messages[i:i + lines_per_file]}
        output_file = os.path.join(output_dir, f"chat{file_number}.json")
        with open(output_file, 'w', encoding='utf-8') as outfile:
            json.dump(split_data, outfile, indent=2)
        file_number += 1

# Usage: Split the chat.json file into smaller files and save inside the 'chat' folder
split_json("chat/chat.json", "chat", lines_per_file=1000)
