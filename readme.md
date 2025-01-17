# Article Management API

This project is a simple Express.js API for managing and searching articles. The API allows you to add articles, view all articles, search for specific articles by title or keyword, and fetch articles by ID.

## Features

- Add articles with a unique ID, title, and text.
- Retrieve all articles.
- Search for articles by title or keyword and sorts them based on keyword frequency.
- Get details of a specific article by its ID.

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node app.js
   ```

The server will run on `http://localhost:3000`.

## API Routes

### `GET /`
**Description:**
Returns a message indicating that the API is running.

**Response:**
```json
"Article API is running"
```

### `POST /articles`
**Description:**
Adds a new article to the list.

**Request Body:**
```json
{
  "id": "<unique_id>",
  "title": "<article_title>",
  "text": "<article_text>"
}
```

**Responses:**
- Success:
  ```json
  { "message": "success" }
  ```
- Failure:
  ```json
  { "message": "failed. Invalid article format" }
  ```

### `GET /viewarticles`
**Description:**
Returns the list of all articles.

**Response:**
```json
{
  "articles": [
    {
      "id": "<id>",
      "title": "<title>",
      "text": "<text>"
    },
    ...
  ]
}
```

### `GET /getarticle`
**Description:**
Fetches a specific article by its ID.

**Query Parameters:**
- `id`: The unique ID of the article.

**Responses:**
- Success:
  ```json
  { "article": { "id": "<id>", "title": "<title>", "text": "<text>" } }
  ```
- Failure:
  ```json
  { "error": "article not found" }
  ```

### `GET /search`
**Description:**
Searches for articles by title or keyword in the text.

**Query Parameters:**
- `title`: The title of the article to search for.
- `key`: A keyword to search for in the article text.

**Responses:**
- Search by Title (Success):
  ```json
  { "article": { "id": "<id>", "title": "<title>", "text": "<text>" } }
  ```
- Search by Keyword (Success):
  ```json
  {
    "articles": [
      {
        "book": { "id": "<id>", "title": "<title>", "text": "<text>" },
        "keyfreq": <frequency>
      },
      ...
    ]
  }
  ```
- Failure:
  ```json
  { "message": "failed" }
  ```

## Helper Functions

### `getfreq(key, para)`
Counts the frequency of a keyword (`key`) in a paragraph (`para`).

### `sortList(lst)`
Sorts a list of articles by the frequency of the keyword in descending order.

## Example Usage
1. Add an article:
   ```bash
   curl -X POST http://localhost:3000/articles \
   -H "Content-Type: application/json" \
   -d '{"id": "1", "title": "Hello World", "text": "hello hello world"}'
   ```
2. View all articles:
   ```bash
   curl http://localhost:3000/viewarticles
   ```
3. Search for an article by title:
   ```bash
   curl "http://localhost:3000/search?title=Hello%20World"
   ```
4. Search for an article by keyword:
   ```bash
   curl "http://localhost:3000/search?key=hello"
   ```
