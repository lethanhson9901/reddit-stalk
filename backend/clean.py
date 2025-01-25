import json

def clean_comments(comments):
    cleaned_comments = []
    for comment in comments:
        author = comment.get("author", "")
        text = comment.get("text", "")
        if author and text:
            replies = clean_comments(comment.get("replies", []))  # Recursively clean replies
            comment_data = {"author": author, "text": text}
            if replies:  # Only include "replies" if it's not empty
                comment_data["replies"] = replies
            cleaned_comments.append(comment_data)
    return cleaned_comments

def clean_json_data(data):
    cleaned_items = {}
    for item in data.get("items", []):
        cleaned_items[item.get("id", "")] = {
            "title": item.get("title", ""),
            "author": item.get("author", ""),
            "text": item.get("text", ""),
            "subreddit": item.get("subreddit", ""),  # Include subreddit information
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
    
    cleaned_data = clean_json_data(data)
    
    with open(output_file, 'w') as file:
        json.dump(cleaned_data, file, indent=4)

if __name__ == "__main__":
    main()