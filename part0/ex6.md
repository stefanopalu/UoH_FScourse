```mermaid
  sequenceDiagram
    participant user
    participant browser
    participant server

    Note right of user: User fills out the form
    user->>browser : Submit form

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: JSON response
    deactivate server
```
