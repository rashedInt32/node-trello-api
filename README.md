#Simple form of node trello example project api


## Db Model
- Model
  - user √
    - _id
    - username
    - firstname
    - lastname
    - email
    - password
    - role
    - isAdmin
    - idBoards []

  - Board
    - _id
    - name
    - desc
    - closed // boolean
    - invited // boolean
    - membership [
        {
          - _id
          - idMember
          - memberType
        }
    ]

  - List
    - _id
    - idMemberCreator
    - idBoard
    - closed
  }

  - Card
    - _id
    - name
    - closed
    - desc
    - idBoard
    - idChecklists []
    - idList
    - idMembers []


