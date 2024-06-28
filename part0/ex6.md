```mermaid
  sequenceDiagram
    partecipant user
    participant browser
    participant server

    user->>browser : Submit form

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTML document
    deactivate server
```
