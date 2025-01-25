import json
import os

def filter_by_subreddit(cleaned_data, output_folder):
    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Group items by subreddit
    subreddit_data = {}
    for item_id, item in cleaned_data["items"].items():
        subreddit = item.get("subreddit", "unknown")
        if subreddit not in subreddit_data:
            subreddit_data[subreddit] = []
        subreddit_data[subreddit].append(item)

    # Save each subreddit's data to a separate file
    for subreddit, items in subreddit_data.items():
        filename = os.path.join(output_folder, f"{subreddit}.json")
        with open(filename, "w") as file:
            json.dump({"items": items}, file, indent=4)
        print(f"Saved {len(items)} items to {filename}")

def main():
    input_file = 'cleaned_community_news_TimeFilter.DAY.json'
    output_folder = 'subreddit_news'

    # Load the cleaned data
    with open(input_file, "r") as file:
        cleaned_data = json.load(file)

    # Filter by subreddit and save to separate files
    filter_by_subreddit(cleaned_data, output_folder)

if __name__ == "__main__":
    main()