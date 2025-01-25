import json

def sort_data(data):
    # Group items by subreddit
    subreddit_groups = {}
    for item in data.get("items", []):
        subreddit = item.get("subreddit", "")
        if subreddit not in subreddit_groups:
            subreddit_groups[subreddit] = []
        subreddit_groups[subreddit].append(item)
    
    # Sort each subreddit group by score (descending)
    for subreddit, items in subreddit_groups.items():
        subreddit_groups[subreddit] = sorted(items, key=lambda x: x.get("score", 0), reverse=True)
    
    # Flatten the sorted groups back into a single list
    sorted_items = []
    for subreddit in sorted(subreddit_groups.keys()):  # Sort subreddits alphabetically
        sorted_items.extend(subreddit_groups[subreddit])
    
    # Update the original data with sorted items
    data["items"] = sorted_items
    return data

def clean_comments(comments):
    cleaned_comments = {}
    for comment in comments:
        author = comment.get("author", "")
        text = comment.get("text", "")
        if author and text:
            replies = clean_comments(comment.get("replies", []))  # Recursively clean replies
            comment_data = {"text": text}
            if replies:  # Only include "replies" if it's not empty
                comment_data["replies"] = replies
            cleaned_comments[author] = comment_data
    return cleaned_comments

def clean_json_data(data):
    cleaned_items = {}
    for item in data.get("items", []):
        cleaned_items[item.get("id", "")] = {
            "title": item.get("title", ""),
            "author": item.get("author", ""),
            "text": item.get("text", ""),
            "subreddit": item.get("subreddit", ""),  # Include subreddit information
            "score": item.get("score", 0),  # Include score for reference
            "comments": clean_comments(item.get("comments", []))  # Clean comments hierarchically
        }
    
    cleaned_data = {
        "metadata": data.get("metadata", {}),
        "items": cleaned_items
    }
    return cleaned_data

def main():
    input_file = 'community_news_TimeFilter.DAY.json'
    output_file = 'cleaned_community_news_TimeFilter.DAY.json'
    
    with open(input_file, 'r') as file:
        data = json.load(file)
    
    # Sort data by subreddit and score
    sorted_data = sort_data(data)
    
    # Clean the sorted data
    cleaned_data = clean_json_data(sorted_data)
    
    with open(output_file, 'w') as file:
        json.dump(cleaned_data, file, indent=4)

if __name__ == "__main__":
    main()