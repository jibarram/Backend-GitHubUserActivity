# **GitHub Activity CLI**

### Sample solution for the [github-user-activity](https://roadmap.sh/projects/github-user-activity) challenge from [roadmap.sh](https://roadmap.sh).

## **How to Run**

### Clone the repository and run the following commands:

```bash
git clone https://github.com/jibarram/github-activity-cli.git
cd github-activity-cli
```

### Make sure you have Node.js installed on your system. You can verify by running:

```bash
node -v
```

## **Run the Project**

### Execute the following command to fetch the activity of a GitHub user:

```bash
node github-activity.js <username>
```

### Example:

```bash
node github-activity.js kamranahmedse
```

## **Features**

### Fetch recent activity:
- View the latest public activity of any GitHub user by providing their username.
- Displays events like pushing commits, opening issues, starring repositories, and more.

### Graceful error handling:
- Handles invalid usernames or API errors gracefully.

### Lightweight:
- Built without external dependencies for maximum simplicity.

## **Notes**

### API Usage:
- The CLI fetches data from the GitHub API endpoint: `https://api.github.com/users/<username>/events`.

### Public data only:
- Only public activity is displayed. Activities in private repositories or other non-public events are excluded.

### Suggestions:
- Feel free to extend the project by adding more features like filtering by event type or caching data for repeated queries.

